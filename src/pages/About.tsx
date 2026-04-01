import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/data/content";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="line-accent mb-8" />
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">{content.about.overview.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {content.about.overview.headline}
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            {content.about.overview.description}
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Philosophy & Model */}
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">{content.about.philosophy.title}</p>
            <h2 className="text-3xl font-bold text-foreground mb-6">{content.about.philosophy.headline}</h2>
            <p className="text-muted-foreground mb-8">Our focus is on opportunities that:</p>
            <ul className="space-y-4">
              {content.about.philosophy.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">{content.about.model.title}</p>
            <h2 className="text-3xl font-bold text-foreground mb-6">Execution at Scale</h2>
            <p className="text-muted-foreground leading-relaxed">
              {content.about.model.description}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
