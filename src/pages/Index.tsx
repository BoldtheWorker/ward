import { Link } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Building2, Zap, ArrowRight, Globe, Shield, BarChart3, Landmark, Briefcase, Scale, CircleDollarSign, Building, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const partners = [
  { icon: Globe, name: "Global Fund" },
  { icon: Shield, name: "Sovereign Trust" },
  { icon: BarChart3, name: "Alpha Partners" },
  { icon: Landmark, name: "Institutional Capital" },
  { icon: Briefcase, name: "Strategic Holdings" },
  { icon: Scale, name: "Meridian Group" },
  { icon: CircleDollarSign, name: "Capital Reserve" },
  { icon: Building, name: "Pinnacle Equity" },
];

const PartnerCarousel = () => {
  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent z-10" />

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center gap-3 py-8 px-10 border border-border rounded-sm bg-card/50 hover:border-primary/30 transition-colors min-w-[180px]"
            >
              <p.icon className="w-8 h-8 text-muted-foreground" />
              <span className="text-xs text-muted-foreground tracking-wider uppercase whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
const heroSlides = [
  {
    image: hero1,
    headline: "Building the",
    highlight: "Future of Capital",
    subtitle: "Ward Capital Group is a global investment firm deploying strategic capital across venture technology, real estate, and energy.",
  },
  {
    image: hero2,
    headline: "Powering the",
    highlight: "Energy Transition",
    subtitle: "Investing in traditional and renewable energy infrastructure to fuel the next generation of sustainable growth.",
  },
  {
    image: hero3,
    headline: "Scaling",
    highlight: "Transformative Technology",
    subtitle: "Identifying and accelerating breakthrough companies in AI, quantum computing, and deep tech from seed to scale.",
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO CAROUSEL */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-background/75" />
            <div className="absolute inset-0 hero-gradient opacity-60" />
          </motion.div>
        </AnimatePresence>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] z-[1]" style={{
          backgroundImage: 'linear-gradient(hsl(42,72%,52%) 1px, transparent 1px), linear-gradient(90deg, hsl(42,72%,52%) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 min-h-screen flex items-center pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-3xl"
            >
              <div className="line-accent mb-8" />
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6">
                {heroSlides[currentSlide].headline}
                <br />
                <span className="gold-text">{heroSlides[currentSlide].highlight}</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-300"
                >
                  Engage With Us
                </Link>
                <Link
                  to="/platforms"
                  className="px-8 py-3.5 border border-border text-foreground font-medium text-sm tracking-wide rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
                >
                  Explore Platforms
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-border/50 rounded-sm bg-background/30 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-border/50 rounded-sm bg-background/30 backdrop-blur-sm text-foreground hover:border-primary hover:text-primary transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === currentSlide ? "w-10 bg-primary" : "w-6 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
      </section>

      {/* OVERVIEW - 3 COLUMNS */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Investment Verticals</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Strategic Capital Deployment</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: "Venture Capital", desc: "Investing in transformative technology companies from seed to growth stage, with a focus on AI, fintech, and deep tech." },
              { icon: Building2, title: "Cities & Real Estate", desc: "Developing and investing in premium real estate assets across major global markets and emerging urban centers." },
              { icon: Zap, title: "Energy", desc: "Deploying capital in traditional and renewable energy infrastructure to power the next generation of growth." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className="group p-8 lg:p-10 border border-border rounded-sm bg-card card-hover">
                  <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* MANDATE */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Our Mandate</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
                We invest with conviction in industries that shape the future of civilization.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ward Capital Group operates at the intersection of innovation and permanence. Our investment philosophy is grounded in long-term value creation, disciplined capital allocation, and a deep commitment to building enduring enterprises across borders and industries.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SIGNATURE PLATFORMS */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Signature Platforms</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Operating Companies</h2>
              </div>
              <Link to="/platforms" className="text-sm text-primary flex items-center gap-2 hover:gap-3 transition-all">
                View All Platforms <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "FutureTech", desc: "A venture platform identifying and scaling the next generation of transformative technology companies across AI, quantum, and biotech.", tag: "Venture" },
              { title: "NellyCrest", desc: "A premium real estate development and investment platform focused on urban luxury, mixed-use, and sustainable city infrastructure.", tag: "Real Estate" },
              { title: "Ward Petro", desc: "An energy investment platform spanning upstream exploration, midstream logistics, and renewable energy transition strategies.", tag: "Energy" },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className="group p-8 lg:p-10 border border-border rounded-sm bg-card card-hover h-full flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-6">{item.tag}</span>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.desc}</p>
                  <div className="mt-8 pt-6 border-t border-border">
                    <Link to="/platforms" className="text-sm text-muted-foreground group-hover:text-primary flex items-center gap-2 transition-colors">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS — Infinite Carousel */}
      <section className="py-24 lg:py-32 bg-surface border-y border-border overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Partnerships & Trust</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Global Institutional Partnerships</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We work alongside leading institutions, sovereign entities, and family offices to deploy capital at scale.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <PartnerCarousel />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="line-accent mx-auto mb-8" />
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Engage With Us</h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Whether you are an institutional investor, a strategic partner, or a visionary founder — we'd like to hear from you.
              </p>
              <Link
                to="/contact"
                className="inline-block px-10 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
