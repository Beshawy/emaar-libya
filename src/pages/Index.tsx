import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { DoorOpen, LayoutGrid, GlassWater, Gem, Calendar, Award, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const HomePage = () => {
  const { t, lang } = useLanguage();

  const capabilities = [
    { icon: DoorOpen, ...t.capabilities.doors },
    { icon: LayoutGrid, ...t.capabilities.windows },
    { icon: GlassWater, ...t.capabilities.glass },
    { icon: Gem, ...t.capabilities.decor },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img src="/images/hero.jpg" alt="Emaar Libya Factory" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <img
            src="/images/logo.jpeg"
            alt="Emaar Libya"
            className="block h-28 w-28 md:h-40 md:w-40 bg-white rounded-full mx-auto mb-6 shadow-2xl object-contain border-4 border-white relative z-50 opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
          <h1
            className="font-cairo font-bold text-3xl md:text-5xl text-primary-foreground mb-4 leading-tight hero-animate hero-animate-2"
            dangerouslySetInnerHTML={{ __html: t.hero.title }}
          />
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 font-inter hero-animate hero-animate-3">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center hero-animate hero-animate-4">
            <Link
              to="/contact"
              className="bg-accent text-accent-foreground px-6 py-3 rounded font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {t.hero.contact}
            </Link>
            <Link
              to="/services"
              className="border border-primary-foreground/40 text-primary-foreground px-6 py-3 rounded font-semibold hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {t.hero.products}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <AnimatedSection>
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2 stat-pop">
              <Calendar className="h-8 w-8 text-accent float-icon" />
              <span className="text-3xl font-cairo font-bold text-primary">2007</span>
              <span className="text-sm text-muted-foreground">{t.companyInfo.founded}</span>
            </div>
            <div className="flex flex-col items-center gap-2 stat-pop">
              <Award className="h-8 w-8 text-accent float-icon" style={{ animationDelay: "0.5s" }} />
              <span className="text-3xl font-cairo font-bold text-primary">2012</span>
              <span className="text-sm text-muted-foreground">{t.companyInfo.licensed}</span>
            </div>
            <div className="flex flex-col items-center gap-2 stat-pop">
              <Clock className="h-8 w-8 text-accent float-icon" style={{ animationDelay: "1s" }} />
              <span className="text-3xl font-cairo font-bold text-primary">+18</span>
              <span className="text-sm text-muted-foreground">{t.companyInfo.experience}</span>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* About preview */}
      <AnimatedSection direction="fade" delay={0.1}>
        <section className="section-alt py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-cairo font-bold text-2xl md:text-3xl text-foreground mb-4">{t.aboutPreview.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{t.aboutPreview.text}</p>
            <Link to="/about" className="text-accent font-semibold hover:underline transition-all duration-200 hover:tracking-wide">
              {t.aboutPreview.learnMore} →
            </Link>
          </div>
        </section>
      </AnimatedSection>

      {/* Capabilities */}
      <AnimatedSection delay={0.05}>
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="font-cairo font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
              {t.capabilities.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((item, i) => (
                <div key={i} className="stagger-item card-glow bg-card border border-border rounded-lg p-6 text-center">
                  <item.icon className="h-10 w-10 text-accent mx-auto mb-4 float-icon" style={{ animationDelay: `${i * 0.3}s` }} />
                  <h3 className="font-cairo font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;
