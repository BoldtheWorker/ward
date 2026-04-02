import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/admin");
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({ title: "Authorized", description: "Welcome back, admin." });
      navigate("/admin");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Invalid credentials";
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatedSection className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-secondary rounded-sm flex items-center justify-center mx-auto mb-6 border border-border">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Terminal</h1>
            <p className="text-muted-foreground uppercase text-[10px] font-semibold tracking-widest">
              Restricted Area | Portal Authorization
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-sm text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-sm text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Authorize Access"
              )}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Login;
