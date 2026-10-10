import { PROCEDURES_DATA, Procedure } from "../data/procedures";
import { BLOG_POSTS, BlogPost } from "../data/blogPosts";
import { SEO_CATEGORIES, SeoCategory } from "../data/seoCategories";
import { CITIES_DATA } from "../data/cities";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// Ecuador Location definitions matching server.ts
export const ECUADOR_LOCATIONS: Record<string, { lat: number; lng: number; region: string; fullName: string }> = {
  'quito': { lat: -0.2298, lng: -78.5249, region: 'Pichincha', fullName: 'Quito' },
  'guayaquil': { lat: -2.1962, lng: -79.8758, region: 'Guayas', fullName: 'Guayaquil' },
  'cuenca': { lat: -2.9021, lng: -79.0049, region: 'Azuay', fullName: 'Cuenca' },
  'ambato': { lat: -1.2241, lng: -78.6294, region: 'Tungurahua', fullName: 'Ambato' },
  'machala': { lat: -3.2581, lng: -79.9439, region: 'El Oro', fullName: 'Machala' }
};

// Call Center call option matching App.tsx
export const CONTACT_PHONE = "1800-4377";

// Shared function to find procedure by slug (Task 5)
export function findProcedureBySlug(slug: string): Procedure | undefined {
  return PROCEDURES_DATA.find(p => 
    p.id.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase() || 
    p.id.toLowerCase() === slug.toLowerCase()
  );
}

// Helper to escape HTML tags in text nodes
function escapeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Header & Navigation Builder
function renderSeoHeader(): string {
  return `
    <header class="bg-[#0a1f42] text-white p-4 border-b-4 border-[#c9a84c]">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🛡️</span>
          <a href="/" class="text-lg font-bold tracking-tight text-white no-underline hover:text-[#c9a84c]">
            IESS Asistente - Guía de Trámites y Requisitos
          </a>
        </div>
        <nav class="flex flex-wrap gap-4 text-sm font-semibold">
          <a href="/" class="text-white hover:text-[#c9a84c] no-underline">Trámites</a>
          <a href="/oficios" class="text-white hover:text-[#c9a84c] no-underline">Herramientas/Oficios</a>
          <a href="/blog" class="text-white hover:text-[#c9a84c] no-underline">Blog</a>
          <a href="/faq" class="text-white hover:text-[#c9a84c] no-underline">FAQ</a>
        </nav>
      </div>
    </header>
  `;
}

// Footer Builder
function renderSeoFooter(): string {
  return `
    <footer class="bg-[#030f24] text-slate-400 p-8 border-t border-slate-800 text-xs sm:text-sm mt-10">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-6 border-b border-slate-800">
        <div class="space-y-2">
          <h4 class="text-white font-bold uppercase tracking-wider">Guía independiente</h4>
          <p class="leading-relaxed">
            Plataforma interactiva gratuita de orientación cívica ecuatoriana. Diseñada para educar a los afiliados y jubilados garantizando el fácil acceso a la información verificada con fuentes oficiales.
          </p>
        </div>
        <div class="space-y-2">
          <h4 class="text-white font-bold uppercase tracking-wider">Enlaces Oficiales</h4>
          <ul class="space-y-1.5 list-none pl-0">
            <li><a href="https://www.iess.gob.ec" target="_blank" rel="noreferrer" class="text-slate-400 hover:text-white no-underline">iess.gob.ec - Trámites Virtuales</a></li>
            <li><a href="https://www.biess.fin.ec" target="_blank" rel="noreferrer" class="text-slate-400 hover:text-white no-underline">biess.fin.ec - Préstamos BIESS</a></li>
            <li><a href="https://www.gob.ec/iess" target="_blank" rel="noreferrer" class="text-slate-400 hover:text-white no-underline">gob.ec/iess - Catálogo de Servicios</a></li>
          </ul>
        </div>
        <div class="space-y-2">
          <h4 class="text-white font-bold uppercase tracking-wider">Confianza y Transparencia</h4>
          <ul class="space-y-1.5 list-none pl-0 text-xs">
            <li><a href="/sobre-nosotros" class="text-slate-400 hover:text-white no-underline font-medium">Sobre nosotros</a></li>
            <li><a href="/metodologia-editorial" class="text-slate-400 hover:text-white no-underline font-medium">Metodología editorial</a></li>
            <li><a href="/contacto" class="text-slate-400 hover:text-white no-underline font-medium">Contacto</a></li>
            <li><a href="#" onclick="if(typeof window !== 'undefined'){window.dispatchEvent(new CustomEvent('open-cookie-settings'));}return false;" class="text-slate-400 hover:text-[#c9a84c] no-underline font-extrabold">Configurar cookies</a></li>
          </ul>
        </div>
        <div class="space-y-2">
          <h4 class="text-white font-bold uppercase tracking-wider">Políticas Legales</h4>
          <ul class="space-y-1.5 list-none pl-0 text-xs">
            <li><a href="/politica-de-privacidad" class="text-slate-400 hover:text-white no-underline">Política de privacidad (LOPDP)</a></li>
            <li><a href="/terminos-de-uso" class="text-slate-400 hover:text-white no-underline">Términos de uso</a></li>
            <li><a href="/aviso-legal" class="text-slate-400 hover:text-white no-underline">Aviso legal</a></li>
            <li><a href="/politica-de-cookies" class="text-slate-400 hover:text-white no-underline">Política de cookies</a></li>
          </ul>
        </div>
      </div>
      <div class="pt-6 space-y-4 text-center text-xs">
        <p class="max-w-4xl mx-auto text-slate-500 font-light text-justify leading-relaxed bg-slate-950/60 p-4 border border-slate-900 rounded-xl">
          <strong>Aviso de exención de responsabilidad:</strong> IESS Asistente es un sitio informativo independiente. No pertenece ni está afiliado al Instituto Ecuatoriano de Seguridad Social (IESS) ni al BIESS. Los trámites oficiales se realizan únicamente en iess.gob.ec y biess.fin.ec. La información expuesta es meramente orientativa y de educación ciudadana, no constituye asesoría legal, tributaria ni de carácter vinculante oficial.
        </p>
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 font-medium">
          <p>&copy; ${new Date().getFullYear()} IESS Asistente - Guía independiente de consulta. Todos los derechos reservados.</p>
          <p>Hecho con transparencia para el Ecuador 🇪🇨</p>
        </div>
      </div>
    </footer>
  `;
}

