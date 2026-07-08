import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { 
  ArrowRight, 
  HelpCircle, 
  Wrench, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  ArrowLeft, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookOpen
} from "lucide-react";
import { SeoCategory, SeoSubcategory } from "../data/seoCategories";
import { BLOG_POSTS } from "../data/blogPosts";

interface CategoryDetailProps {
  category: SeoCategory;
  activeSubcategorySlug: string | null;
  onNavigateToCategory: (categorySlug: string, subcategorySlug?: string | null) => void;
  onNavigateToBlogPost: (slug: string) => void;
  onConsultChatbot: (query: string) => void;
  onBackToHome: () => void;
  allCategories: SeoCategory[];
}

export default function CategoryDetail({
  category,
  activeSubcategorySlug,
  onNavigateToCategory,
  onNavigateToBlogPost,
  onConsultChatbot,
  onBackToHome,
  allCategories
}: CategoryDetailProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpenFaqIndex(null);
  }, [category.id, activeSubcategorySlug]);

  const activeSubcategory = category.subcategories.find(
    (sub) => sub.slug === activeSubcategorySlug
  );

  // Filter blog posts that are related to this category
  const relatedPosts = BLOG_POSTS.filter((post) => 
    category.relatedPostsSlugs.includes(post.slug) || 
    post.category.toLowerCase().includes(category.title.toLowerCase()) ||
    post.keywords.some(keyword => category.title.toLowerCase().includes(keyword.toLowerCase()))
  );

  // Other categories for internal linking
  const sisterCategories = allCategories
    .filter((cat) => cat.id !== category.id)
    .slice(0, 4);

  // Structured Data Schema Generation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": typeof window !== "undefined" ? window.location.origin : "https://iessasistente.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.title,
        "item": typeof window !== "undefined" ? `${window.location.origin}/${category.slug}` : `https://iessasistente.com/${category.slug}`
      },
      ...(activeSubcategory ? [{
        "@type": "ListItem",
        "position": 3,
        "name": activeSubcategory.title,
        "item": typeof window !== "undefined" 
          ? `${window.location.origin}/${category.slug}/${activeSubcategory.slug}` 
          : `https://iessasistente.com/${category.slug}/${activeSubcategory.slug}`
      }] : [])
    ]
  };

  const faqSchema = category.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": category.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": category.metaTitle,
    "description": category.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "IESSAsistente Ecuador"
    },
    "publisher": {
      "@type": "Organization",
      "name": "IESSAsistente Ecuador",
      "logo": {
        "@type": "ImageObject",
        "url": typeof window !== "undefined" ? `${window.location.origin}/logo.png` : ""
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" 
        ? `${window.location.origin}/${category.slug}${activeSubcategory ? `/${activeSubcategory.slug}` : ""}`
        : `https://iessasistente.com/${category.slug}`
    }
  };

  return (
    <div id={`category-pillar-${category.id}`} className="flex flex-col gap-8 animate-fadeIn select-text">
      {/* Inject JSON-LD Schema on render */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      {/* HEADER SECTION WITH HERO */}
      <div className="bg-linear-to-br from-[#0a1f42] via-[#0f2d5c] to-[#04122b] rounded-2xl p-6 sm:p-8 text-white border-b-4 border-[#c9a84c] shadow-md relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform translate-x-20 -translate-y-10">
          <span className="text-[250px] font-black leading-none">IESS</span>
        </div>

        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#c9a84c] mb-6 font-extrabold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al Inicio
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-xs bg-[#c9a84c] text-[#0a1f42] font-black px-2.5 py-1 rounded uppercase tracking-wider">
                Página Pilar SEO
              </span>
              {activeSubcategory && (
                <span className="text-xs bg-white/10 text-white font-bold px-2.5 py-1 rounded">
                  {activeSubcategory.title}
                </span>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {activeSubcategory ? `${category.title} - ${activeSubcategory.title}` : category.title}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed max-w-2xl font-medium">
              {activeSubcategory ? activeSubcategory.description : category.description}
            </p>
          </div>

          <button
            onClick={() => {
              const q = `Hola. Deseo recibir asesoría jurídica completa y personalizada sobre el tema de "${activeSubcategory ? `${category.title} (${activeSubcategory.title})` : category.title}". ¿Podrías indicarme los pasos detallados de ley, qué requisitos necesito y cómo tramitarlo?`;
              onConsultChatbot(q);
            }}
            className="shrink-0 bg-[#c9a84c] hover:bg-[#b5953d] text-[#0a1f42] font-black px-5 py-3 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center justify-center gap-2 uppercase tracking-wide border border-[#e5c15e] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            Asistente IESS IA 🤖
          </button>
        </div>
      </div>

      {/* TWO COLUMNS LAYOUT FOR CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COMPREHENSIVE PILLAR CONTENT - 8 COLUMNS */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* SUBCATEGORIES SLIDER/GRID */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h2 className="text-base sm:text-lg font-extrabold text-[#0a1f42] mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="text-lg">📁</span> Subcategorías de {category.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Category Pillar main option */}
              <div
                onClick={() => onNavigateToCategory(category.slug, null)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  !activeSubcategorySlug
                    ? "bg-slate-50 border-[#c9a84c] shadow-xs"
                    : "bg-white border-slate-200 hover:border-[#c9a84c] hover:bg-slate-50/40"
                }`}
              >
                <div>
                  <h3 className="text-xs font-extrabold text-[#0a1f42] flex items-center gap-1.5">
                    <span className="text-sm">📍</span> Guía General Pilar
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-normal">
                    Accede a la información general unificada, bases de ley completas y requisitos globales de este ramo.
                  </p>
                </div>
                <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-3">
                  Ver guía pilar <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {category.subcategories.map((sub) => {
                const isSelected = activeSubcategorySlug === sub.slug;
                return (
                  <div
                    key={sub.id}
                    onClick={() => onNavigateToCategory(category.slug, sub.slug)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-50 border-[#c9a84c] shadow-xs"
                        : "bg-white border-slate-200 hover:border-[#c9a84c] hover:bg-slate-50/40"
                    }`}
                  >
                    <div>
                      <h3 className="text-xs font-extrabold text-[#0a1f42] flex items-center gap-1.5">
                        <span className="text-sm">🔹</span> {sub.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-normal line-clamp-2">
                        {sub.description}
                      </p>
                    </div>
                    <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-3">
                      Explorar subcategoría <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAIN ARTICLE MARKDOWN */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
              <ReactMarkdown
                components={{
                  h2: ({node, ...props}) => <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] mt-6 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-sm sm:text-base font-extrabold text-[#0a1f42] mt-5 mb-2.5" {...props} />,
                  p: ({node, ...props}) => <p className="text-xs sm:text-sm text-slate-650 leading-relaxed mb-4" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-xs sm:text-sm" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-xs sm:text-sm" {...props} />,
                  li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-extrabold text-[#0a1f42]" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#c9a84c] bg-amber-50/30 pl-4 py-2 pr-2 rounded-r-lg my-4 italic text-slate-600 text-xs" {...props} />,
                }}
              >
                {category.pilarText}
              </ReactMarkdown>
            </article>

            {/* Localized keywords footer for search engines */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 font-semibold font-mono">
              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
              <span>Etiquetas de indexación SEO: {category.title.toLowerCase()}, {category.slug}, trámites iess, ecuador seguro social, iess 2026</span>
            </div>
          </div>

          {/* INTERACTIVE FAQS */}
          {category.faqs.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h2 className="text-base sm:text-lg font-extrabold text-[#0a1f42] mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <HelpCircle className="w-5 h-5 text-[#c9a84c]" /> Preguntas Frecuentes sobre {category.title}
              </h2>

              <div className="space-y-3">
                {category.faqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div 
                      key={i} 
                      className="bg-slate-50/60 border border-slate-100 rounded-xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3 font-extrabold text-xs sm:text-sm text-[#0a1f42] hover:bg-slate-100/50 cursor-pointer"
                      >
                        <span className="flex items-start gap-2">
                          <span className="text-[#c9a84c]">❓</span>
                          {faq.q}
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-0 border-t border-slate-100 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                          <p>{faq.a}</p>
                          <div className="mt-3.5 pt-3 border-t border-slate-100 flex justify-end">
                            <button
                              onClick={() => {
                                const q = `Hola. Sobre la pregunta "${faq.q}", deseo recibir una respuesta mucho más amplia, con la base de ley ecuatoriana respectiva y los pasos para tramitarlo en el portal del IESS.`;
                                onConsultChatbot(q);
                              }}
                              className="text-[10px] bg-[#0a1f42] hover:bg-[#122e5b] text-white font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer uppercase tracking-wider"
                            >
                              <Sparkles className="w-3 h-3 text-[#c9a84c]" /> Consultar al Chatbot
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* COMMON ERRORS WARNING CARD */}
          {category.commonErrors.length > 0 && (
            <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-5 shadow-xs">
              <h2 className="text-base sm:text-lg font-extrabold text-amber-800 mb-3.5 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#c9a84c]" /> Errores Frecuentes a Evitar en {category.title}
              </h2>
              <ul className="space-y-3">
                {category.commonErrors.map((err, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-amber-900 flex items-start gap-2.5 leading-relaxed font-medium">
                    <span className="text-amber-500 font-extrabold shrink-0 text-base mt-0.5">⚠️</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: TOOLS, NEWS & RELATED LINKS - 4 COLUMNS */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* CATEGORY TOOLS */}
          {category.tools.length > 0 && (
            <div className="bg-linear-to-br from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#0a1f42] mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Wrench className="w-4 h-4 text-[#c9a84c]" /> Herramientas de Ley
              </h2>
              <div className="flex flex-col gap-3">
                {category.tools.map((tool, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-[#c9a84c] transition-all">
                    <h3 className="text-xs font-bold text-[#0a1f42] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#c9a84c]" /> {tool.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-normal">
                      {tool.description}
                    </p>
                    <button
                      onClick={() => onConsultChatbot(tool.query)}
                      className="w-full mt-3 py-1.5 bg-[#0a1f42] text-white hover:bg-[#143263] font-bold text-[10px] rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider"
                    >
                      <Sparkles className="w-3 h-3 text-[#c9a84c]" /> {tool.actionLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DYNAMIC LOCALIZED NEWS PANEL */}
          {category.news.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#0a1f42] mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Calendar className="w-4 h-4 text-[#c9a84c]" /> Noticias y Novedades
              </h2>
              <div className="space-y-4">
                {category.news.map((item, index) => (
                  <div key={index} className="group border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold mb-1.5 font-mono">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </div>
                    <h3 className="text-xs font-bold text-[#0a1f42] group-hover:text-[#c9a84c] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RELATED BLOG ARTICLES */}
          {relatedPosts.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#0a1f42] mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <BookOpen className="w-4 h-4 text-[#c9a84c]" /> Artículos Relacionados
              </h2>
              <div className="flex flex-col gap-3">
                {relatedPosts.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => onNavigateToBlogPost(post.slug)}
                    className="p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group flex gap-2.5 items-start"
                  >
                    <div className="w-10 h-10 rounded bg-slate-100 overflow-hidden shrink-0">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold text-[#0a1f42] group-hover:text-[#c9a84c] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <span className="text-[9px] text-slate-400 font-bold block mt-1 font-mono">{post.publishDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SISTER CATEGORIES INTERNAL LINKING */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0a1f42] mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Bookmark className="w-4 h-4 text-[#c9a84c]" /> Otras Guías Relacionadas
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {sisterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onNavigateToCategory(cat.slug, null)}
                  className="text-[10px] font-extrabold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-[#0a1f42] px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>📂</span> {cat.title}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
