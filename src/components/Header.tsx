import React from "react";
import { Link } from "./Link";
import { Building2 } from "lucide-react";

interface HeaderProps {
  onOpenAssistant: () => void;
}

export default function Header({ onOpenAssistant }: HeaderProps) {
  return (
    <header id="app-header" className="bg-[#0a1f42] text-white sticky top-0 z-40 shadow-md border-b-4 border-[#c9a84c] transition-all">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Zone 1: Single element wordmark brand as a Link */}
        <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded-md px-1 hover:no-underline">
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
        
        {/* Zone 2: Crawleable navigation simple-menu */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-300">
          <Link to="/" className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline">Trámites</Link>
          <Link to="/jubilacion" className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline">Jubilación</Link>
          <Link to="/prestamos-biess" className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline">Préstamos BIESS</Link>
          <Link to="/afiliacion" className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline">Afiliación</Link>
          <Link to="/fondos-reserva" className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline">Fondos de reserva</Link>
          <Link to="/herramientas" className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline">Herramientas</Link>
          <Link to="/blog" className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline">Blog</Link>
          <Link to="/faq" className="hover:text-[#c9a84c] transition-colors py-1 hover:no-underline">FAQ</Link>
        </nav>
        
        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={onOpenAssistant}
            className="px-3.5 py-2 text-[10px] sm:text-xs font-black text-[#0a1f42] bg-[#c9a84c] rounded-xl hover:bg-white transition-all shadow-md active:scale-95 duration-100 uppercase tracking-wider cursor-pointer border border-[#d8b556] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Asistente IA 🤖
          </button>
        </div>
      </div>
    </header>
  );
}
