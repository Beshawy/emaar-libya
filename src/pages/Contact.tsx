import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Phone, Mail, MapPin, Send, Facebook } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";

const ContactPage = () => {
  const { t, lang } = useLanguage();
  const { companyInfo } = useData();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const facebookHref =
    companyInfo.facebook?.trim()
      ? companyInfo.facebook.trim().startsWith("http")
        ? companyInfo.facebook.trim()
        : `https://${companyInfo.facebook.trim()}`
      : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.contact.formSuccess);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <section className="relative py-16 md:py-24 overflow-hidden flex items-center justify-center">
        <img
          src="/images/photo2.jpg"
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-cairo font-bold text-3xl md:text-4xl text-white mb-2 header-animate header-animate-1 drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
            {t.contact.pageTitle}
          </h1>
          <p className="text-white/85 header-animate header-animate-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
            {t.contact.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <AnimatedSection>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-cairo font-semibold text-foreground">{t.contact.phone}</h3>
                    <a href="https://wa.me/218917916620" dir="ltr" className="text-muted-foreground hover:text-accent transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-cairo font-semibold text-foreground">{t.contact.email}</h3>
                    <a href={`mailto:${companyInfo.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-cairo font-semibold text-foreground">{t.contact.address}</h3>
                    <p className="text-muted-foreground">{lang === "ar" ? companyInfo.addressAr : companyInfo.address}</p>
                  </div>
                </div>
                {!!facebookHref && (
                  <div className="flex items-start gap-4">
                    <Facebook className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h3 className="font-cairo font-semibold text-foreground">Facebook</h3>
                      <a
                        href={facebookHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors break-all"
                        dir="ltr"
                      >
                        {companyInfo.facebook}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder={t.contact.formName}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="email"
                  required
                  placeholder={t.contact.formEmail}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <textarea
                  required
                  rows={5}
                  placeholder={t.contact.formMessage}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground py-3 rounded font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {t.contact.formSend}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
