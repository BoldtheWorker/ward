import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  { title: "The Future of AI-Driven Capital Markets", category: "Technology", date: "March 2026", excerpt: "How artificial intelligence is reshaping investment strategies and portfolio management across global markets." },
  { title: "Urban Development in Emerging Markets", category: "Real Estate", date: "February 2026", excerpt: "Exploring high-growth opportunities in sustainable urban development across Southeast Asia and Africa." },
  { title: "Energy Transition: A Dual Mandate", category: "Energy", date: "January 2026", excerpt: "Balancing returns and responsibility in the global shift toward renewable energy infrastructure." },
  { title: "Seed-Stage Investing in Deep Tech", category: "Technology", date: "December 2025", excerpt: "Why patient capital and technical expertise matter more than ever in quantum, biotech, and advanced materials." },
  { title: "Mixed-Use Real Estate: The New Standard", category: "Real Estate", date: "November 2025", excerpt: "How integrated live-work-play developments are redefining premium urban real estate." },
  { title: "Upstream Energy: Risk and Reward", category: "Energy", date: "October 2025", excerpt: "A deep dive into upstream energy investment strategies in a volatile macro environment." },
];

const categories = ["All", "Technology", "Real Estate", "Energy"];

const Insights = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="line-accent mb-8" />
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">Insights</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Perspectives on investing, markets, and the forces shaping the global economy.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Categories */}
        <AnimatedSection>
          <div className="flex gap-4 mb-16 flex-wrap">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 text-xs font-medium tracking-wide rounded-sm transition-all ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <AnimatedSection key={article.title} delay={i * 0.1}>
              <div className="group p-8 border border-border rounded-sm bg-card card-hover h-full flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-3">{article.category}</span>
                <span className="text-xs text-muted-foreground mb-4">{article.date}</span>
                <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">{article.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{article.excerpt}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground group-hover:text-primary flex items-center gap-2 transition-colors cursor-pointer">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Insights;
