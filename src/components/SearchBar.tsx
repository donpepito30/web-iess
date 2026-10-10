import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, onSearch }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-1.5 sm:p-2 flex items-center gap-2 border border-slate-200 transition-all duration-200 focus-within:ring-2 focus-within:ring-[#c9a84c] focus-within:border-[#c9a84c]">
      <div className="flex-1 flex items-center pl-3 sm:pl-4 min-w-0">
        <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5 transition-colors group-focus-within:text-[#c9a84c]" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          placeholder="Escribe jubilación, quirografario, afiliación voluntaria..."
          className="w-full text-slate-900 bg-transparent py-2.5 sm:py-3 focus:outline-none text-xs sm:text-sm md:text-base placeholder:text-slate-400 font-medium font-sans truncate"
        />
        {searchQuery && (
          <button 
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Borrar búsqueda"
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0 ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <button 
        type="button"
        onClick={onSearch}
        className="bg-[#0a1f42] hover:bg-[#143468] text-white text-xs sm:text-sm font-extrabold py-2.5 sm:py-3 px-5 sm:px-7 rounded-xl transition-all shadow-md active:scale-95 duration-100 cursor-pointer font-sans shrink-0 flex items-center gap-1.5"
      >
        Buscar
      </button>
    </div>
  );
}
