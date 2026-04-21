import { ArrowRight, Calendar, Loader2, Image } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/data/content";
import { useArticles } from "@/hooks/useArticles";

const Insights = () => {
  const { articles, loading, error } = useArticles();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="line-accent mb-8" />
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">{content.insights.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {content.insights.subtitle}
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {content.insights.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          {error && (
            <div className="mb-8 p-4 border border-primary/20 bg-primary/5 rounded-sm flex items-center justify-between">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Live Sync Unavailable - Showing Historical Insights
              </p>
              <span className="text-[10px] text-muted-foreground opacity-50 font-mono">
                {error.includes('fetch') ? 'Database is currently re-authorizing' : error}
              </span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground animate-pulse">Loading perspective...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">No insights published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <AnimatedSection key={article.id} delay={i * 0.1}>
                  <Link to={`/insights/${article.slug}`} className="block h-full group">
                    <div className="relative border border-border/80 rounded-sm bg-card transition-all duration-500 h-full flex flex-col group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)] overflow-hidden">
                      
                      {/* Image Container */}
                      <div className="aspect-[16/10] w-full overflow-hidden bg-secondary relative">
                        {article.image_url ? (
                          <img 
                            src={article.image_url} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-100"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center opacity-20">
                            <Image className="w-12 h-12" />
                          </div>
                        )}
                        {/* Status/Tag Overlay */}
                        <div className="absolute top-4 left-4">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black bg-primary px-3 py-1.5 rounded-none shadow-xl">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4 opacity-60">
                          <Calendar className="w-3 h-3" />
                          {article.published_date}
                        </div>

                        <h3 className="text-2xl font-black text-foreground mb-4 leading-tight group-hover:text-primary transition-colors decoration-primary/30 underline-offset-4 group-hover:underline">
                          {article.title}
                        </h3>
                        
                        {article.excerpt && (
                          <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 mb-8 opacity-80">
                            {article.excerpt}
                          </p>
                        )}
                        
                        <div className="pt-6 border-t border-border/40 mt-auto flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-3 group-hover:gap-5 transition-all">
                            Read Analysis <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Insights;
