import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Loader2, LayoutDashboard, Globe, Settings2, FileEdit } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import AnimatedSection from "@/components/AnimatedSection";
import ImageUpload from "@/components/admin/ImageUpload";

const ArticleEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<string | undefined>("");
  
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Technology",
    published_date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    excerpt: "",
    image_url: "",
  });

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          toast({ variant: "destructive", title: "Sync Error", description: "Terminal failed to retrieve data node." });
          navigate("/admin");
        } else if (data) {
          setForm({
            title: data.title,
            slug: data.slug,
            category: data.category,
            published_date: data.published_date,
            excerpt: data.excerpt,
            image_url: data.image_url || "",
          });
          setContent(data.content);
        }
        setLoading(false);
      };
      fetchArticle();
    }
  }, [id, navigate, toast]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm(prev => ({ 
      ...prev, 
      title, 
      slug: id ? prev.slug : generateSlug(title) 
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content || !form.title) {
      toast({ variant: "destructive", title: "Integrity Error", description: "All primary data nodes (Title & Content) must be populated." });
      return;
    }

    setSaving(true);
    const articleData = { ...form, content };

    try {
      let error;
      if (id) {
        ({ error } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", id));
      } else {
        ({ error } = await supabase
          .from("articles")
          .insert([articleData]));
      }

      if (error) throw error;

      toast({ 
        title: "Transmission Success", 
        description: `Perspective ${id ? "updated" : "published"} to group network.` 
      });
      navigate("/admin");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred during sync";
      toast({ variant: "destructive", title: "Transmission Failed", description: message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4 opacity-50">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Retrieving Data Node...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Zen Nav */}
      <nav className="border-b border-border/40 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-muted-foreground hover:text-primary transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Discard Changes
            </Link>
            <div className="h-4 w-px bg-border/40 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-secondary rounded-full border border-border/40">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Connected: Primary Node</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleSubmit()}
              disabled={saving}
              className="group relative inline-flex items-center gap-3 px-8 py-2.5 bg-primary text-black font-black uppercase tracking-[0.1em] text-xs rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {id ? "Commit Updates" : "Publish to Network"}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content Node */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatedSection>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <FileEdit className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Analysis Headline</span>
                </div>
                <input
                  required
                  type="text"
                  placeholder="Enter the critical perspective title..."
                  value={form.title}
                  onChange={handleTitleChange}
                  className="w-full bg-transparent border-none text-4xl lg:text-6xl font-black p-0 text-foreground focus:outline-none placeholder:text-muted-foreground placeholder:opacity-20 leading-[1.1]"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="data-color-mode-dark">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <FileEdit className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Detailed Insight</span>
                  </div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">Markdown Supported Engine</span>
                </div>
                <div className="border border-border/40 rounded-sm overflow-hidden bg-card/30 backdrop-blur-sm" data-color-mode="dark">
                  <MDEditor
                    value={content}
                    onChange={setContent}
                    height={700}
                    preview="edit"
                    className="bg-transparent w-full"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar / Metadata Node */}
          <div className="lg:col-span-4 space-y-8">
            <AnimatedSection delay={0.2} className="sticky top-32">
              <div className="p-8 bg-card/30 border border-border/40 rounded-sm backdrop-blur-xl space-y-10">
                <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                  <Settings2 className="w-4 h-4 text-primary" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Metadata Node</h3>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-primary" /> Network Path
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-black/40 border border-border/40 rounded-sm group focus-within:border-primary/50 transition-all">
                      <span className="text-[10px] text-muted-foreground font-mono opacity-40">/</span>
                      <input
                        required
                        type="text"
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        className="flex-1 bg-transparent border-none text-xs text-foreground focus:outline-none placeholder:opacity-50 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                      <LayoutDashboard className="w-3.5 h-3.5 text-primary" /> Sector Class
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-black/40 border border-border/40 rounded-sm py-3 px-4 text-xs font-bold text-foreground focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
                    >
                      <option>Technology</option>
                      <option>Real Estate</option>
                      <option>Energy</option>
                      <option>Perspective</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <ImageUpload 
                      value={form.image_url}
                      onChange={(url) => setForm({ ...form, image_url: url })}
                    />
                  </div>

                  <div className="space-y-4 pt-6 border-t border-border/40">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Summary Excerpt</label>
                    <textarea
                      rows={5}
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                      className="w-full bg-black/40 border border-border/40 rounded-sm py-4 px-4 text-xs leading-relaxed text-muted-foreground focus:outline-none focus:border-primary/50 transition-all resize-none placeholder:opacity-30"
                      placeholder="Briefly state the core thesis of this perspective..."
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 border border-border/20 rounded-sm opacity-30">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] leading-loose">
                  Critical Node Authentication: Verified<br />
                  Data Integrity check: Passed<br />
                  Encryption: active
                </p>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ArticleEditor;
