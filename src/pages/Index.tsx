import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { DoorOpen, LayoutGrid, GlassWater, Layers, Calendar, Award, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const HomePage = () => {
  const { t, lang } = useLanguage();

  const capabilities = [
    { id: "doors", icon: DoorOpen, ...t.capabilities.doors },
    { id: "windows", icon: LayoutGrid, ...t.capabilities.windows },
    { id: "glass", icon: GlassWater, ...t.capabilities.glass },
    { id: "decor", icon: Layers, ...t.capabilities.decor },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 flex flex-col items-center justify-center overflow-hidden">
        <img src="/images/hero.jpg" alt="Emaar Libya Factory" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          <div className="relative mb-6 md:mb-8">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-[40px] md:blur-[50px] transform scale-110 z-0"></div>
            <img
              src="/images/loho.png"
              alt="Emaar Libya"
             className="block h-56 sm:h-60 md:h-64 lg:h-72 xl:h-80 w-auto object-contain relative z-50 drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]" 
            />
          </div>
          <h1
            className="font-cairo font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-primary-foreground mb-3 leading-tight hero-animate hero-animate-2 text-center px-2"
            dangerouslySetInnerHTML={{ __html: t.hero.title }}
          />
          <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 font-inter hero-animate hero-animate-3 text-center px-4 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center hero-animate hero-animate-4 px-4">
            <Link
              to="/contact"
              className="bg-accent text-accent-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              {t.hero.contact}
            </Link>
            <Link
              to="/services"
              className="border border-primary-foreground/40 text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded font-semibold hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
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
              <span className="text-3xl font-cairo font-bold text-primary">2005</span>
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
                <Link 
                  to={`/services?category=${item.id}`}
                  key={i} 
                  className="stagger-item card-glow bg-card border border-border rounded-lg p-6 text-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 block"
                >
                  <item.icon className="h-10 w-10 text-accent mx-auto mb-4 float-icon" style={{ animationDelay: `${i * 0.3}s` }} />
                  <h3 className="font-cairo font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link 
                to="/services" 
                className="inline-flex items-center justify-center bg-accent text-white px-8 py-3 rounded-full font-cairo font-bold text-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-md hover:shadow-lg"
              >
                {lang === 'ar' ? 'عرض جميع الخدمات والتفاصيل' : 'View All Services & Details'}
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;
