import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Award, Target, FileCheck, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center">
        <img
          src="/images/gallery1.jpg"
          alt="About Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,30,60,0.68) 0%, rgba(30,50,90,0.55) 100%)" }} />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-cairo font-bold text-3xl md:text-4xl text-white mb-2 header-animate header-animate-1 drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
            {t.about.pageTitle}
          </h1>
          <p className="text-white/85 header-animate header-animate-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
            {t.about.pageSubtitle}
          </p>
        </div>
      </section>

      {/* History */}
      <AnimatedSection direction="left">
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-accent float-icon" />
                  <h2 className="font-cairo font-bold text-2xl text-foreground">{t.about.historyTitle}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t.about.historyText}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="stat-pop card-glow bg-muted rounded-lg p-6 text-center">
                  <Calendar className="h-6 w-6 text-accent mx-auto mb-1 float-icon" />
                  <span className="text-3xl font-cairo font-bold text-primary">2005</span>
                  <p className="text-xs text-muted-foreground mt-1">{t.companyInfo.founded}</p>
                </div>
                <div className="stat-pop card-glow bg-muted rounded-lg p-6 text-center">
                  <Award className="h-6 w-6 text-accent mx-auto mb-1 float-icon" />
                  <span className="text-3xl font-cairo font-bold text-primary">2012</span>
                  <p className="text-xs text-muted-foreground mt-1">{t.companyInfo.licensed}</p>
                </div>
                <div className="stat-pop card-glow bg-muted rounded-lg p-6 text-center col-span-2 sm:col-span-1">
                  <Clock className="h-6 w-6 text-accent mx-auto mb-1 float-icon" style={{ animationDelay: "0.5s" }} />
                  <span className="text-3xl font-cairo font-bold text-primary">+20</span>
                  <p className="text-xs text-muted-foreground mt-1">{t.companyInfo.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Mission */}
      <AnimatedSection direction="fade" delay={0.1}>
        <section className="section-alt py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Target className="h-10 w-10 text-accent mx-auto mb-4 float-icon" />
            <h2 className="font-cairo font-bold text-2xl text-foreground mb-4">{t.about.missionTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.about.missionText}</p>
          </div>
        </section>
      </AnimatedSection>

      {/* License */}
      <AnimatedSection direction="up" delay={0.05}>
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="card-glow border border-border rounded-lg p-8 text-center">
              <FileCheck className="h-12 w-12 text-accent mx-auto mb-4 float-icon" />
              <h2 className="font-cairo font-bold text-2xl text-foreground mb-4">{t.about.licenseTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.about.licenseText}</p>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default AboutPage;
