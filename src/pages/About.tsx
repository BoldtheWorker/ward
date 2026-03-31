import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="line-accent mb-8" />
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">About Ward Capital Group</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A global investment firm with conviction, discipline, and a long-term perspective on building enduring value.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Our Vision</p>
            <h2 className="text-3xl font-bold text-foreground mb-6">Shaping the infrastructure of tomorrow</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ward Capital Group envisions a world where strategic capital accelerates human progress. We invest in the foundational industries — technology, real estate, and energy — that define how civilizations grow, connect, and thrive.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Our Mission</p>
            <h2 className="text-3xl font-bold text-foreground mb-6">Deploying capital with purpose</h2>
            <p className="text-muted-foreground leading-relaxed">
              We build and back operating platforms that create lasting impact. Through disciplined investing, deep sector expertise, and long-duration partnerships, we aim to generate superior returns while building enterprises that endure.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Milestones */}
    <section className="py-24 lg:py-32 bg-surface">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Milestones</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-16">Our Journey</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { year: "2018", title: "Founded", desc: "Ward Capital Group established with a mandate to invest across venture, real estate, and energy." },
            { year: "2021", title: "Platform Expansion", desc: "Launched FutureTech, NellyCrest, and Ward Petro as dedicated operating platforms." },
            { year: "2024", title: "Global Scale", desc: "Expanded operations across multiple continents with institutional partnerships and strategic co-investments." },
          ].map((item, i) => (
            <AnimatedSection key={item.year} delay={i * 0.15}>
              <div className="p-8 border border-border rounded-sm bg-card">
                <span className="gold-text text-3xl font-bold">{item.year}</span>
                <h3 className="text-xl font-bold text-foreground mt-4 mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Our Values</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Conviction. Discipline. Endurance.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              These principles guide every decision we make — from the founders we back to the assets we develop. We believe that great investments are built on patience, rigor, and an unwavering commitment to excellence.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
