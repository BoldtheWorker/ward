import { TrendingUp, Building2, Zap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/data/content";

const Platforms = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="line-accent mb-8" />
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">Our Platforms</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Three dedicated operating platforms, each designed to lead in its sector.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {content.platformsPage.map((p, i) => {
      const icons = [TrendingUp, Building2, Zap];
      const Icon = icons[i % icons.length];
      return (
        <section key={p.title} className={`py-24 lg:py-32 ${i % 2 === 1 ? "bg-surface" : ""}`}>
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <AnimatedSection>
                <div className="w-14 h-14 rounded-sm bg-secondary flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{p.tag}</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">{p.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{p.description}</p>
                <h3 className="text-sm font-semibold text-foreground mb-4">Focus & Principles</h3>
                <div className="flex flex-wrap gap-2">
                  {p.areas.map((a) => (
                    <span key={a} className="px-3 py-1.5 text-xs rounded-sm bg-secondary text-secondary-foreground">{a}</span>
                  ))}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="p-8 lg:p-10 border border-border rounded-sm bg-card h-full flex flex-col justify-center">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Strategy & Objective</h3>
                  <p className="text-foreground leading-relaxed text-lg">{p.strategy}</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      );
    })}

    <Footer />
  </div>
);

export default Platforms;
