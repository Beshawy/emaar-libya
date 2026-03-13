import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Footer = () => {
  const { t, lang } = useLanguage();
  const { companyInfo } = useData();
  const facebookHref =
    companyInfo.facebook?.trim()
      ? companyInfo.facebook.trim().startsWith("http")
        ? companyInfo.facebook.trim()
        : `https://${companyInfo.facebook.trim()}`
      : "";

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <AnimatedSection direction="up" delay={0.05}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company info */}
            <div className="footer-col">
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/logo.jpeg" alt="Emaar Libya" className="h-10 w-10 rounded object-cover" />
                <span className="font-cairo font-bold text-lg text-secondary-foreground">
                  {lang === "ar" ? "إعمار ليبيا" : "Emaar Libya"}
                </span>
              </div>
              <p className="text-sm text-secondary-foreground/70 leading-relaxed">
                {t.footer.description}
              </p>
            </div>

            {/* Quick links */}
            <div className="footer-col">
              <h3 className="font-cairo font-semibold text-lg mb-4">{t.footer.quickLinks}</h3>
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-secondary-foreground/70 hover:text-accent transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h3 className="font-cairo font-semibold text-lg mb-4">{t.footer.contactInfo}</h3>
              <div className="flex flex-col gap-3 text-sm text-secondary-foreground/70">
                <div className="flex items-center gap-2 group">
                  <Phone className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-125" />
                  <span dir="ltr">{companyInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <Mail className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-125" />
                  <span>{companyInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <MapPin className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-125" />
                  <span>{lang === "ar" ? companyInfo.addressAr : companyInfo.address}</span>
                </div>
                {!!facebookHref && (
                  <a
                    href={facebookHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2 group text-secondary-foreground/70 hover:text-accent transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                  >
                    <Facebook className="mt-0.5 h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-125" />
                    <span dir="ltr" className="break-all leading-relaxed">
                      {companyInfo.facebook}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <div className="border-t border-secondary-foreground/10 py-4">
        <p className="text-center text-xs text-secondary-foreground/50">{t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
