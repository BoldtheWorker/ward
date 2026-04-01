import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/data/content";

const Insights = () => (
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
        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.insights.topics.map((topic, i) => (
            <AnimatedSection key={topic.title} delay={i * 0.1}>
              <div className="group p-8 border border-border rounded-sm bg-card card-hover h-full flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-3">{topic.category}</span>
                <span className="text-xs text-muted-foreground mb-4">{topic.date}</span>
                <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">{topic.title}</h3>
                <div className="pt-4 border-t border-border mt-auto">
                  <span className="text-sm text-muted-foreground group-hover:text-primary flex items-center gap-2 transition-colors cursor-pointer">
                    Read Analysis <ArrowRight className="w-3.5 h-3.5" />
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