// 1. HOME HTML BUILDER
export function generateHomeSeoHtml(): string {
  const latestPosts = BLOG_POSTS.slice(0, 6);
  
  const proceduresListHtml = PROCEDURES_DATA.map(proc => {
    const slug = proc.id.toLowerCase().replace(/\s+/g, '-');
    return `
      <li class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-[#c9a84c] transition-colors">
        <span class="text-2xl block mb-2">📋</span>
        <h3 class="text-xs sm:text-sm font-bold text-[#0a1f42] mb-1">
          <a href="/procedimiento/${slug}" class="text-[#0a1f42] hover:text-[#c9a84c] no-underline">${escapeText(proc.title)}</a>
        </h3>
        <p class="text-[11px] text-slate-500 leading-normal line-clamp-2">${escapeText(proc.whoCanDo)}</p>
      </li>
    `;
  }).join('');

  const categoriesListHtml = SEO_CATEGORIES.filter(cat => cat.slug !== "blog" && cat.slug !== "faq").map(cat => {
    return `
      <li class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-[#c9a84c] transition-colors">
        <span class="text-2xl block mb-2">📂</span>
        <h3 class="text-xs sm:text-sm font-bold text-[#0a1f42] mb-1">
          <a href="/${cat.slug}" class="text-[#0a1f42] hover:text-[#c9a84c] no-underline">${escapeText(cat.title)}</a>
        </h3>
        <p class="text-[11px] text-slate-500 leading-normal line-clamp-2">${escapeText(cat.description)}</p>
      </li>
    `;
  }).join('');

  const latestPostsHtml = latestPosts.map(post => {
    return `
      <li class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:border-[#c9a84c] transition-colors">
        <div>
          <span class="text-[9px] font-mono text-slate-400 block mb-1">📅 ${post.publishDate}</span>
          <h3 class="text-xs sm:text-sm font-bold text-[#0a1f42] mb-1.5 leading-snug">
            <a href="/blog/${post.slug}" class="text-[#0a1f42] hover:text-[#c9a84c] no-underline">${escapeText(post.title)}</a>
          </h3>
          <p class="text-[11px] text-slate-500 leading-normal line-clamp-2 mb-3">${escapeText(post.metaDescription)}</p>
        </div>
        <a href="/blog/${post.slug}" class="text-xs font-bold text-[#c9a84c] no-underline hover:underline">Leer Guía completa &rarr;</a>
      </li>
    `;
  }).join('');

  const citiesHtml = Object.entries(ECUADOR_LOCATIONS).map(([key, loc]) => {
    return `<a href="/iess/${key}" class="px-3 py-1.5 bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 font-bold rounded-lg border border-slate-200 text-xs no-underline">${loc.fullName}</a>`;
  }).join(' ');

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      
      <main class="max-w-5xl w-full mx-auto px-4 py-8 space-y-10 flex-grow">
        
        <!-- Hero section -->
        <section class="text-center max-w-3xl mx-auto space-y-4">
          <h1 class="text-xl sm:text-3xl font-black text-[#0a1f42] leading-tight">
            Guía Profesional del IESS Ecuador: Requisitos, Trámites y Oficios de Ley
          </h1>
          <p class="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Bienvenido al portal independiente de asistencia para el Instituto Ecuatoriano de Seguridad Social. Aquí encontrarás explicaciones claras y detalladas sobre jubilación por vejez, préstamos quirografarios e hipotecarios del BIESS, fondos de reserva, cesantías y seguro de desempleo. Accede a nuestros simuladores y generadores de oficios de ley gratuitos para realizar tus gestiones de forma autónoma y sin tramitadores.
          </p>
        </section>

        <!-- Cities selector -->
        <section class="bg-amber-50/30 border border-amber-100 rounded-2xl p-4 text-center space-y-3">
          <h2 class="text-sm sm:text-base font-extrabold text-[#0a1f42]">📍 Puntos de Atención Local por Ciudad</h2>
          <div class="flex flex-wrap justify-center gap-2">
            ${citiesHtml}
          </div>
        </section>

        <!-- Procedures section -->
        <section class="space-y-4">
          <h2 class="text-lg font-extrabold text-[#0a1f42] border-b border-slate-200 pb-2 flex items-center gap-2">
            <span>🔥</span> Trámites y Guías Paso a Paso
          </h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none pl-0">
            ${proceduresListHtml}
          </ul>
        </section>

        <!-- Categories directory -->
        <section class="space-y-4">
          <h2 class="text-lg font-extrabold text-[#0a1f42] border-b border-slate-200 pb-2 flex items-center gap-2">
            <span>📂</span> Biblioteca Temática de la Seguridad Social
          </h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none pl-0">
            ${categoriesListHtml}
          </ul>
        </section>

        <!-- Latest Articles -->
        <section class="space-y-4">
          <h2 class="text-lg font-extrabold text-[#0a1f42] border-b border-slate-200 pb-2 flex items-center gap-2">
            <span>✍️</span> Últimas Guías Publicadas en el Blog
          </h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none pl-0">
            ${latestPostsHtml}
          </ul>
        </section>

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

// 2. PROCEDURE SEO HTML BUILDER
export function generateProcedureSeoHtml(proc: Procedure): string {
  const stepsList = proc.steps.map(step => `<li class="leading-relaxed mb-2">${escapeText(step)}</li>`).join('');
  const reqsList = proc.requirements.map(req => `<li class="leading-relaxed mb-1.5">${escapeText(req)}</li>`).join('');
  const errorsList = proc.commonErrors.map(err => `<li class="leading-relaxed mb-1.5">${escapeText(err)}</li>`).join('');
  
  // Clean answers for IA Direct answers (40-60 words)
  const directAnswer = `El trámite de ${proc.title} lo realiza el ${proc.whoCanDo}. El requisito principal consiste en registrar ${proc.requirements[0].toLowerCase().replace(/\.$/, '')}. Se puede tramitar de forma virtual en ${proc.whereTo.label} asegurando el correcto cumplimiento de las normativas de seguridad social de Ecuador.`;

  const relatedPostsHtml = BLOG_POSTS
    .filter(post => post.category === proc.category)
    .slice(0, 3)
    .map(post => `<li><a href="/blog/${post.slug}" class="text-[#c9a84c] font-bold no-underline hover:underline">${escapeText(post.title)}</a></li>`)
    .join('');

  const slug = proc.id.toLowerCase().replace(/\s+/g, '-');

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      
      <main class="max-w-4xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        
        <!-- Breadcrumbs -->
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt; 
          <a href="/#tramites" class="text-slate-500 no-underline hover:underline">Trámites</a> &gt; 
          <span class="text-slate-800 font-bold">${escapeText(proc.title)}</span>
        </nav>

        <article class="space-y-6">
          <h1 class="text-xl sm:text-2xl font-black text-[#0a1f42] leading-tight">
            Cómo realizar el trámite de ${escapeText(proc.title)} en el IESS
          </h1>

          <!-- Direct IA Answer paragraph (40-60 words) -->
          <p class="text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 border-l-4 border-[#c9a84c] p-4 rounded-r-lg leading-relaxed">
            ${escapeText(directAnswer)}
          </p>

          <!-- Who can do it -->
          <section class="space-y-2">
            <h2 class="text-sm sm:text-base font-bold text-[#0a1f42]">¿Quién puede realizar este trámite?</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${escapeText(proc.whoCanDo)}</p>
          </section>

          <!-- Requirements -->
          <section class="space-y-2">
            <h2 class="text-sm sm:text-base font-bold text-[#0a1f42]">Requisitos indispensables de Ley</h2>
            <ul class="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5">
              ${reqsList}
            </ul>
          </section>

          <!-- Steps -->
          <section class="space-y-2">
            <h2 class="text-sm sm:text-base font-bold text-[#0a1f42]">Pasos obligatorios para tramitarlo</h2>
            <ol class="list-decimal pl-5 text-xs sm:text-sm text-slate-600 space-y-2">
              ${stepsList}
            </ol>
          </section>

          <!-- Where to do it -->
          <section class="space-y-2">
            <h2 class="text-sm sm:text-base font-bold text-[#0a1f42]">¿Dónde tramitarlo oficialmente?</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Este trámite se realiza en la siguiente plataforma: 
              <strong class="text-slate-800 font-bold">${escapeText(proc.whereTo.label)}</strong>.
              ${proc.whereTo.url ? `Puedes acceder directamente a través de <a href="${escapeText(proc.whereTo.url)}" target="_blank" rel="noreferrer" class="text-[#c9a84c] hover:underline font-bold">${escapeText(proc.whereTo.url)}</a>.` : ''}
            </p>
          </section>

          <!-- Common Errors -->
          <section class="space-y-2">
            <h2 class="text-sm sm:text-base font-bold text-[#0a1f42] text-rose-800">Errores frecuentes a evitar</h2>
            <ul class="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5 bg-red-50 p-4 rounded-xl border border-dotted border-red-200">
              ${errorsList}
            </ul>
          </section>

          <!-- Reference Law -->
          ${proc.referenceNorm ? `
            <section class="space-y-2">
              <h2 class="text-sm sm:text-base font-bold text-[#0a1f42]">Norma de referencia legal</h2>
              <p class="text-xs sm:text-sm text-slate-500 font-mono italic">${escapeText(proc.referenceNorm)}</p>
            </section>
          ` : ''}

          <!-- Needs More Help -->
          <section class="bg-amber-50/20 border border-dashed border-amber-200 rounded-xl p-4 space-y-2">
            <h3 class="text-xs font-bold text-[#0a1f42] uppercase tracking-wider">¿Necesitas asesoría legal adicional?</h3>
            <p class="text-xs text-slate-600">${escapeText(proc.needsMoreHelp)}</p>
          </section>

          <!-- Related Content -->
          ${relatedPostsHtml ? `
            <section class="pt-4 border-t border-slate-200 space-y-2">
              <h4 class="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Artículos y guías de apoyo relacionados:</h4>
              <ul class="text-xs space-y-1 pl-4">
                ${relatedPostsHtml}
              </ul>
            </section>
          ` : ''}

        </article>

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

// 3. BLOG ARCHIVE SEO HTML BUILDER
export function generateBlogArchiveSeoHtml(currentPage: number): string {
  const limit = 4;
  const totalPosts = BLOG_POSTS.length;
  const totalPages = Math.ceil(totalPosts / limit) || 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const offset = (safePage - 1) * limit;
  const pagePosts = BLOG_POSTS.slice(offset, offset + limit);

  const postsListHtml = pagePosts.map(post => {
    return `
      <article class="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#c9a84c] transition-colors space-y-3">
        <span class="text-[10px] text-slate-400 font-mono block">📅 Publicado el ${post.publishDate} • ⏱️ ${post.readTime} min de lectura</span>
        <h2 class="text-base sm:text-lg font-extrabold text-[#0a1f42] leading-snug">
          <a href="/blog/${post.slug}" class="text-[#0a1f42] hover:text-[#c9a84c] no-underline">${escapeText(post.title)}</a>
        </h2>
        <p class="text-xs sm:text-sm text-slate-650 leading-relaxed line-clamp-3">${escapeText(post.metaDescription)}</p>
        <div class="flex items-center justify-between pt-2 text-xs">
          <span class="text-slate-400 font-medium">Por: ${post.author}</span>
          <a href="/blog/${post.slug}" class="text-[#c9a84c] font-black no-underline hover:underline">Leer Guía completa &rarr;</a>
        </div>
      </article>
    `;
  }).join('');

  // Pagination links
  let paginationHtml = '';
  if (safePage > 1) {
    const prevUrl = safePage === 2 ? "/blog" : `/blog/page/${safePage - 1}`;
    paginationHtml += `<a href="${prevUrl}" class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 text-xs no-underline hover:bg-slate-50">&larr; Anterior</a>`;
  }
  for (let i = 1; i <= totalPages; i++) {
    const url = i === 1 ? "/blog" : `/blog/page/${i}`;
    const activeClass = i === safePage ? 'bg-[#0a1f42] text-white border-[#0a1f42]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
    paginationHtml += `<a href="${url}" class="w-8 h-8 flex items-center justify-center border rounded-lg font-bold text-xs no-underline ${activeClass}">${i}</a>`;
  }
  if (safePage < totalPages) {
    paginationHtml += `<a href="/blog/page/${safePage + 1}" class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 text-xs no-underline hover:bg-slate-50">Siguiente &rarr;</a>`;
  }

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      
      <main class="max-w-4xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        
        <!-- Breadcrumbs -->
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt; 
          <span class="text-slate-800 font-bold">Blog</span>
        </nav>

        <section class="space-y-3">
          <h1 class="text-xl sm:text-2xl font-black text-[#0a1f42] leading-tight">
            Blog Oficial IESS Ecuador - Guías de Seguridad Social y Trámites
          </h1>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Explora nuestra biblioteca de artículos explicados de manera sencilla y fundamentados en la Ley de Seguridad Social y las resoluciones del Consejo Directivo. Aprende sobre tus derechos de afiliado y jubilado.
          </p>
        </section>

        <!-- Articles list -->
        <section class="space-y-4">
          ${postsListHtml}
        </section>

        <!-- Pagination -->
        <nav class="flex items-center justify-center gap-2 pt-4 border-t border-slate-200" aria-label="Paginación de artículos del blog IESS">
          ${paginationHtml}
        </nav>

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

// 4. BLOG POST ARTICLE SEO HTML BUILDER
export function generateBlogPostSeoHtml(post: BlogPost): string {
  // Convert Markdown content to HTML using marked.js and convert all <h1> to <h2> to avoid duplicates
  const rawMarkdownHtml = marked.parse(post.content) as string;
  let cleanMarkdownContent = sanitizeHtml(rawMarkdownHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'h4', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'id'],
      'a': ['href', 'name', 'target', 'rel'],
      'img': ['src', 'alt', 'loading', 'decoding', 'width', 'height']
    }
  });

  cleanMarkdownContent = cleanMarkdownContent
    .replace(/<h1([^>]*)>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');

  const relatedPostsHtml = BLOG_POSTS
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)
    .map(p => `<li><a href="/blog/${p.slug}" class="text-[#c9a84c] font-bold no-underline hover:underline">${escapeText(p.title)}</a></li>`)
    .join('');

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      
      <main class="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        
        <!-- Breadcrumbs -->
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt; 
          <a href="/blog" class="text-slate-500 no-underline hover:underline">Blog</a> &gt; 
          <span class="text-slate-800 font-bold">${escapeText(post.title)}</span>
        </nav>

        <article class="prose prose-slate max-w-none space-y-6">
          <div class="space-y-2">
            <span class="bg-[#0a1f42] text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded shadow inline-block">
              ${escapeText(post.category)}
            </span>
            <h1 class="text-xl sm:text-2xl font-black text-[#0a1f42] leading-tight">
              ${escapeText(post.title)}
            </h1>
            
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-450 pt-2 border-y border-slate-100 py-2">
              <span>Por: <strong class="text-slate-700">${escapeText(post.author)}</strong></span>
              <span>📅 Publicado: <time datetime="${post.publishDate}">${post.publishDate}</time></span>
              <span>⏱️ Lectura: ${post.readTime} minutos</span>
            </div>
          </div>

          <!-- Feature Image -->
          <div class="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-100 rounded-2xl">
            <img src="${escapeText(post.image)}" alt="${escapeText(post.title)}" class="w-full h-full object-cover" />
          </div>

          <!-- Article Content (Rendered Markdown) -->
          <div class="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify space-y-4 font-serif">
            ${cleanMarkdownContent}
          </div>

          <!-- Related Posts -->
          ${relatedPostsHtml ? `
            <section class="pt-6 border-t border-slate-200 space-y-3">
              <h3 class="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Artículos de apoyo que te podrían interesar:</h3>
              <ul class="text-xs sm:text-sm space-y-1.5 pl-4 list-disc text-slate-600">
                ${relatedPostsHtml}
              </ul>
            </section>
          ` : ''}

        </article>

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

// 5. CATEGORY & SUBCATEGORY SEO HTML BUILDER
export function generateCategorySeoHtml(cat: SeoCategory, subcategorySlug: string | null = null): string {
  const isSub = subcategorySlug !== null;
  const sub = isSub ? cat.subcategories.find(s => s.slug.toLowerCase() === subcategorySlug?.toLowerCase()) : null;

  const titleText = sub ? `${cat.title} - ${sub.title}` : cat.metaTitle;
  const descText = sub ? sub.description : cat.metaDescription;

  const subcategoriesLinks = cat.subcategories.map(s => {
    const activeClass = sub?.slug === s.slug ? 'bg-[#0a1f42] text-white border-[#0a1f42]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
    return `<a href="/${cat.slug}/${s.slug}" class="px-3 py-1.5 border font-bold text-xs rounded-lg no-underline ${activeClass}">${escapeText(s.title)}</a>`;
  }).join(' ');

  const faqsHtml = cat.faqs.map(faq => {
    return `
      <details class="bg-white border border-slate-200 rounded-xl p-3 shadow-xs hover:border-[#c9a84c] transition-colors group">
        <summary class="font-bold text-xs sm:text-sm text-[#0a1f42] cursor-pointer flex justify-between items-center list-none outline-none select-none">
          <span>${escapeText(faq.q)}</span>
          <span class="text-slate-400 group-open:rotate-180 transition-transform font-mono text-xs">&darr;</span>
        </summary>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 pt-2 border-t border-slate-100">${escapeText(faq.a)}</p>
      </details>
    `;
  }).join('');

  const toolsHtml = cat.tools.map(tool => {
    return `
      <li class="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
        <h4 class="text-xs sm:text-sm font-bold text-[#0a1f42]">${escapeText(tool.title)}</h4>
        <p class="text-[11px] text-slate-500 leading-normal">${escapeText(tool.description)}</p>
        <button class="bg-[#0a1f42] text-white font-bold text-[10px] px-3 py-1.5 rounded uppercase tracking-wider pointer-events-none">${escapeText(tool.actionLabel)}</button>
      </li>
    `;
  }).join('');

  const errorsHtml = cat.commonErrors.map(err => {
    return `<li class="text-xs sm:text-sm text-slate-650 flex items-start gap-2 mb-1.5"><span class="text-red-600 shrink-0 font-bold">⚠️</span> <span>${escapeText(err)}</span></li>`;
  }).join('');

  const pilarTextHtml = marked.parse(cat.pilarText) as string;

  const relatedPostsHtml = BLOG_POSTS
    .filter(post => cat.relatedPostsSlugs.includes(post.slug))
    .map(post => `<li><a href="/blog/${post.slug}" class="text-[#c9a84c] font-bold no-underline hover:underline">${escapeText(post.title)}</a></li>`)
    .join('');

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      
      <main class="max-w-4xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        
        <!-- Breadcrumbs -->
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt; 
          <a href="/#categorias" class="text-slate-500 no-underline hover:underline">Categorías</a> &gt; 
          ${isSub ? `<a href="/${cat.slug}" class="text-slate-500 no-underline hover:underline">${escapeText(cat.title)}</a> &gt; <span class="text-slate-800 font-bold">${escapeText(sub?.title || '')}</span>` : `<span class="text-slate-800 font-bold">${escapeText(cat.title)}</span>`}
        </nav>

        <section class="space-y-3">
          <h1 class="text-xl sm:text-2xl font-black text-[#0a1f42] leading-tight">
            ${escapeText(titleText)}
          </h1>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            ${escapeText(descText)}
          </p>
        </section>

        <!-- Subcategories bar -->
        <section class="bg-amber-50/20 border border-amber-100 rounded-xl p-3 flex flex-wrap gap-1.5 items-center">
          <span class="text-xs font-bold text-slate-500 mr-1.5">Subcategorías:</span>
          <a href="/${cat.slug}" class="px-3 py-1.5 border font-bold text-xs rounded-lg no-underline ${!isSub ? 'bg-[#0a1f42] text-white border-[#0a1f42]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">Ver Todo</a>
          ${subcategoriesLinks}
        </section>

        <!-- Pilar Text parsed from Markdown -->
        <article class="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed text-justify space-y-4 border-t border-slate-100 pt-6">
          ${pilarTextHtml}
        </article>

        <!-- Tools / Action cards -->
        ${toolsHtml ? `
          <section class="space-y-3">
            <h2 class="text-sm sm:text-base font-bold text-[#0a1f42]">Herramientas y Simulaciones Disponibles</h2>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 list-none">
              ${toolsHtml}
            </ul>
          </section>
        ` : ''}

        <!-- FAQs Section -->
        <section class="space-y-3">
          <h2 class="text-sm sm:text-base font-bold text-[#0a1f42]">Preguntas Frecuentes Resueltas de ${escapeText(cat.title)}</h2>
          <div class="space-y-2">
            ${faqsHtml}
          </div>
        </section>

        <!-- Common Errors -->
        <section class="space-y-3">
          <h2 class="text-sm sm:text-base font-bold text-rose-800">Errores patronales y de afiliados a evitar</h2>
          <ul class="list-none pl-0 bg-rose-50 p-4 rounded-xl border border-dotted border-rose-200 space-y-1">
            ${errorsHtml}
          </ul>
        </section>

        <!-- Related Blog posts -->
        ${relatedPostsHtml ? `
          <section class="pt-6 border-t border-slate-200 space-y-2">
            <h3 class="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Artículos del blog recomendados:</h3>
            <ul class="text-xs sm:text-sm space-y-1 pl-4 list-disc text-slate-650">
              ${relatedPostsHtml}
            </ul>
          </section>
        ` : ''}

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

// 6. LOCAL CITY & FAQ PAGE SEO HTML BUILDERS
export function generateCitySeoHtml(citySlug: string): string {
  const cityKey = citySlug.toLowerCase();
  const cityData = CITIES_DATA[cityKey];
  if (!cityData) return "";
  
  // Convert unique content (Markdown) to HTML
  let parsedContent = marked.parse(cityData.uniqueContent) as string;
  // Convert all <h1> to <h2> to avoid duplicates
  parsedContent = parsedContent
    .replace(/<h1([^>]*)>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');

  // Render dependencies list
  let dependenciesHtml = "";
  if (cityData.dependencies && cityData.dependencies.length > 0) {
    dependenciesHtml = `
      <section class="space-y-4">
        <h2 class="text-lg font-bold text-[#0a1f42]">🏢 Dependencias y Oficinas Reales del IESS en ${escapeText(cityData.name)}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${cityData.dependencies.map(dep => `
            <div class="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
              <span class="bg-[#0a1f42] text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded shadow inline-block">
                ${dep.type === "CAU" ? "Centro de Atención Universal (CAU)" : dep.type === "Hospital" ? "Hospital / Unidad Médica" : "Agencia BIESS"}
              </span>
              <h3 class="text-sm sm:text-base font-extrabold text-[#0a1f42]">${escapeText(dep.name)}</h3>
              <div class="text-xs text-slate-650 space-y-1.5 pt-1.5 border-t border-slate-100">
                <p>📍 <strong>Dirección:</strong> ${dep.address ? escapeText(dep.address) : '<span class="text-slate-400 italic">No verificado</span>'}</p>
                <p>📞 <strong>Teléfono:</strong> ${dep.phone ? escapeText(dep.phone) : '<span class="text-slate-400 italic">No verificado</span>'}</p>
                <p>⏱️ <strong>Horario:</strong> ${dep.hours ? escapeText(dep.hours) : '<span class="text-slate-400 italic">No verificado</span>'}</p>
                <p>📅 <strong>Última Auditoría:</strong> ${dep.verifiedAt ? `Verificado el ${dep.verifiedAt} mediante ${escapeText(dep.source || '')}` : '<span class="text-red-500 font-bold">Sin verificar</span>'}</p>
              </div>
              ${dep.mapsUrl ? `
                <div class="pt-2">
                  <a href="${escapeText(dep.mapsUrl)}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 bg-amber-50 hover:bg-[#c9a84c]/20 text-[#0a1f42] text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 no-underline transition-colors">
                    🗺️ Ver en Google Maps &rarr;
                  </a>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  } else {
    dependenciesHtml = `
      <div class="bg-red-50 border border-red-200 text-red-900 p-4 rounded-xl text-xs sm:text-sm leading-relaxed space-y-2">
        <p class="font-extrabold text-left">⚠️ DIRECCIÓN BAJO AUDITORÍA EDITORIAL</p>
        <p class="text-justify">Actualmente, las dependencias físicas del IESS en <strong>${escapeText(cityData.name)}</strong> se encuentran bajo un proceso de revisión y auditoría para evitar el marcado engañoso o direcciones ficticias en buscadores. Visite los canales oficiales o las ventanillas del IESS provincial para soporte directo.</p>
      </div>
    `;
  }

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      
      <main class="max-w-4xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        
        <!-- Breadcrumbs -->
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt; 
          <a href="/iess" class="text-slate-500 no-underline hover:underline">Ciudades</a> &gt; 
          <span class="text-slate-800 font-bold">IESS ${escapeText(cityData.name)}</span>
        </nav>

        <article class="space-y-6">
          <div class="space-y-2 text-left">
            <span class="bg-[#0a1f42] text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded shadow inline-block">
              Guía Local Independiente (Provincia de ${escapeText(cityData.province)})
            </span>
            <h1 class="text-xl sm:text-3xl font-black text-[#0a1f42] leading-tight">
              IESS ${escapeText(cityData.name)}: Horarios, Oficinas de Atención y Trámites
            </h1>
          </div>

          <!-- Parsed unique long content exceeding 600 words -->
          <div class="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify space-y-4 pt-4 border-t border-slate-100">
            ${parsedContent}
          </div>

          <!-- Verified dependencies list -->
          <div class="pt-6 border-t border-slate-100">
            ${dependenciesHtml}
          </div>

        </article>

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generateCitiesIndexSeoHtml(): string {
  const citiesList = Object.values(CITIES_DATA);
  const indexedCities = citiesList.filter(city => {
    const wordCount = city.uniqueContent.split(/\s+/).filter(Boolean).length;
    const verifiedCount = city.dependencies.filter(dep => dep.verifiedAt !== null && dep.address !== null).length;
    return wordCount >= 600 && verifiedCount >= 2;
  });
  const unindexedCities = citiesList.filter(city => {
    const wordCount = city.uniqueContent.split(/\s+/).filter(Boolean).length;
    const verifiedCount = city.dependencies.filter(dep => dep.verifiedAt !== null && dep.address !== null).length;
    return !(wordCount >= 600 && verifiedCount >= 2);
  });

  const indexedHtml = indexedCities.map(city => `
    <li class="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#c9a84c] transition-colors flex flex-col justify-between space-y-3">
      <div class="text-left">
        <span class="text-2xl block mb-1">📍</span>
        <h3 class="text-base font-extrabold text-[#0a1f42]">
          <a href="/iess/${city.slug}" class="text-[#0a1f42] hover:text-[#c9a84c] no-underline">IESS ${escapeText(city.name)}</a>
        </h3>
        <p class="text-xs text-slate-500 font-medium">Provincia de ${escapeText(city.province)}</p>
        <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2">Consulta la dirección oficial de los Centros de Atención Universal (CAU), horarios de ventanilla, hospitales del seguro de ${escapeText(city.name)} y consejos prácticos de trámites.</p>
      </div>
      <a href="/iess/${city.slug}" class="text-xs font-bold text-[#c9a84c] no-underline hover:underline pt-2 text-left">Ver Oficinas y Trámites &rarr;</a>
    </li>
  `).join('');

  const unindexedHtml = unindexedCities.map(city => `
    <li class="bg-slate-50 border border-slate-200 rounded-xl p-4 opacity-75 text-left">
      <h4 class="text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-between">
        <span>📍 IESS ${escapeText(city.name)}</span>
        <span class="text-[9px] uppercase tracking-wide font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded shadow-2xs border border-amber-100">Bajo Auditoría</span>
      </h4>
      <p class="text-[10px] text-slate-500 leading-snug mt-1">Provincia de ${escapeText(city.province)}. Pendiente de verificación física de oficinas para prevenir marcado ficticio.</p>
    </li>
  `).join('');

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      
      <main class="max-w-5xl w-full mx-auto px-4 py-8 space-y-10 flex-grow">
        
        <!-- Breadcrumbs -->
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt; 
          <span class="text-slate-800 font-bold">Ciudades</span>
        </nav>

        <section class="text-center max-w-3xl mx-auto space-y-4">
          <h1 class="text-xl sm:text-3xl font-black text-[#0a1f42] leading-tight text-center">
            Directorio Local del IESS por Ciudades y Provincias de Ecuador
          </h1>
          <p class="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto text-justify sm:text-center">
            Consulte nuestro directorio local verificado del Instituto Ecuatoriano de Seguridad Social. Acceda a la ubicación geográfica real, horarios de ventanilla ininterrumpidos de los Centros de Atención Universal (CAU), agencias de atención del BIESS y unidades médicas provinciales para realizar sus trámites de forma presencial con total seguridad y transparencia.
          </p>
        </section>

        <!-- Cities list section -->
        <section class="space-y-4">
          <h2 class="text-lg font-extrabold text-[#0a1f42] border-b border-slate-200 pb-2 text-left">📍 Oficinas y CAUs Verificados por Ciudad</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none pl-0">
            ${indexedHtml}
          </ul>
        </section>

        <!-- Under Audit Cities section -->
        <section class="space-y-4">
          <h2 class="text-sm font-extrabold text-slate-500 uppercase tracking-wide border-b border-slate-200 pb-2 text-left">📂 Ciudades de Ecuador en Proceso de Auditoría</h2>
          <p class="text-xs text-slate-500 leading-relaxed max-w-3xl text-left">Conforme con nuestras políticas de honestidad en el SEO local, las siguientes capitales de provincia se encuentran temporalmente con indicación de exclusión de rastreo (noindex, follow) hasta que nuestro equipo confirme la exactitud física de sus dependencias:</p>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none pl-0">
            ${unindexedHtml}
          </ul>
        </section>

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generateFaqPageSeoHtml(): string {
  const allFaqsHtml = SEO_CATEGORIES.flatMap(cat => cat.faqs).slice(0, 15).map(faq => {
    return `
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-[#c9a84c] transition-colors">
        <h3 class="font-bold text-xs sm:text-sm text-[#0a1f42] mb-1.5">❓ ${escapeText(faq.q)}</h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5 mt-1">${escapeText(faq.a)}</p>
      </div>
    `;
  }).join('');

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      
      <main class="max-w-4xl w-full mx-auto px-4 py-8 space-y-6 flex-grow">
        
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt; 
          <span class="text-slate-800 font-bold">Preguntas Frecuentes (FAQ)</span>
        </nav>

        <section class="space-y-3">
          <h1 class="text-xl sm:text-2xl font-black text-[#0a1f42]">
            Preguntas Frecuentes IESS - Respuestas Rápidas sobre la Seguridad Social
          </h1>
          <p class="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
            Resuelve de forma inmediata tus dudas de trámites, requisitos indispensables de jubilación por vejez, plazos del seguro de desempleo, cobro de fondos de reserva, cesantías y cálculo pensional. Nuestro asistente reúne la normativa legal oficial del IESS de Ecuador para brindarte información clara.
          </p>
        </section>

        <!-- FAQs list -->
        <section class="space-y-4">
          ${allFaqsHtml}
        </section>

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

// ==========================================
// TRUST, LEGAL AND AUTHOR PAGES PRE-RENDERERS
// ==========================================

export function generateAboutSeoHtml(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      <main class="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt;
          <span class="text-slate-800 font-bold">Sobre Nosotros</span>
        </nav>
        <article class="space-y-6">
          <h1 class="text-2xl sm:text-3xl font-black text-[#0a1f42]">Sobre Nosotros: IESS Asistente</h1>
          <p class="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
            Bienvenido a <strong>IESS Asistente</strong>, una iniciativa cívica e independiente dedicada a simplificar la comprensión de los trámites, derechos y obligaciones en la seguridad social de Ecuador. 
          </p>
          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">Nuestra Misión</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Nuestra misión es educar al ciudadano ecuatoriano para que comprenda con exactitud los reglamentos y plazos de jubilación, préstamos BIESS, y afiliaciones voluntarias. Buscamos eliminar la dependencia de tramitadores ilegales y costosos que lucran con la desinformación de los afiliados y pensionistas, proporcionando un canal limpio y transparente de información.
            </p>
          </div>
          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">¿Por qué existimos?</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Los reglamentos del Instituto Ecuatoriano de Seguridad Social (IESS) y del BIESS suelen ser extensos, técnicos y difíciles de interpretar para el ciudadano promedio. Ofrecemos resúmenes ejecutivos, herramientas interactivas de redacción de oficios y un asistente virtual que traduce la jerga legal a términos sencillos y aplicables.
            </p>
          </div>
          <div class="space-y-3 bg-amber-50/50 border border-amber-100 rounded-xl p-4">
            <h2 class="text-sm font-black text-[#0a1f42] uppercase tracking-wide">¿Cómo verificamos la información?</h2>
            <p class="text-xs text-slate-650 leading-relaxed">
              Toda nuestra base de conocimientos es contrastada por especialistas en derecho laboral de Ecuador directamente contra las publicaciones del Registro Oficial, resoluciones de los consejos directivos, leyes orgánicas y reglamentos internos institucionales.
            </p>
          </div>
        </article>
      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generateEditorialSeoHtml(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      <main class="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt;
          <span class="text-slate-800 font-bold">Metodología Editorial</span>
        </nav>
        <article class="space-y-6">
          <h1 class="text-2xl sm:text-3xl font-black text-[#0a1f42]">Metodología Editorial y Control de Exactitud</h1>
          <p class="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
            En <strong>IESS Asistente</strong>, el rigor y la fidelidad de la información de seguridad social son nuestra mayor prioridad. El contenido que afecta directamente las pensiones, ahorros y derechos del ciudadano exige controles de calidad exhaustivos de acuerdo con las normativas de temas YMYL (Your Money or Your Life).
          </p>
          
          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">1. Fuentes Primarias de Información</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Nuestras guías y artículos solo se redactan con base en fuentes oficiales y primarias de la República del Ecuador:
            </p>
            <ul class="text-xs sm:text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li>Constitución de la República del Ecuador.</li>
              <li>Ley de Seguridad Social de Ecuador.</li>
              <li>Resoluciones y Gacetas del Consejo Directivo del IESS.</li>
              <li>Boletines oficiales y portales de transparencia gubernamentales (iess.gob.ec y biess.fin.ec).</li>
            </ul>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">2. Proceso de Revisión Humana</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              <strong>Política de uso de Inteligencia Actorial (IA):</strong> Nuestro asistente virtual en línea utiliza IA para resolver consultas ágiles e interactivas de los ciudadanos, de forma orientativa. Sin embargo, todas nuestras guías de blog, oficios descargables, requisitos y manuales escritos son redactados, revisados y validados de forma exclusiva por profesionales humanos especializados en el área jurídica y de seguridad social.
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">3. Frecuencia de Actualización</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Revisamos la base de conocimientos y el portal en un plazo máximo de 30 días posteriores a la expedición de cualquier reforma gubernamental sustancial (por ejemplo, reajustes del Salario Básico Unificado, variaciones de tasas de interés BIESS o cambios en el Seguro de Desempleo).
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">4. Política de Correcciones</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Si detectas un error tipográfico, una cifra desactualizada o una imprecisión legal, puedes reportarlo de forma inmediata en el correo <strong>contacto@iessasistente.com</strong>. Evaluaremos el reporte en un plazo máximo de 48 horas laborables y realizaremos la corrección de forma transparente en el artículo respectivo.
            </p>
          </div>
        </article>
      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generateContactSeoHtml(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      <main class="max-w-xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt;
          <span class="text-slate-800 font-bold">Contacto</span>
        </nav>
        <article class="space-y-6">
          <h1 class="text-2xl sm:text-3xl font-black text-[#0a1f42]">Canales de Contacto</h1>
          <p class="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
            ¿Tienes alguna consulta editorial, sugerencia o deseas reportar un error en nuestras guías? Ponte en contacto de manera directa con nuestro equipo técnico.
          </p>
          <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs sm:text-sm">
            <p>• <strong>Correo electrónico directo:</strong> <a href="mailto:contacto@iessasistente.com" class="text-[#c9a84c] font-bold">contacto@iessasistente.com</a></p>
            <p>• <strong>Tiempo de respuesta promedio:</strong> Menos de 48 horas laborables de lunes a viernes.</p>
            <p>• <strong>Ubicación del equipo editorial:</strong> Quito, Pichincha, Ecuador.</p>
          </div>

          <!-- Contact Form UI Preview -->
          <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 class="text-sm font-bold text-[#0a1f42] uppercase tracking-wide pb-2 border-b border-slate-100">Buzón de Mensajes Editorial</h3>
            <p class="text-[11px] text-slate-400">Utiliza el formulario interactivo en nuestro sitio web para enviar un mensaje directamente. Evaluamos cada envío de forma confidencial.</p>
          </div>
        </article>
      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generatePrivacySeoHtml(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      <main class="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt;
          <span class="text-slate-800 font-bold">Política de Privacidad</span>
        </nav>
        <article class="space-y-6">
          <h1 class="text-2xl sm:text-3xl font-black text-[#0a1f42]">Política de Privacidad (LOPDP - Ecuador)</h1>
          <p class="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
            De conformidad con la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de la República del Ecuador, publicada en el Quinto Suplemento del Registro Oficial No. 459, informamos a los usuarios sobre el tratamiento técnico, seguro y transparente de sus datos personales en nuestro portal de asistencia independiente.
          </p>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">1. Datos Personales que Recopilamos</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Este sitio recopila información de los siguientes tipos:
            </p>
            <ul class="text-xs sm:text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li><strong>Datos Estadísticos y Analíticos:</strong> Dirección IP anónima, tipo de navegador, sistema operativo y páginas visitadas a través de Google Analytics 4 (GA4).</li>
              <li><strong>Datos de Cookies:</strong> Almacenamiento de tus preferencias de consentimiento de cookies técnicas, analíticas e IA en localStorage.</li>
              <li><strong>Conversaciones del Chatbot:</strong> Registramos de forma transitoria el contenido textual de tus consultas al chatbot para procesarlas contra la API del modelo Google Gemini, garantizando el anonimato (nunca asocies tu número de cédula o claves reales en la conversación de chat).</li>
            </ul>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">2. Finalidad del Tratamiento</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Los datos se tratan con la finalidad exclusiva de:
            </p>
            <ul class="text-xs sm:text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li>Monitorear la estabilidad y el rendimiento de las guías estadísticas en Ecuador.</li>
              <li>Mostrar anuncios relevantes e independientes mediante Google AdSense para el sostenimiento económico gratuito del portal.</li>
              <li>Proporcionar respuestas automatizadas y explicaciones de trámites del IESS de forma dinámica mediante inteligencia artificial.</li>
            </ul>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">3. Base Legal para el Tratamiento</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Nuestra base legal es el <strong>consentimiento previo y explícito</strong> del titular de los datos personales (otorgado mediante el banner interactivo de consentimiento de cookies y la aceptación de los términos de uso al enviar mensajes).
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">4. Terceros y Transferencias Internacionales</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Para garantizar el correcto servicio, el portal utiliza plataformas de terceros localizadas en Estados Unidos bajo estrictos protocolos de protección de datos:
            </p>
            <ul class="text-xs sm:text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li>Google Analytics 4 (Análisis estadístico de visitas).</li>
              <li>Google AdSense (Segmentación publicitaria no intrusiva).</li>
              <li>Google Gemini API (Procesamiento transitorio de inteligencia artificial).</li>
            </ul>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">5. Derechos ARCO y cómo ejercerlos</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Como titular de datos en Ecuador, gozas de los derechos de **Acceso, Rectificación, Cancelación y Oposición**. Puedes solicitar la eliminación de tu información de cookies o logs enviando un mensaje electrónico a <strong>contacto@iessasistente.com</strong>.
            </p>
          </div>
        </article>
      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generateTermsSeoHtml(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      <main class="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt;
          <span class="text-slate-800 font-bold">Términos de Uso</span>
        </nav>
        <article class="space-y-6">
          <h1 class="text-2xl sm:text-3xl font-black text-[#0a1f42]">Términos de Uso de la Plataforma</h1>
          <p class="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
            El acceso y la utilización del portal <strong>IESS Asistente</strong> atribuyen la condición de usuario e implican la aceptación plena e incondicional de los presentes términos de uso aplicables para el territorio nacional de Ecuador.
          </p>
          
          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">1. Naturaleza Gratuita del Servicio</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Todos nuestros contenidos informativos, explicaciones normativas y los generadores interactivos de oficios y reclamos de glosas son **100% gratuitos** y de libre acceso. Prohibimos la comercialización, reventa o intermediación de los recursos redactados en esta plataforma bajo cualquier denominación.
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">2. Uso Correcto de las Herramientas</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              El usuario se compromete a no utilizar las herramientas de generación de oficios con fines ilícitos, falsificación de firmas o manipulación de información administrativa. IESS Asistente proporciona plantillas legalmente estructuradas, pero no asume responsabilidad sobre la veracidad de los datos que el usuario final decida ingresar en ellas.
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">3. Propiedad Intelectual</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Los textos de guías del blog, diagramas lógicos e interfaces han sido creados de forma exclusiva por nuestro equipo de redactores independientes. Está permitida la reproducción o citación parcial citando explícitamente a <strong>iessasistente.com</strong> como fuente, conforme con las buenas prácticas de la web.
            </p>
          </div>
        </article>
      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generateLegalSeoHtml(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      <main class="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt;
          <span class="text-slate-800 font-bold">Aviso Legal</span>
        </nav>
        <article class="space-y-6">
          <h1 class="text-2xl sm:text-3xl font-black text-[#0a1f42]">Aviso Legal y Deslinde de Responsabilidad</h1>
          
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 leading-relaxed space-y-2">
            <p class="font-extrabold uppercase">⚠️ DECLARACIÓN FUNDAMENTAL DE INDEPENDENCIA</p>
            <p>
              La totalidad de los trámites y postulaciones oficiales se ejecutan únicamente a través de los portales transaccionales gubernamentales autorizados: <strong>iess.gob.ec</strong> y <strong>biess.fin.ec</strong> de forma confidencial.
            </p>
            <p>
              <strong>IESS Asistente es un portal digital de carácter puramente informativo, educativo e independiente. No pertenecemos, no estamos vinculados, ni estamos autorizados ni patrocinados por el Instituto Ecuatoriano de Seguridad Social (IESS) ni por el Banco del IESS (BIESS).</strong> 
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">1. Ausencia de Relación de Asesoría</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Los textos, resúmenes de requisitos y las respuestas dinámicas del chatbot se proporcionan exclusivamente de manera orientativa y como material educativo. Bajo ningún concepto deben interpretarse como asesoría jurídica, legal, financiera o de carácter vinculante que comprometa las decisiones del usuario. Deberás siempre contrastar tu historial de cotizaciones directamente ante un Centro de Atención Universal del IESS.
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">2. Limitación de Responsabilidad</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Aunque realizamos todos los esfuerzos posibles por mantener las cifras, porcentajes y normativas al día de acuerdo al Registro Oficial de Ecuador, no garantizamos la absoluta ausencia de errores accidentales, cambios de enlaces o retrasos de actualización en nuestro portal. IESS Asistente no se responsabiliza de daños patrimoniales, mora de obligaciones o pérdidas de derechos derivados del uso directo de nuestras guías educativas.
            </p>
          </div>
        </article>
      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generateCookiesSeoHtml(): string {
  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      <main class="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt;
          <span class="text-slate-800 font-bold">Política de Cookies</span>
        </nav>
        <article class="space-y-6">
          <h1 class="text-2xl sm:text-3xl font-black text-[#0a1f42]">Política de Cookies</h1>
          <p class="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
            En nuestro portal de asistencia independiente utilizamos cookies propias y de terceros autorizados para optimizar el rendimiento técnico de navegación, realizar análisis agregados de tráfico y mostrar publicidad personalizada financiada por Google AdSense.
          </p>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">¿Qué es una Cookie?</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Una cookie es un pequeño archivo de texto que el portal web almacena en el navegador de tu computadora o dispositivo móvil al visitarnos. Permite retener información estadística de tu sesión y recordar tus preferencias de privacidad para tus próximas lecturas.
            </p>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">Tipos de Cookies que Utiliza este Portal</h2>
            <ul class="text-xs sm:text-sm text-slate-600 list-disc pl-5 space-y-2">
              <li><strong>Cookies Técnicas y Necesarias:</strong> Esenciales para retener tu estado de consentimiento de privacidad e ingresar datos de oficios de ley. No recopilan información personal y están siempre activas.</li>
              <li><strong>Cookies Analíticas (GA4):</strong> Registran de manera completamente anónima el rendimiento de carga del sitio, los posts de blog más leídos y el tráfico por ciudades en el Ecuador. Se activan solo tras tu autorización voluntaria.</li>
              <li><strong>Cookies Publicitarias e IA (Google AdSense y Gemini):</strong> Utilizadas para la entrega de anuncios contextuales personalizados basados en tus intereses de búsqueda y el soporte ágil de diálogos del chatbot virtual. Se activan mediante tu consentimiento expreso.</li>
            </ul>
          </div>

          <div class="space-y-3">
            <h2 class="text-lg font-bold text-[#0a1f42]">Cómo configurar o revocar tu consentimiento</h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Puedes abrir el panel de personalización en cualquier momento haciendo clic en el enlace <strong>"Configurar cookies"</strong> disponible en el pie de página de nuestro portal. Adicionalmente, tienes derecho a bloquear, borrar o inhabilitar el uso de cookies generales directamente desde las opciones de configuración de tu navegador de internet (Chrome, Safari, Firefox o Edge).
            </p>
          </div>
        </article>
      </main>
      ${renderSeoFooter()}
    </div>
  `;
}

export function generateAuthorSeoHtml(authorSlug: string): string {
  const { AUTHORS } = require("../data/authors");
  const author = AUTHORS[authorSlug] || AUTHORS["fernando-torres"];
  
  const expHtml = author.experience.map((exp: string) => `
    <li class="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
      <span class="text-[#c9a84c] text-lg font-bold flex-shrink-0 leading-none">•</span>
      <span>${escapeText(exp)}</span>
    </li>
  `).join('');

  return `
    <div class="flex flex-col min-h-screen">
      ${renderSeoHeader()}
      <main class="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 flex-grow">
        
        <nav aria-label="Migas de pan" class="text-xs text-slate-500">
          <a href="/" class="text-slate-500 no-underline hover:underline">Inicio</a> &gt; 
          <span class="text-slate-800 font-bold">Autores</span> &gt;
          <span class="text-slate-800 font-bold">${escapeText(author.name)}</span>
        </nav>

        <section class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src="${escapeText(author.imageUrl)}"
              alt="${escapeText(author.name)}"
              class="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#c9a84c] shadow-sm object-cover"
            />
            <div class="space-y-2 text-center sm:text-left">
              <h1 class="text-xl sm:text-2xl font-black text-[#0a1f42]">${escapeText(author.name)}</h1>
              <p class="text-[#c9a84c] text-xs sm:text-sm font-extrabold uppercase tracking-wide">${escapeText(author.title)}</p>
              <p class="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify pt-1">${escapeText(author.bio)}</p>
            </div>
          </div>

          <div class="border-t border-slate-100 pt-5 space-y-3">
            <h2 class="text-sm sm:text-base font-extrabold text-[#0a1f42] uppercase tracking-wider">Experiencia Profesional Verificable</h2>
            <ul class="space-y-2.5 list-none pl-0">
              ${expHtml}
            </ul>
          </div>

          <div class="border-t border-slate-100 pt-5 flex flex-wrap gap-4 text-xs font-bold text-slate-500">
            <span>✉️ Contacto: <a href="mailto:${escapeText(author.email || '')}" class="text-[#c9a84c] no-underline hover:underline">${escapeText(author.email || '')}</a></span>
            <span>📍 Localización: Quito, Ecuador</span>
          </div>
        </section>

      </main>
      ${renderSeoFooter()}
    </div>
  `;
}
