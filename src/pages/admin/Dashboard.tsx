import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useArticles, Article } from "@/hooks/useArticles";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, LayoutDashboard, LogOut, Loader2, ExternalLink, Search } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import AdminStats from "@/components/admin/AdminStats";

const Dashboard = () => {
  const { articles, loading, error } = useArticles();
  const [localArticles, setLocalArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (articles) setLocalArticles(articles);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return localArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [localArticles, searchTerm]);

  const categoryCount = useMemo(() => {
    const categories = new Set(localArticles.map(a => a.category));
    return categories.size;
  }, [localArticles]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;

    setIsDeleting(id);
    try {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;

      setLocalArticles(prev => prev.filter(a => a.id !== id));
      toast({ title: "Deleted", description: "Article successfully removed." });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      toast({ variant: "destructive", title: "Error", description: message });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Admin Nav */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <h1 className="font-bold tracking-tight text-foreground uppercase text-xs">Admin Terminal</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/insights" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              View Site <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2">
              Logout <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 lg:px-12 py-12">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Perspective Dashboard</h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Manage your intellectual assets and group publications through this secure administrative node.
            </p>
          </div>
          <Link 
            to="/admin/new" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-sm hover:translate-y-[-2px] transition-all duration-300 shadow-lg shadow-primary/10"
          >
            <Plus className="w-5 h-5" /> New Analysis
          </Link>
        </AnimatedSection>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-40 gap-4 opacity-50">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-[10px] font-bold uppercase tracking-widest animate-pulse">Syncing Database...</p>
          </div>
        ) : error ? (
          <div className="p-12 border border-destructive/20 bg-destructive/5 rounded-sm text-center">
            <p className="text-destructive font-bold mb-2 uppercase tracking-widest text-xs">Sync Interrupted</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        ) : (
          <>
            <AdminStats totalArticles={localArticles.length} categories={categoryCount} />

            <AnimatedSection delay={0.1} className="mb-12">
              <div className="relative group max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Filter perspectives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card/50 border border-border rounded-sm text-foreground focus:outline-none focus:border-primary transition-all text-sm backdrop-blur-sm"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 gap-4">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-32 border-2 border-dashed border-border rounded-sm bg-card/30">
                    <p className="text-muted-foreground mb-8 uppercase tracking-widest text-xs font-bold">No Records Identified</p>
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="text-primary font-bold hover:underline"
                    >
                      Clear Search Parameters
                    </button>
                  </div>
                ) : (
                  filteredArticles.map(article => (
                    <div key={article.id} className="group p-6 bg-card border border-border rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary px-3 py-1 bg-primary/10 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">{article.published_date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{article.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase opacity-50">
                          <span>path:</span>
                          <span className="text-foreground">/insights/{article.slug}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Link 
                          to={`/admin/edit/${article.id}`} 
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-foreground bg-secondary hover:bg-primary hover:text-white rounded-sm transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> EDIT
                        </Link>
                        <button 
                          onClick={() => handleDelete(article.id)}
                          disabled={isDeleting === article.id}
                          className="p-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-sm transition-all disabled:opacity-50"
                        >
                          {isDeleting === article.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </AnimatedSection>
          </>
        )}
      </main>
      
      <div className="py-12 border-t border-border mt-24">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-30">
          <p className="text-[9px] font-black uppercase tracking-[0.3em]">
            Ward Capital Group • Executive Node v1.2
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Encryption: AES-256</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Status: Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
