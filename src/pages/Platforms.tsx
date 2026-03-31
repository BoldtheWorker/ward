import { TrendingUp, Building2, Zap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const platforms = [
  {
    icon: TrendingUp,
    title: "FutureTech",
    tag: "Venture Capital",
    desc: "FutureTech is Ward Capital Group's venture investment platform, deploying capital into transformative technology companies from seed to growth stage.",
    areas: ["Artificial Intelligence", "Quantum Computing", "Fintech", "Biotech & Health"],
    thesis: "We seek founders building category-defining companies at the intersection of deep technology and massive market opportunity. FutureTech invests with conviction, offering patient capital and operational support to scale visionary ideas into global enterprises.",
  },
  {
    icon: Building2,
    title: "NellyCrest",
    tag: "Real Estate & Cities",
    desc: "NellyCrest is a premium real estate development and investment platform focused on luxury residential, mixed-use commercial, and sustainable urban infrastructure.",
    areas: ["Luxury Residential", "Mixed-Use Development", "Sustainable Infrastructure", "Urban Regeneration"],
    thesis: "We believe cities are the engines of civilization. NellyCrest targets high-growth urban markets where demographic shifts, infrastructure gaps, and policy tailwinds create compelling investment opportunities.",
  },
  {
    icon: Zap,
    title: "Ward Petro",
    tag: "Energy",
    desc: "Ward Petro is Ward Capital Group's energy investment platform, spanning upstream exploration, midstream infrastructure, and the renewable energy transition.",
    areas: ["Upstream Exploration", "Midstream Logistics", "Renewable Energy", "Energy Transition"],
    thesis: "Energy underpins every economy. Ward Petro invests across the energy value chain with a dual mandate: generating strong risk-adjusted returns while participating in the global transition toward sustainable energy systems.",
  },
];

const Platforms = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="line-accent mb-8" />
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">Our Platforms</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Three dedicated operating platforms, each focused on a foundational sector of the global economy.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {platforms.map((p, i) => (
      <section key={p.title} className={`py-24 lg:py-32 ${i % 2 === 1 ? "bg-surface" : ""}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <AnimatedSection>
              <div className="w-14 h-14 rounded-sm bg-secondary flex items-center justify-center mb-6">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{p.tag}</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">{p.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{p.desc}</p>
              <h3 className="text-sm font-semibold text-foreground mb-4">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {p.areas.map((a) => (
                  <span key={a} className="px-3 py-1.5 text-xs rounded-sm bg-secondary text-secondary-foreground">{a}</span>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="p-8 lg:p-10 border border-border rounded-sm bg-card h-full flex flex-col justify-center">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Investment Thesis</h3>
                <p className="text-foreground leading-relaxed text-lg">{p.thesis}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    ))}

    <Footer />
  </div>
);

export default Platforms;
