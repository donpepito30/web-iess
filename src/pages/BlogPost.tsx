import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowRight } from "lucide-react";
import Link from "../components/Link";
import ArticleMeta from "../components/ArticleMeta";
import SourcesBlock from "../components/SourcesBlock";
import AdSlot from "../components/AdSlot";
import { BlogPost as BlogPostType } from "../data/blogPosts";
import { analytics } from "../lib/analytics";

interface BlogPostProps {
  post: BlogPostType;
  blogCurrentPage: number;
  onClear: () => void;
  onConsultChatbot: (title: string, prompt: string) => void;
  allPosts: BlogPostType[];
}

export default function BlogPost({
  post,
  blogCurrentPage,
  onClear,
  onConsultChatbot,
  allPosts
}: BlogPostProps) {
  if (!post) return null;

  useEffect(() => {
    let sent50 = false;
    let sent90 = false;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = window.scrollY / scrollHeight;

      if (!sent50 && progress >= 0.5) {
        sent50 = true;
        analytics.articleRead(post.slug, 50);
      }
      if (!sent90 && progress >= 0.9) {
        sent90 = true;
        analytics.articleRead(post.slug, 90);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [post.slug]);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in font-sans">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <a
          href={blogCurrentPage > 1 ? `/blog/page/${blogCurrentPage}` : "/blog"}
          onClick={(e) => {
            e.preventDefault();
            onClear();
          }}
          className="text-xs font-bold text-[#0a1f42] hover:text-[#c9a84c] transition-colors flex items-center gap-1.5 uppercase tracking-wider cursor-pointer no-underline"
        >
          ← Volver al listado de guías
        </a>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#0a1f42]/5 text-[#0a1f42] uppercase">
            {post.category}
          </span>
          <span className="text-xs text-slate-450 font-medium font-mono">{post.publishDate}</span>
        </div>
      </div>

      <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt || post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight drop-shadow">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Columna de contenido */}
        <div className="lg:col-span-8 space-y-6 select-text">
          
          {/* Trust authorship and verification block (ArticleMeta) */}
          <ArticleMeta 
            authorSlug={post.author === "Fernando Torres" ? "fernando-torres" : "eliana-suarez"}
            publishDate={post.publishDate}
            dateModified={post.dateModified || "2026-10-01"}
            reviewerSlug={post.category === "Salud" || post.category === "Trámites" ? "eliana-suarez" : "fernando-torres"}
          />

          <div className="prose prose-slate max-w-none prose-sm sm:prose-base leading-relaxed text-justify">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] mt-6 mb-4 border-b border-slate-150 pb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-[#0a1f42] mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="text-sm text-slate-700 leading-relaxed mb-4 text-justify" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-sm text-slate-700 list-none" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-sm text-slate-700 list-none" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#c9a84c] bg-amber-50/50 p-4 rounded-r-xl my-4 text-sm font-medium italic text-slate-800" {...props} />,
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-[#0a1f42]/5 text-[#0a1f42] uppercase text-[10px] tracking-wider font-extrabold border-b border-slate-200" {...props} />,
                tbody: ({node, ...props}) => <tbody className="divide-y divide-slate-100" {...props} />,
                tr: ({node, ...props}) => <tr className="hover:bg-slate-50/50 transition-colors" {...props} />,
                th: ({node, ...props}) => <th className="p-3 font-bold" {...props} />,
                td: ({node, ...props}) => <td className="p-3 text-slate-650 font-sans" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <AdSlot slot="blog-mid-article" format="in-article" />

          {/* Sources validation block (SourcesBlock) */}
          {post.sources && post.sources.length > 0 && (
            <SourcesBlock sources={post.sources} />
          )}

          {/* Caja CTA Inteligente: Conecta el Blog con el Chatbot */}
          <div className="bg-gradient-to-br from-amber-50/70 to-slate-50/50 border border-amber-250 rounded-2xl p-5 mt-8 space-y-4 shadow-sm">
            <div className="flex gap-3">
              <span className="text-2xl mt-0.5">💬</span>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-[#0a1f42]">
                  ¿Tienes dudas específicas sobre este trámite?
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Nuestro Asistente de IA cuenta con la normativa legal completa y puede guiarte de forma personalizada con tus requisitos individuales.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onConsultChatbot(
                  post.title,
                  `Hola. Acabo de leer el artículo de blog "${post.title}" y necesito ayuda personalizada. ¿Podrías indicarme de forma detallada cuáles son los requisitos vigentes, los pasos y cómo evitar errores en este trámite?`
                );
              }}
              type="button"
              className="w-full py-2.5 px-4 bg-[#0a1f42] text-white hover:bg-[#112d59] font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 border border-slate-800 hover:-translate-y-0.5 uppercase tracking-wider cursor-pointer"
            >
              Consultar al Asistente Virtual sobre este Post
            </button>
          </div>
        </div>

        {/* Columna lateral / Sidebar del Post */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <h4 className="text-xs font-black text-[#0a1f42] uppercase tracking-wider border-b pb-2">
              Sobre el Autor
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0a1f42] to-[#122e5a] flex items-center justify-center font-bold text-xs text-[#c9a84c] border border-slate-300 shadow">
                IAS
              </div>
              <div>
                <span className="block text-xs font-bold text-[#0a1f42]">{post.author}</span>
                <span className="block text-[10px] text-slate-400 font-medium font-mono">Asesor de Seguridad Social</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Guías elaboradas con base en la Ley de Seguridad Social, reglamentos del IESS, boletines oficiales y resoluciones actuales de Ecuador.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-black text-[#0a1f42] uppercase tracking-wider border-b pb-2">
              Temas Relacionados
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {post.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[9.5px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-black text-[#0a1f42] uppercase tracking-wider border-b pb-2">
              Lecturas Recomendadas
            </h4>
            <div className="space-y-2.5">
              {allPosts.filter(p => p.id !== post.id).slice(0, 3).map(p => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group cursor-pointer block border-b border-slate-100 last:border-0 pb-2.5 last:pb-0 hover:no-underline text-left"
                >
                  <h5 className="text-[11px] font-bold text-slate-750 group-hover:text-[#c9a84c] transition-colors leading-tight line-clamp-2">
                    {p.title}
                  </h5>
                  <span className="text-[9px] text-slate-450 mt-1 block font-mono">
                    {p.category} • {p.readTime} min
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <AdSlot slot="blog-sidebar" format="sidebar" />
        </div>
      </div>
    </article>
  );
}
