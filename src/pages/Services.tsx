import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import AnimatedSection from "@/components/AnimatedSection";

const ServicesPage = () => {
  const { t, lang } = useLanguage();
  const { services } = useData();

  return (
    <div>
      <section className="relative py-16 md:py-24 overflow-hidden flex items-center justify-center">
        <img
          src="/images/photo.jpeg"
          alt="Services Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-cairo font-bold text-3xl md:text-4xl text-white mb-3 md:mb-2 leading-tight header-animate header-animate-1 drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
            {t.services.pageTitle}
          </h1>
          <p className="text-white/85 text-base md:text-lg px-4 md:px-0 header-animate header-animate-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
            {t.services.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="card-glow bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] md:aspect-video overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-cairo font-bold text-lg md:text-xl text-foreground mb-2 leading-snug">
                      {lang === "ar" ? service.titleAr : service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {lang === "ar" ? service.descriptionAr : service.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
