import React from "react";
import { AUTHORS, DEFAULT_REVIEWER } from "../data/authors";
import { ShieldCheck, UserCheck, Calendar } from "lucide-react";

interface ArticleMetaProps {
  authorSlug: string;
  publishDate: string;
  dateModified: string;
  reviewerSlug?: string;
  className?: string;
}

export default function ArticleMeta({
  authorSlug,
  publishDate,
  dateModified,
  reviewerSlug = "eliana-suarez",
  className = ""
}: ArticleMetaProps) {
  const author = AUTHORS[authorSlug] || AUTHORS["fernando-torres"];
  const reviewer = AUTHORS[reviewerSlug] || DEFAULT_REVIEWER;

  const formatDate = (dateStr: string) => {
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
        <img
          src={author.imageUrl}
          alt={author.name}
          className="w-10 h-10 rounded-full border-2 border-[#c9a84c] object-cover"
        />
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Autor del contenido</span>
          <span className="font-extrabold text-[#0a1f42] text-sm block">{author.name}</span>
          <span className="text-[11px] text-slate-500 leading-tight block">{author.title}</span>
        </div>
      </div>

      {/* Reviewer Block */}
      {reviewer && (
        <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Revisado por
            </span>
            <span className="font-extrabold text-[#0a1f42] text-sm block">{reviewer.name}</span>
            <span className="text-[11px] text-slate-500 leading-tight block">{reviewer.title}</span>
          </div>
        </div>
      )}

      {/* Timestamps Block */}
      <div className="flex flex-col gap-1 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Publicado: {formatDate(publishDate)}</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-slate-500">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c9a84c]"></span>
          <span>Revisión: {formatDate(dateModified)}</span>
        </div>
      </div>
    </div>
  );
}
