import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import AnimatedSection from "@/components/AnimatedSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServicesPage = () => {
  const { t, lang } = useLanguage();
  const { services } = useData();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "all";
  const [activeTab, setActiveTab] = useState(urlCategory);

  useEffect(() => {
    setActiveTab(urlCategory);
  }, [urlCategory]);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    if (val === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", val);
    }
    setSearchParams(searchParams);
  };

  const categories = ["all", "doors", "windows", "glass", "decor", "other"];

  const filteredServices = useMemo(() => {
    if (activeTab === "all") return services;
    return services.filter(s => s.category === activeTab);
  }, [services, activeTab]);

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

      <section className="py-16 bg-card overflow-x-hidden min-h-[50vh]">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col items-center">
            <TabsList className="mb-10 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap h-auto p-2 bg-muted/40 gap-2 sm:gap-3 rounded-2xl md:rounded-full border border-border/50 justify-center">
              {categories.map((cat) => {
                const label = (t as any).services.categories?.[cat] || cat;
                return (
                  <TabsTrigger 
                    key={cat} 
                    value={cat} 
                    className="font-cairo font-semibold text-xs sm:text-sm md:text-base px-2 sm:px-6 py-3 sm:py-2.5 data-[state=active]:bg-accent data-[state=active]:text-white transition-all shadow-none rounded-xl md:rounded-full whitespace-normal text-center flex items-center justify-center min-h-12 leading-snug"
                  >
                    {label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service, i) => (
                    <AnimatedSection key={service.id} delay={i * 0.1} direction={i % 2 === 0 ? "up" : "fade"} className="flex">
                      <div className="card-glow bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full flex flex-col h-full">
                        <div className="aspect-[4/3] md:aspect-video overflow-hidden shrink-0">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 md:p-6 flex flex-col flex-grow">
                          <h3 className="font-cairo font-bold text-lg md:text-xl text-foreground mb-3 leading-snug">
                            {lang === "ar" ? service.titleAr : service.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-grow">
                            {lang === "ar" ? service.descriptionAr : service.description}
                          </p>
                          <button
                            onClick={() => setSelectedService(service)}
                            className="text-accent hover:text-accent/80 transition-colors text-sm font-semibold mt-4 self-start"
                          >
                            {lang === "ar" ? "عرض المزيد" : "Read More"}
                          </button>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-muted-foreground text-lg font-cairo">
                      {lang === "ar" ? "لا توجد خدمات متاحة في هذا القسم حالياً." : "No services available in this category currently."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden bg-card border-border max-h-[90vh] flex flex-col">
          {selectedService && (
            <>
              <div className="relative h-48 sm:h-64 shrink-0">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 px-6 w-full">
                  <DialogHeader>
                    <DialogTitle className="text-white font-cairo text-2xl drop-shadow-md">
                      {lang === "ar" ? selectedService.titleAr : selectedService.title}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-foreground leading-loose text-sm sm:text-base whitespace-pre-wrap">
                  {lang === "ar" ? selectedService.descriptionAr : selectedService.description}
                </p>
                {selectedService.video && (
                  <div className="mt-6 rounded-lg overflow-hidden border border-border">
                    <video src={selectedService.video} controls className="w-full aspect-video bg-black">
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesPage;
