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
            <strong>IESS Asistente</strong> es un proyecto cívico e independiente dedicado exclusivamente a orientar y facilitar la comprensión de trámites, derechos y deberes en la seguridad social del Ecuador.
          </p>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">¿Quiénes Somos?</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Somos un equipo editorial independiente de profesionales y entusiastas cívicos que investiga y sintetiza la normativa pública para hacerla comprensible para afiliados, jubilados, pensionistas y empleadores en Ecuador. No tenemos filiación partidista ni ánimo de lucro abusivo.
          </p>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">¿Cómo se Redactan Nuestras Guías?</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Redactamos cada guía a partir de fuentes primarias y oficiales de la República del Ecuador (Ley de Seguridad Social, resoluciones del Consejo Directivo, Registro Oficial y portales institucionales). Empleamos modelos de inteligencia artificial como herramientas de apoyo para la síntesis de textos y estructuración de borradores, pero cada dato normativo, requisito y cálculo es revisado y verificado antes de publicarse.
          </p>
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 text-sm text-slate-800">
            <span className="font-extrabold text-[#0a1f42] block">Aviso Importante: No Somos el IESS</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              IESS Asistente es un portal estrictamente informativo y no oficial. No formamos parte, no tenemos vínculo comercial ni representamos al Instituto Ecuatoriano de Seguridad Social (IESS) ni al Banco del IESS (BIESS). Los trámites oficiales y transacciones se realizan única y exclusivamente en los sitios oficiales del Estado: iess.gob.ec y biess.fin.ec.
            </p>
          </div>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">Reporte de Errores y Transparencia</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Si identificas algún dato desactualizado o error en nuestras guías, escríbenos directamente a <a href="mailto:contacto@iessasistente.com" className="text-[#c9a84c] font-bold hover:underline">contacto@iessasistente.com</a>. Revisamos los reportes en un plazo menor a 48 horas laborables.
          </p>
        </div>
      )}
      
      {activeLegalPage === 'editorial' && (
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] border-b pb-3 uppercase tracking-tight">Metodología Editorial</h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            En <strong>IESS Asistente</strong>, el rigor y la honestidad en la información de seguridad social son pilares esenciales. El contenido sobre pensiones, fondos de reserva y derechos del ciudadano exige transparencia de acuerdo con los más altos estándares de calidad YMYL (Your Money or Your Life).
          </p>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">1. Fuentes Oficiales y Primarias</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 list-none pl-0">
            <li>Constitución de la República del Ecuador.</li>
            <li>Ley de Seguridad Social y Código del Trabajo.</li>
            <li>Resoluciones y gacetas normativas del Consejo Directivo del IESS.</li>
            <li>Publicaciones del Registro Oficial y portales institucionales (iess.gob.ec y biess.fin.ec).</li>
          </ul>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">2. Uso Responsable de IA y Revisión Humana</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Empleamos modelos de inteligencia artificial como herramientas de apoyo para estructurar información, redactar resúmenes preliminares y responder consultas orientativas a través de nuestro asistente en línea. Sin embargo, todas las guías definitivas, requisitos, montos y tablas son revisadas y verificadas por nuestro equipo editorial antes de su publicación, contrastando cada dato con la fuente oficial.
          </p>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">3. Frecuencia de Actualización</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Revisamos nuestras guías de forma periódica y ante reformas sustanciales (variaciones del Salario Básico Unificado, reformas a tasas del BIESS o resoluciones institucionales).
          </p>
          <h2 className="text-lg font-bold text-[#0a1f42] mt-4">4. Política de Corrección de Errores</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Cualquier imprecisión detectada puede reportarse de inmediato a <a href="mailto:contacto@iessasistente.com" className="text-[#c9a84c] font-bold hover:underline">contacto@iessasistente.com</a>. Evaluamos reportes en un plazo máximo de 48 horas laborables.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <strong className="text-[#0a1f42] block mb-1">Deslinde Institucional:</strong>
            IESS Asistente es un proyecto independiente de orientación ciudadana. No somos el IESS ni gestionamos trámites de manera oficial. Para trámites vinculantes, consulte siempre los canales oficiales de la institución.
          </div>
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
