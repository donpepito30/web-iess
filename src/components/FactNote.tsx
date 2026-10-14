import React from "react";
import { FACTS, Fact } from "../data/facts";
import { Info, AlertCircle } from "lucide-react";

export interface FactNoteProps {
  ids: string[];
  className?: string;
}

export function renderFactNoteHtml(ids: string[]): string {
  if (!ids || ids.length === 0) return "";
  const facts = ids
    .map(id => FACTS[id])
    .filter((f): f is Fact => Boolean(f));
  if (facts.length === 0) return "";

  return `<div class="my-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-slate-650">` +
    facts.map(fact => `
<div class="space-y-1">
<p class="leading-relaxed font-sans">
Dato referencial: ${fact.value} · Fuente: ${fact.source} · Consultado: ${fact.verifiedAt}
</p>
${!fact.verified ? `
<p class="text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200 font-medium text-[11px]">
Confirma este valor en iess.gob.ec antes de realizar tu trámite
</p>
` : ''}
</div>
`).join('') + `</div>`;
}

export default function FactNote({ ids, className = "" }: FactNoteProps) {
  if (!ids || ids.length === 0) return null;

  const facts = ids
    .map(id => FACTS[id])
    .filter((f): f is Fact => Boolean(f));

  if (facts.length === 0) return null;

  return (
    <div className={`my-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-slate-650 ${className}`}>
      {facts.map(fact => {
        const isUnverified = !fact.verified;
        return (
          <div key={fact.id} className="space-y-1">
            <div className="flex items-start gap-1.5 leading-relaxed font-sans">
              <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>
                Dato referencial: {fact.value} · Fuente: {fact.source} · Consultado: {fact.verifiedAt}
              </span>
            </div>
            {isUnverified && (
              <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200 font-medium text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                <span>Confirma este valor en iess.gob.ec antes de realizar tu trámite</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
