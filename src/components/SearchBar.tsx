import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, onSearch }: SearchBarProps) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-2 flex items-center gap-2 border border-slate-200">
      <div className="flex-1 flex items-center pl-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
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
          className="w-full text-slate-800 bg-transparent py-2.5 focus:outline-none text-sm placeholder:text-slate-400 font-medium font-sans"
        />
        {searchQuery && (
          <button 
            type="button"
            onClick={() => setSearchQuery("")}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <button 
        type="button"
        onClick={onSearch}
        className="bg-[#0a1f42] hover:bg-[#123162] text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg active:scale-95 duration-100 cursor-pointer font-sans"
      >
        Buscar
      </button>
    </div>
  );
}
