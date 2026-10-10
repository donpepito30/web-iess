import React from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "../components/Link";
import Pagination from "../components/Pagination";
import { BlogPost } from "../data/blogPosts";

interface BlogListProps {
  blogSearch: string;
  setBlogSearch: (val: string) => void;
  selectedBlogCategory: string;
  setSelectedBlogCategory: (val: string) => void;
  blogCurrentPage: number;
  setBlogCurrentPage: (val: number) => void;
  blogPostsPerPage: number;
  BLOG_POSTS: BlogPost[];
  navigateToBlogPage: (page: number) => void;
}

export default function BlogList({
  blogSearch,
  setBlogSearch,
  selectedBlogCategory,
  setSelectedBlogCategory,
  blogCurrentPage,
  setBlogCurrentPage,
  blogPostsPerPage,
  BLOG_POSTS,
  navigateToBlogPage
}: BlogListProps) {

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = blogSearch === "" || 
      post.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      post.metaDescription.toLowerCase().includes(blogSearch.toLowerCase()) ||
      post.keywords.some(kw => kw.toLowerCase().includes(blogSearch.toLowerCase()));
    
    const matchesCategory = selectedBlogCategory === "All" || post.category === selectedBlogCategory;

    return matchesSearch && matchesCategory;
  });

  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / blogPostsPerPage) || 1;
  const safePage = Math.min(Math.max(1, blogCurrentPage), totalPages);

  const offset = (safePage - 1) * blogPostsPerPage;
  const paginatedPosts = filteredPosts.slice(offset, offset + blogPostsPerPage);

  return (
    <div id="blog-header-anchor" className="space-y-6 animate-fade-in font-sans">
      {/* Buscador y Filtros del Blog */}
      <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-left">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
              <span className="text-2xl leading-none">📚</span>
              Guías y Artículos de Trámites IESS
            </h2>
            <p className="text-xs text-slate-500">
              Encuentra análisis profundos, cambios en normativas, plazos de desembolso y requisitos explicados de manera sencilla.
            </p>
          </div>
          <span className="bg-[#0a1f42] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider font-mono shrink-0">
            Actualizado 2026
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow bg-white border-2 border-[#0a1f42]/10 rounded-xl px-3 py-2 flex items-center gap-2 focus-within:border-[#0a1f42] transition-colors h-11">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={blogSearch}
              onChange={(e) => {
                setBlogSearch(e.target.value);
                setBlogCurrentPage(1);
              }}
              placeholder="Buscar guías por palabra clave (ej. jubilación, quirografario)..."
              className="w-full text-xs font-bold text-[#0a1f42] placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {blogSearch && (
              <button
                type="button"
                onClick={() => {
                  setBlogSearch("");
                  setBlogCurrentPage(1);
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Selector de Categoría */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1 shrink-0">
            {["All", "Jubilación", "Préstamos", "Trámites", "Salud"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedBlogCategory(cat);
                  setBlogCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-xs font-extrabold rounded-xl border transition-all whitespace-nowrap h-11 cursor-pointer ${
                  selectedBlogCategory === cat
                    ? "bg-[#0a1f42] text-white border-[#0a1f42]"
                    : "bg-white text-slate-600 border-slate-250 hover:bg-slate-50"
                }`}
              >
                {cat === "All" ? "Todos" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Artículos con Paginación */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
          <span className="text-4xl">🔍</span>
          <h3 className="text-sm font-bold text-slate-700">No encontramos resultados</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Prueba buscando otros términos o seleccionando otra categoría en los filtros superiores.
          </p>
          <button
            type="button"
            onClick={() => {
              setBlogSearch("");
              setSelectedBlogCategory("All");
              setBlogCurrentPage(1);
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0a1f42] font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paginatedPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white border border-slate-200 hover:border-[#c9a84c] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer group flex flex-col h-full text-left hover:no-underline"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-3 left-3 bg-[#0a1f42] text-white font-black text-[9px] uppercase px-2 py-0.5 rounded shadow">
                    {post.category}
                  </span>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-405 font-mono block">
                      📅 {post.publishDate} • ⏱️ {post.readTime} min lectura
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#0a1f42] leading-snug group-hover:text-[#c9a84c] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-3">
                      {post.metaDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium">
                    <span className="text-slate-405">Por: {post.author}</span>
                    <span className="font-extrabold text-[#0a1f42] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Ver Guía <ArrowRight className="w-3.5 h-3.5 text-[#c9a84c]" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Componente Modular de Paginación */}
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={blogPostsPerPage}
            onPageChange={(page) => navigateToBlogPage(page)}
            getPageUrl={(page) => (page <= 1 ? "/blog" : `/blog/page/${page}`)}
            ariaLabel="Paginación de artículos del blog IESS"
            baseUrl="/blog"
          />
        </div>
      )}
    </div>
  );
}
