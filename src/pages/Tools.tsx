import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "../components/Link";
import {
  CalculadoraJubilacion,
  CalculadoraAporteVoluntario,
  CalculadoraMaternidad,
  VerificaQuirografario
} from "../components/Calculators";

interface ToolsProps {
  activeTool: string;
}

export default function Tools({ activeTool }: ToolsProps) {
  return (
    <div className="space-y-6 font-sans text-slate-800 animate-fade-in w-full text-left max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#0a1f42] hover:text-[#c9a84c] mb-4 font-extrabold transition-colors cursor-pointer hover:no-underline">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al Inicio
      </Link>

      {activeTool === 'calculadora-jubilacion' && <CalculadoraJubilacion />}
      {activeTool === 'calculadora-aporte-afiliacion-voluntaria' && <CalculadoraAporteVoluntario />}
      {activeTool === 'calculadora-subsidio-maternidad' && <CalculadoraMaternidad />}
      {activeTool === 'verifica-requisitos-prestamo-quirografario' && <VerificaQuirografario />}
    </div>
  );
}
