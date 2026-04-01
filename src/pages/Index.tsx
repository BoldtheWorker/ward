import { Link } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Building2, Zap, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { content } from "@/data/content";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const heroSlides = [
  {
    image: hero1,
    headline: content.homepage.hero.headline,
    highlight: content.homepage.hero.highlight,
    subtitle: content.homepage.hero.subtitle,
  },
  {
    image: hero2,
    headline: "Powering the",
    highlight: "Energy Transition",
    subtitle: content.homepage.hero.description,
  },
  {
    image: hero3,
    headline: "Scaling",
    highlight: "Transformative Technology",
    subtitle: "Identifying and accelerating breakthrough companies from seed to scale.",
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
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6 whitespace-pre-line">
                {heroSlides[currentSlide].headline}
                <br />
                <span className="gold-text">{heroSlides[currentSlide].highlight}</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={content.homepage.hero.cta.primary.link}
                  className="px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-300"
                >
                  {content.homepage.hero.cta.primary.label}
                </Link>
                <Link
                  to={content.homepage.hero.cta.secondary.link}
                  className="px-8 py-3.5 border border-border text-foreground font-medium text-sm tracking-wide rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
                >
                  {content.homepage.hero.cta.secondary.label}
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

      {/* OVERVIEW - FEATURED VERTICALS */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">{content.homepage.overview.title}</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{content.homepage.overview.subtitle}</h2>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {content.homepage.overview.items.map((item, i) => {
              const icons = [TrendingUp, Building2, Zap];
              const Icon = icons[i % icons.length];
              const isPriority = i < 2;
              
              return (
                <AnimatedSection 
                  key={item.title} 
                  delay={i * 0.15}
                  className={isPriority ? "md:col-span-3" : "md:col-span-2 md:col-start-3"}
                >
                  <div className={`group p-8 lg:p-12 border border-border rounded-sm bg-card card-hover h-full relative overflow-hidden ${isPriority ? "border-primary/20" : ""}`}>
                    {isPriority && (
                      <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors" />
                    )}
                    <div className={`${isPriority ? "w-16 h-16" : "w-12 h-12"} rounded-sm bg-secondary flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors duration-500`}>
                      <Icon className={`${isPriority ? "w-7 h-7" : "w-5 h-5"} text-primary`} />
                    </div>
                    <h3 className={`${isPriority ? "text-2xl" : "text-xl"} font-bold text-foreground mb-4`}>{item.title}</h3>
                    <p className={`text-muted-foreground leading-relaxed ${isPriority ? "text-base" : "text-sm"}`}>{item.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* MANDATE */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">{content.homepage.mandate.title}</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
                {content.homepage.mandate.headline}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {content.homepage.mandate.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SIGNATURE PLATFORMS - PRIORITIZED */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">{content.homepage.platforms.title}</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Operating Companies</h2>
              </div>
              <Link to="/platforms" className="text-sm text-primary flex items-center gap-2 hover:gap-3 transition-all">
                View All Platforms <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {content.homepage.platforms.items.map((item, i) => {
              const isPriority = i < 2;
              return (
                <AnimatedSection 
                  key={item.title} 
                  delay={i * 0.15}
                  className={isPriority ? "md:col-span-3" : "md:col-span-2 md:col-start-3"}
                >
                  <div className={`group p-8 lg:p-12 border border-border rounded-sm bg-card card-hover h-full flex flex-col relative ${isPriority ? "border-primary/30 ring-1 ring-primary/5" : ""}`}>
                    {isPriority && (
                      <span className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">Featured Platform</span>
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-6">{item.tag}</span>
                    <h3 className={`${isPriority ? "text-3xl" : "text-2xl"} font-bold text-foreground mb-6`}>{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.description}</p>
                    <div className="mt-10 pt-6 border-t border-border">
                      <Link to="/platforms" className="text-sm text-muted-foreground group-hover:text-primary flex items-center gap-2 transition-colors font-medium">
                        Explore Platform <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section className="py-24 lg:py-32 bg-surface border-y border-border overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">{content.homepage.partnerships.title}</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{content.homepage.partnerships.description}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {content.homepage.partnerships.approach}
              </p>
            </div>
            <div className="text-center">
              <Link
                to={content.homepage.partnerships.cta.link}
                className="inline-block px-10 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-300"
              >
                {content.homepage.partnerships.cta.label}
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
