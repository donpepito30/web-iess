import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "../components/Link";

interface LegalPageProps {
  activeLegalPage: 'about' | 'editorial' | 'contact' | 'privacy' | 'terms' | 'legal';
}

export default function LegalPage({ activeLegalPage }: LegalPageProps) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-3xl mx-auto w-full select-text leading-relaxed font-sans text-left animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#0a1f42] hover:text-[#c9a84c] mb-6 font-extrabold transition-colors cursor-pointer hover:no-underline">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al Inicio
      </Link>
      
      {activeLegalPage === 'about' && (
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] border-b pb-3 uppercase tracking-tight">Sobre Nosotros</h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Guía IESS Ciudadano</strong> es un portal independiente de orientación y asistencia ciudadana diseñado exclusivamente para educar y facilitar el entendimiento de la seguridad social en el Ecuador.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Nuestra misión es democratizar el acceso a la información pública, traduciendo reglamentos complejos y boletines técnicos a un lenguaje claro, sencillo y accionable para afiliados, jubilados, pensionistas y empleadores del país. Creemos firmemente que una ciudadanía informada es capaz de ejercer y defender sus derechos de forma más autónoma y justa.
          </p>
        </div>
      )}
      
      {activeLegalPage === 'editorial' && (
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] border-b pb-3 uppercase tracking-tight">Metodología Editorial</h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            En <strong>Guía IESS Ciudadano</strong> nos tomamos la fidelidad informativa con la máxima rigurosidad normativa. Todos nuestros artículos, tutoriales y bases de datos son redactados, revisados y contrastados de forma manual por profesionales con amplio entendimiento en la legislación laboral y seguridad social de Ecuador.
          </p>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">Fuentes de Contraste</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 list-none pl-0">
            <li>Ley Orgánica de Seguridad Social vigente.</li>
            <li>Código del Trabajo de la República del Ecuador.</li>
            <li>Boletines de prensa y resoluciones del Consejo Directivo del IESS.</li>
            <li>Reglamentos de crédito emitidos por el BIESS.</li>
          </ul>
        </div>
      )}
      
      {activeLegalPage === 'contact' && (
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] border-b pb-3 uppercase tracking-tight">Contacto</h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            ¿Tienes dudas, sugerencias sobre nuestras guías, o deseas reportar alguna inconsistencia técnica en nuestros simuladores de oficios? Nuestro equipo editorial te escuchará con gusto.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4 text-sm text-[#0a1f42] font-semibold space-y-2">
            <p>📧 Correo Electrónico: <a href="mailto:contacto@iessasistente.com" className="text-[#c9a84c] hover:underline">contacto@iessasistente.com</a></p>
            <p>🕒 Horario de Atención: Lunes a Viernes de 08:30 a 17:30 (GMT-5)</p>
          </div>
        </div>
      )}
      
      {activeLegalPage === 'privacy' && (
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] border-b pb-3 uppercase tracking-tight">Política de Privacidad</h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            Tu privacidad es de absoluta importancia para nosotros. Garantizamos plenamente la confidencialidad de tu información personal en nuestro portal:
          </p>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">Procesamiento Local Seguro</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Toda la información personal e identificativa ingresada en nuestros generadores de oficios de ley o calculadoras interactivas (como cédulas, nombres, empleadores o saldos bancarios) se procesa <strong>única y exclusivamente de forma local en tu propio navegador web</strong>. Estos datos jamás se almacenan, registran ni transfieren a servidores externos.
          </p>
        </div>
      )}
      
      {activeLegalPage === 'terms' && (
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] border-b pb-3 uppercase tracking-tight">Términos y Condiciones</h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            El acceso y uso de este portal web independiente de orientación implica la aceptación de los siguientes términos:
          </p>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">Servicio Informativo Gratuito</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Guía IESS Ciudadano</strong> es un servicio libre de costo. No realizamos trámites de cobro ni poseemos intermediarios patronales. La plataforma se ofrece "tal cual" para fines educativos y cívicos, instando al afiliado a verificar siempre sus datos directamente en la entidad oficial correspondiente.
          </p>
        </div>
      )}
      
      {activeLegalPage === 'legal' && (
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] border-b pb-3 uppercase tracking-tight">Aviso Legal</h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Guía IESS Ciudadano</strong> es una plataforma informativa independiente y autónoma. No posee afiliación oficial, patrocinio comercial, delegación legal ni vinculación directa alguna con el Instituto Ecuatoriano de Seguridad Social (IESS), con el Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) ni con el Gobierno de la República del Ecuador.
          </p>
          <p className="text-sm text-slate-750 leading-relaxed">
            Todos los isotipos, logotipos y marcas de propiedad institucional mostrados en las guías se utilizan estrictamente para fines de ilustración pública identificativa conforme a los derechos de libre acceso a la información ciudadana.
          </p>
        </div>
      )}
    </article>
  );
}
