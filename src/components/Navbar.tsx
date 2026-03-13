import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/contact", label: t.nav.contact },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/loho.png" alt="Emaar Libya" className="h-12 w-auto max-w-[150px] md:h-16 rounded-md object-contain drop-shadow-sm" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive(link.to) ? "text-accent font-semibold" : "text-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
          >
            <Globe className="h-4 w-4" />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b border-border bg-gradient-to-b from-[#05070a]/75 via-[#0b0f14]/62 to-[#05070a]/75 backdrop-blur-2xl ring-1 ring-white/10 shadow-[0_25px_70px_-35px_rgba(0,0,0,0.9)]"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`group rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/10 ${isActive(link.to) ? "text-white bg-white/15 ring-1 ring-white/15" : "text-white"
                    }`}
                >
                  <span className="relative">
                    {link.label}
                    <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
              <button
                onClick={() => { setLang(lang === "ar" ? "en" : "ar"); setOpen(false); }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/90 transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/10 hover:text-white"
              >
                <Globe className="h-4 w-4" />
                {lang === "ar" ? "English" : "عربي"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
