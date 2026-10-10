import React, { useState } from "react";
import { Link } from "./Link";
import { Building2, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenAssistant: () => void;
}

export default function Header({ onOpenAssistant }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTramitesClick = () => {
    setMobileMenuOpen(false);
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const element = document.getElementById("catalogo-tramites");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navLinks = [
    { label: "Trámites", to: "/", onClick: handleTramitesClick },
    { label: "Jubilación", to: "/jubilacion" },
    { label: "Préstamos BIESS", to: "/prestamos-biess" },
    { label: "Afiliación", to: "/afiliacion" },
    { label: "Fondos de reserva", to: "/fondos-reserva" },
    { label: "Herramientas", to: "/herramientas" },
    { label: "Blog", to: "/blog" },
    { label: "FAQ", to: "/faq" }
  ];

  return (
    <header id="app-header" className="bg-[#0a1f42] text-white sticky top-0 z-40 shadow-md border-b-4 border-[#c9a84c] transition-all">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Zone 1: Single element wordmark brand as a Link */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded-md px-1 hover:no-underline"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#9a7e36] flex items-center justify-center shadow-md transform rotate-3 group-hover:rotate-12 transition-transform shrink-0">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <span className="text-sm sm:text-base font-black tracking-tight block bg-gradient-to-r from-white via-slate-100 to-[#c9a84c] bg-clip-text text-transparent">
              IESS GUÍA
            </span>
            <span className="text-[9px] block text-slate-300 font-bold tracking-widest leading-none">
              CIUDADANO
            </span>
          </div>
        </Link>
        
        {/* Zone 2: Crawleable navigation simple-menu (Desktop) */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-300">
          {navLinks.map((item) => (
            <Link
              key={item.to + item.label}
              to={item.to}
              onClick={item.onClick}
              className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline font-semibold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Zone 3: Primary Action & Mobile Menu Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAssistant();
            }}
            className="px-3.5 py-2 text-[10px] sm:text-xs font-black text-[#0a1f42] bg-[#c9a84c] rounded-xl hover:bg-white transition-all shadow-md active:scale-95 duration-100 uppercase tracking-wider cursor-pointer border border-[#d8b556] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Asistente IA 🤖
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d2754] border-t border-white/10 px-4 py-3 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={"mobile-" + item.to + item.label}
                to={item.to}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.onClick) item.onClick();
                }}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[#c9a84c] text-xs">→</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
