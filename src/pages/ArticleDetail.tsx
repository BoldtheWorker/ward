import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useArticle } from "@/hooks/useArticles";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-40 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/insights" className="text-primary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <AnimatedSection>
            <Link 
              to="/insights" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest">
                <Tag className="w-3.5 h-3.5" />
                {article.category}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-3.5 h-3.5" />
                {article.published_date}
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-12 leading-tight">
              {article.title}
            </h1>

            {article.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-sm mb-16 border border-border">
                <img 
                  src={article.image_url} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-invert prose-gold max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg">
              <ReactMarkdown>{article.content || ""}</ReactMarkdown>
            </div>
          </AnimatedSection>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
