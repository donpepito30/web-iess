import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  getPageUrl?: (page: number) => string;
  ariaLabel?: string;
  baseUrl?: string;
  showFirstLast?: boolean;
  className?: string;
}

/**
 * Calculates sliding window page numbers with ellipsis for large page ranges.
 * e.g., [1, '...', 4, 5, 6, '...', 10]
 */
export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  delta: number = 1
): (number | "ellipsis-start" | "ellipsis-end")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: (number | "ellipsis-start" | "ellipsis-end")[] = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);

  if (left > 2) {
    range.push("ellipsis-start");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push("ellipsis-end");
  }

  range.push(totalPages);

  return range;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  getPageUrl,
  ariaLabel = "Paginación de contenidos",
  baseUrl = "/blog",
  showFirstLast = false,
  className = ""
}) => {
  // Default URL builder supporting clean SEO-friendly URLs:
  // Page 1: /blog
  // Page 2+: /blog/page/2 (or /blog?page=2)
  const resolvePageUrl = (page: number): string => {
    if (getPageUrl) {
      return getPageUrl(page);
    }
    if (page <= 1) {
      return baseUrl;
    }
    // Clean SEO URL pattern: /blog/page/2
    return `${baseUrl}/page/${page}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  const paginationRange = getPaginationRange(currentPage, totalPages, 1);

  const handleLinkClick = (page: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow users to open in new tab (Ctrl/Cmd + click) normally
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      if (page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    }
  };

  const startRecord = itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endRecord = itemsPerPage && totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : null;

  return (
    <div className={`space-y-3 pt-4 pb-2 ${className}`}>
      {/* Optional Result Counters for User Clarity */}
      {totalItems !== undefined && startRecord !== null && endRecord !== null && (
        <div className="text-center text-xs text-slate-500 font-medium font-sans">
          Mostrando <strong className="text-slate-800 font-bold">{startRecord}</strong> -{" "}
          <strong className="text-slate-800 font-bold">{endRecord}</strong> de{" "}
          <strong className="text-[#0a1f42] font-bold">{totalItems}</strong> guías publicadas
        </div>
      )}

      {/* Accessible Navigation Container */}
      <nav
        role="navigation"
        aria-label={ariaLabel}
        className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 select-none"
      >
        {/* Ir al inicio (Opcional para catálogos muy extensos) */}
        {showFirstLast && currentPage > 2 && (
          <a
            href={resolvePageUrl(1)}
            onClick={(e) => handleLinkClick(1, e)}
            aria-label="Ir a la primera página"
            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-xs font-bold text-slate-700 bg-white border border-slate-250 rounded-xl hover:bg-slate-50 hover:border-[#0a1f42] hover:text-[#0a1f42] transition-colors shadow-2xs"
          >
            <ChevronsLeft className="w-4 h-4" />
          </a>
        )}

        {/* Botón Página Anterior */}
        {currentPage > 1 ? (
          <a
            href={resolvePageUrl(currentPage - 1)}
            onClick={(e) => handleLinkClick(currentPage - 1, e)}
            rel="prev"
            aria-label="Ir a la página anterior"
            className="inline-flex items-center justify-center gap-1 px-3 h-9 sm:h-10 text-xs font-bold text-[#0a1f42] bg-white border border-slate-250 rounded-xl hover:bg-slate-50 hover:border-[#0a1f42] transition-all shadow-2xs group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Anterior</span>
          </a>
        ) : (
          <span
            aria-disabled="true"
            aria-label="Página anterior deshabilitada"
            className="inline-flex items-center justify-center gap-1 px-3 h-9 sm:h-10 text-xs font-semibold text-slate-350 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed opacity-60"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </span>
        )}

        {/* Números de Página con Enlaces Rastreables para SEO */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {paginationRange.map((pageItem, index) => {
            if (pageItem === "ellipsis-start" || pageItem === "ellipsis-end") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  aria-hidden="true"
                  className="w-8 h-9 sm:w-9 sm:h-10 inline-flex items-center justify-center text-slate-400 font-bold select-none text-sm"
                >
                  …
                </span>
              );
            }

            const pageNum = pageItem as number;
            const isCurrent = pageNum === currentPage;

            if (isCurrent) {
              return (
                <span
                  key={pageNum}
                  aria-current="page"
                  aria-label={`Página ${pageNum}, página actual`}
                  className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-xs font-black text-white bg-[#0a1f42] border-2 border-[#0a1f42] rounded-xl shadow-sm scale-105 transition-transform"
                >
                  {pageNum}
                </span>
              );
            }

            return (
              <a
                key={pageNum}
                href={resolvePageUrl(pageNum)}
                onClick={(e) => handleLinkClick(pageNum, e)}
                aria-label={`Ir a la página ${pageNum}`}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-xs font-bold text-slate-700 bg-white border border-slate-250 rounded-xl hover:bg-slate-50 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all shadow-2xs cursor-pointer"
              >
                {pageNum}
              </a>
            );
          })}
        </div>

        {/* Botón Página Siguiente */}
        {currentPage < totalPages ? (
          <a
            href={resolvePageUrl(currentPage + 1)}
            onClick={(e) => handleLinkClick(currentPage + 1, e)}
            rel="next"
            aria-label="Ir a la página siguiente"
            className="inline-flex items-center justify-center gap-1 px-3 h-9 sm:h-10 text-xs font-bold text-[#0a1f42] bg-white border border-slate-250 rounded-xl hover:bg-slate-50 hover:border-[#0a1f42] transition-all shadow-2xs group"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        ) : (
          <span
            aria-disabled="true"
            aria-label="Página siguiente deshabilitada"
            className="inline-flex items-center justify-center gap-1 px-3 h-9 sm:h-10 text-xs font-semibold text-slate-350 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed opacity-60"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        )}

        {/* Ir al final (Opcional) */}
        {showFirstLast && currentPage < totalPages - 1 && (
          <a
            href={resolvePageUrl(totalPages)}
            onClick={(e) => handleLinkClick(totalPages, e)}
            aria-label="Ir a la última página"
            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-xs font-bold text-slate-700 bg-white border border-slate-250 rounded-xl hover:bg-slate-50 hover:border-[#0a1f42] hover:text-[#0a1f42] transition-colors shadow-2xs"
          >
            <ChevronsRight className="w-4 h-4" />
          </a>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
