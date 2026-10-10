import React from "react";
import { Link } from "./Link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-[#030f24] text-slate-300 border-t border-slate-900 pt-12 pb-8 mt-auto text-xs">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Trámites más buscados (10 links) */}
          <div className="space-y-3">
            <span className="text-white font-extrabold uppercase tracking-wider block text-xs border-b border-slate-800 pb-1">
              Trámites más Buscados
            </span>
            <ul className="space-y-1.5 font-medium list-none pl-0">
              <li><Link to="/procedimiento/jubilacion-vejez" className="hover:text-white transition-colors">👴 Jubilación por Vejez</Link></li>
              <li><Link to="/procedimiento/jubilacion-invalidez" className="hover:text-white transition-colors">🏥 Jubilación por Invalidez</Link></li>
              <li><Link to="/procedimiento/montepio" className="hover:text-white transition-colors">📜 Pensión de Montepío</Link></li>
              <li><Link to="/procedimiento/prestamo-quirografario" className="hover:text-white transition-colors">💰 Préstamo Quirografario</Link></li>
              <li><Link to="/procedimiento/prestamo-hipotecario" className="hover:text-white transition-colors">🏠 Préstamo Hipotecario</Link></li>
              <li><Link to="/procedimiento/afiliacion-voluntaria" className="hover:text-white transition-colors">📝 Afiliación Voluntaria</Link></li>
              <li><Link to="/procedimiento/subsidio-maternidad" className="hover:text-white transition-colors">🤱 Subsidio de Maternidad</Link></li>
              <li><Link to="/procedimiento/cesantia-desempleo" className="hover:text-white transition-colors">💼 Seguro de Desempleo</Link></li>
              <li><Link to="/procedimiento/responsabilidad-patronal" className="hover:text-white transition-colors">🏢 Responsabilidad Patronal</Link></li>
              <li><Link to="/procedimiento/quejas-canales-denuncia" className="hover:text-white transition-colors">📞 Canales de Denuncias</Link></li>
            </ul>
          </div>

          {/* Col 2: Categorías */}
          <div className="space-y-3">
            <span className="text-white font-extrabold uppercase tracking-wider block text-xs border-b border-slate-800 pb-1">
              Categorías de Guías
            </span>
            <ul className="space-y-1.5 font-medium list-none pl-0">
              <li><Link to="/afiliacion" className="hover:text-white transition-colors">📁 Afiliación y Seguros</Link></li>
              <li><Link to="/historia-laboral" className="hover:text-white transition-colors">⏱️ Historia Laboral</Link></li>
              <li><Link to="/prestamos-biess" className="hover:text-white transition-colors">💰 Préstamos BIESS</Link></li>
              <li><Link to="/fondos-reserva" className="hover:text-white transition-colors">🛡️ Fondos de Reserva</Link></li>
              <li><Link to="/cesantia" className="hover:text-white transition-colors">🚪 Seguro de Cesantía</Link></li>
              <li><Link to="/jubilacion" className="hover:text-white transition-colors">👴 Jubilaciones IESS</Link></li>
              <li><Link to="/salud" className="hover:text-white transition-colors">🏥 Cobertura de Salud</Link></li>
              <li><Link to="/certificados" className="hover:text-white transition-colors">📜 Certificados de Ley</Link></li>
              <li><Link to="/empleadores" className="hover:text-white transition-colors">🏢 Obligaciones Patronales</Link></li>
              <li><Link to="/herramientas" className="hover:text-white transition-colors">🛠️ Herramientas de Ley</Link></li>
            </ul>
          </div>

          {/* Col 3: Ciudades */}
          <div className="space-y-3">
            <span className="text-white font-extrabold uppercase tracking-wider block text-xs border-b border-slate-800 pb-1">
              Oficinas por Ciudad
            </span>
            <ul className="space-y-1.5 font-medium list-none pl-0">
              <li><Link to="/iess/quito" className="hover:text-white transition-colors">🏢 IESS Quito (Pichincha)</Link></li>
              <li><Link to="/iess/guayaquil" className="hover:text-white transition-colors">🏢 IESS Guayaquil (Guayas)</Link></li>
              <li><Link to="/iess/cuenca" className="hover:text-white transition-colors">🏢 IESS Cuenca (Azuay)</Link></li>
              <li><Link to="/iess/ambato" className="hover:text-white transition-colors">🏢 IESS Ambato (Tungurahua)</Link></li>
              <li><Link to="/iess/machala" className="hover:text-white transition-colors">🏢 IESS Machala (El Oro)</Link></li>
            </ul>
            
            <div className="pt-2">
              <span className="text-slate-400 font-extrabold uppercase block text-[10px] mb-1">Línea Directa IESS</span>
              <p className="text-[11px] leading-snug text-slate-400">
                Llama sin costo al <span className="font-extrabold text-white">1800-4377</span> (de lunes a viernes) para turnos médicos y soporte.
              </p>
            </div>
          </div>

          {/* Col 4: Legal y Confianza */}
          <div className="space-y-3">
            <span className="text-white font-extrabold uppercase tracking-wider block text-xs border-b border-slate-800 pb-1">
              Legal y Confianza
            </span>
            <ul className="space-y-1.5 font-medium list-none pl-0">
              <li><Link to="/sobre-nosotros" className="hover:text-white transition-colors">ℹ️ Sobre Nosotros</Link></li>
              <li><Link to="/editorial" className="hover:text-white transition-colors">✍️ Metodología Editorial</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">📧 Contacto Directo</Link></li>
              <li><Link to="/privacidad" className="hover:text-white transition-colors">🔒 Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition-colors">⚖️ Términos y Condiciones</Link></li>
              <li><Link to="/aviso-legal" className="hover:text-white transition-colors">⚠️ Aviso Legal</Link></li>
            </ul>
            
            <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 space-y-1 text-[10px] text-slate-400">
              <span className="font-extrabold text-white uppercase block tracking-wider">Compromiso Cívico</span>
              <p className="leading-relaxed">
                Este portal es una herramienta informativa 100% gratuita que busca educar y guiar de forma clara y transparente al afiliado ecuatoriano.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-slate-500">
          <p>
            &copy; {currentYear} Guía IESS Ciudadano. Todos los derechos reservados. Información actualizada {currentYear}.
          </p>
          <p className="max-w-md md:text-right leading-relaxed font-light">
            Nota: Este portal es de carácter divulgativo e independiente y no sustituye de ninguna forma al sitio gubernamental oficial del Instituto Ecuatoriano de Seguridad Social (iess.gob.ec).
          </p>
        </div>

      </div>
    </footer>
  );
}
