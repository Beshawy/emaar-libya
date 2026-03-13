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
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 flex flex-col items-center justify-center overflow-hidden">
        <img src="/images/hero.jpg" alt="Emaar Libya Factory" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          <div className="relative mb-6 md:mb-8 group">
            {/* Multi-layer glowing orb effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-[40px] md:blur-[60px] transform scale-150 animate-pulse transition-all duration-700 group-hover:scale-175 group-hover:from-blue-400/40 group-hover:via-purple-400/40 group-hover:to-pink-400/40 z-0"></div>
            <div className="absolute inset-0 bg-white/25 rounded-full blur-[25px] md:blur-[35px] transform scale-125 animate-bounce transition-all duration-500 group-hover:scale-150 group-hover:bg-white/35 z-10"></div>
            
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden z-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shimmer"></div>
            </div>
            
            {/* Rotating light particles */}
            <div className="absolute inset-0 z-30">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full animate-ping transform -translate-x-1/2"></div>
              <div className="absolute bottom-0 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse transform" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse transform" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-pulse transform" style={{ animationDelay: '1.5s' }}></div>
            </div>
            
            <img
              src="/images/loho.png"
              alt="Emaar Libya"
              className="block h-40 md:h-56 lg:h-64 xl:h-72 w-auto object-contain relative z-50 drop-shadow-[0_0_30px_rgba(255,255,255,0.9)] animate-float transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,1)]"
            />
          </div>
          <h1
            className="font-cairo font-bold text-2xl md:text-4xl lg:text-5xl text-primary-foreground mb-3 leading-tight hero-animate hero-animate-2"
            dangerouslySetInnerHTML={{ __html: t.hero.title }}
          />
          <p className="text-primary-foreground/80 text-base md:text-lg lg:text-xl mb-6 font-inter hero-animate hero-animate-3">
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
