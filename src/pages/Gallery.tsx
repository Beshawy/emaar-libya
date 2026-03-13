import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import AnimatedSection from "@/components/AnimatedSection";

const GalleryPage = () => {
  const { t, lang } = useLanguage();
  const { gallery } = useData();

  return (
    <div>
      <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center">
        <img
          src="/images/emaar.jpg"
          alt="Gallery Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,30,60,0.68) 0%, rgba(30,50,90,0.55) 100%)" }} />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-cairo font-bold text-3xl md:text-4xl text-white mb-2 header-animate header-animate-1 drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
            {t.gallery.pageTitle}
          </h1>
          <p className="text-white/85 header-animate header-animate-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
            {t.gallery.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, idx) => (
              <AnimatedSection key={item.id} delay={(idx % 6) * 0.08}>
                <div className="card-glow rounded-lg overflow-hidden border border-border group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      style={{ transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 bg-card">
                    <p className="text-sm text-muted-foreground">
                      {lang === "ar" ? item.descriptionAr : item.description}
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

export default GalleryPage;
