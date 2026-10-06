import React from "react";
import { Link2, BookmarkCheck } from "lucide-react";

export interface SourceItem {
  label: string;
  url: string;
  accessedAt: string;
}

interface SourcesBlockProps {
  sources: SourceItem[];
  className?: string;
}

export default function SourcesBlock({ sources, className = "" }: SourcesBlockProps) {
  if (!sources || sources.length === 0) return null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const partes = dateStr.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dateStr;
  };

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4 ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
        <BookmarkCheck className="w-5 h-5 text-[#c9a84c]" />
        <h3 className="text-sm font-black text-[#0a1f42] uppercase tracking-wider">
          Fuentes oficiales y normativas de respaldo
        </h3>
      </div>

      {/* List of sources */}
      <ul className="space-y-2 list-none pl-0">
        {sources.map((src, index) => (
          <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Link2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c] font-bold hover:underline hover:text-[#b4923a] transition-colors"
              >
                {src.label}
              </a>
            </div>
            <div className="text-slate-400 font-mono text-[10px] pl-5 sm:pl-0">
              Consulta: {formatDate(src.accessedAt)}
            </div>
          </li>
        ))}
      </ul>

      {/* Trust disclaimer */}
      <p className="text-[11px] text-slate-500 leading-relaxed bg-amber-50/50 border border-amber-100 rounded-lg p-3">
        <strong>Aviso editorial:</strong> Toda la información contenida en esta guía independiente se contrasta con las publicaciones del Registro Oficial de Ecuador, Ley Orgánica de la Seguridad Social y el portal de transparencia del IESS. De requerir asesoría legal o vinculante, se sugiere acudir de forma presencial a las dependencias de la institución.
      </p>
    </div>
  );
}
