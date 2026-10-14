import React from "react";
import { AUTHORS, DEFAULT_AUTHOR } from "../data/authors";
import { Calendar, RefreshCw, FileText } from "lucide-react";
import Link from "./Link";

interface ArticleMetaProps {
  authorSlug?: string;
  publishDate: string;
  dateModified?: string;
  reviewerSlug?: string;
  className?: string;
}

export default function ArticleMeta({
  authorSlug = "equipo-editorial",
  publishDate,
  dateModified,
  className = ""
}: ArticleMetaProps) {
  const author = (authorSlug && AUTHORS[authorSlug]) ? AUTHORS[authorSlug] : DEFAULT_AUTHOR;
  const effectiveDateModified = dateModified || publishDate;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const partes = dateStr.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dateStr;
  };

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between text-xs sm:text-sm text-slate-650 ${className}`}>
      {/* Authorship Block */}
      <div className="flex items-center gap-3">
        {author.isRealPerson && author.imageUrl ? (
          <img
            src={author.imageUrl}
            alt={author.name}
            className="w-10 h-10 rounded-full border-2 border-[#c9a84c] object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-[#0a1f42] text-[#c9a84c] flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            <FileText className="w-5 h-5 text-[#c9a84c]" />
          </div>
        )}
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Autoría editorial</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-extrabold text-[#0a1f42] text-sm">Por {author.name}</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <Link 
              to="/metodologia-editorial" 
              className="text-[11px] text-[#c9a84c] hover:underline font-semibold"
            >
              Metodología editorial
            </Link>
          </div>
          <span className="text-[11px] text-slate-500 leading-tight block">
            {author.isRealPerson ? author.title : "Redacción con base en fuentes oficiales y contraste normativo"}
          </span>
        </div>
      </div>

      {/* Timestamps Block */}
      <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:gap-1 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4 font-mono text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Publicado: <strong className="text-slate-700 font-sans">{formatDate(publishDate)}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-slate-600">
          <RefreshCw className="w-3.5 h-3.5 text-[#c9a84c]" />
          <span>Última revisión: <strong className="text-[#0a1f42] font-sans">{formatDate(effectiveDateModified)}</strong></span>
        </div>
      </div>
    </div>
  );
}
