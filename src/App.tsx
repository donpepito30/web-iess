import React, { useState, useEffect, useRef, Suspense } from "react";
import { 
  Building2, 
  ArrowLeft,
  X,
  Send,
  RefreshCw,
  Info,
  FileText,
  Bot,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";

// Core Data imports
import { PROCEDURES_DATA, Procedure } from "./data/procedures";
import { OFICIOS_TEMPLATES } from "./data/templates";
import { BLOG_POSTS } from "./data/blogPosts";
import type { BlogPost } from "./data/blogPosts";
import { SEO_CATEGORIES, SeoCategory } from "./data/seoCategories";
import { CITIES_DATA } from "./data/cities";
import { ECUADOR_LOCATIONS } from "./server/seoHtml";
import { getSiteUrl, CURRENT_YEAR } from "./config/site";

// Client-side routes & navigation helpers
import { 
  registerNavigationListener, 
  unregisterNavigationListener, 
  urlProcedure, 
  urlBlogPost, 
  urlBlogPage, 
  urlCategory, 
  urlCity, 
  navigate 
} from "./lib/routes";

// Meta tags & SEO graph helpers
import {
  getHomeGraph,
  getProcedureGraph,
  getArticleGraph,
  getCategoryGraph,
  getCityGraph,
  getBlogArchiveGraph
} from "./server/schema";

// Shared layout and navigation UI
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import Link from "./components/Link";
import SearchBar from "./components/SearchBar";
import CookieConsent from "./components/CookieConsent";
import { initWebVitals, initAdSense } from "./lib/ads";
import { analytics } from "./lib/analytics";

// Lazy-loaded pages (code-splitting for ultimate performance)
const Home = React.lazy(() => import("./pages/Home"));
const ProcedurePage = React.lazy(() => import("./pages/ProcedurePage"));
const BlogList = React.lazy(() => import("./pages/BlogList"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const CityPage = React.lazy(() => import("./pages/CityPage"));
const Faq = React.lazy(() => import("./pages/Faq"));
const Oficios = React.lazy(() => import("./pages/Oficios"));
const Tools = React.lazy(() => import("./pages/Tools"));
const LegalPage = React.lazy(() => import("./pages/LegalPage"));

// Lazy-loaded FAB Chat widget for deferred load
const FabChat = React.lazy(() => import("./components/FabChat"));

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Global utility for metadata rendering & dynamic schemas (Task 3)
export function updateMetaTags(config: {
  title: string;
  description: string;
  url: string;
  image?: string;
  robots?: string;
  prevUrl?: string;
  nextUrl?: string;
  jsonLd?: any;
}) {
  if (typeof document === "undefined") return;

  // Title & OpenGraph
  document.title = config.title;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', config.title);
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', config.title);

  // Description & OpenGraph
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', config.description);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', config.description);
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', config.description);

  // Canonical and URL properties
  const siteUrl = getSiteUrl();
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `${siteUrl}${config.url}`);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `${siteUrl}${config.url}`);

  // Image OpenGraph
  if (config.image) {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', config.image);
    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (twitterImg) twitterImg.setAttribute('content', config.image);
  }

  // Robots indexing rule
  const robotsTag = document.querySelector('meta[name="robots"]');
  if (robotsTag) {
    robotsTag.setAttribute('content', config.robots || "index, follow");
  }

  // Prev / Next pagination links
  let prevTag = document.querySelector('link[rel="prev"]');
  if (config.prevUrl) {
    if (!prevTag) {
      prevTag = document.createElement('link');
      prevTag.setAttribute('rel', 'prev');
      document.head.appendChild(prevTag);
    }
    prevTag.setAttribute('href', `${siteUrl}${config.prevUrl}`);
  } else if (prevTag) {
    prevTag.remove();
  }

  let nextTag = document.querySelector('link[rel="next"]');
  if (config.nextUrl) {
    if (!nextTag) {
      nextTag = document.createElement('link');
      nextTag.setAttribute('rel', 'next');
      document.head.appendChild(nextTag);
    }
    nextTag.setAttribute('href', `${siteUrl}${config.nextUrl}`);
  } else if (nextTag) {
    nextTag.remove();
  }

  // Dynamic JSON-LD Structured Data mirroring
  const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]:not([data-dynamic-schema="chat"])');
  existingSchemas.forEach(el => el.remove());

  if (config.jsonLd) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const jsonStr = JSON.stringify(config.jsonLd, null, 2).replace(/</g, '\\u003c');
    script.text = jsonStr;
    document.head.appendChild(script);
  }
}

// Tab Requirements Data for Home view
interface TabRequirement {
  id: "Jubilación" | "Quirografario" | "Afil. Voluntaria" | "Cesantía";
  emoji: string;
  title: string;
  requirements: string[];
  steps: string[];
}

const TAB_REQUIREMENTS_DATA: TabRequirement[] = [
  {
    id: "Jubilación",
    emoji: "👴",
    title: "Jubilación por Vejez",
    requirements: [
      "Estar en situación de cese laboral (no tener relación de dependencia activa).",
      "Haber registrado la salida laboral (aviso de salida) en el sistema del IESS.",
      "Cuenta bancaria registrada y autorizada por el IESS.",
      "Tener correo electrónico activo y actualizado en el portal del IESS.",
      "No tener deudas en mora con el IESS ni el BIESS (incluyendo préstamos de todo tipo).",
      "Cumplir con la combinación edad-aportaciones (ej. 60 años de edad + 30 de aportes)."
    ],
    steps: [
      "Verifica tu historial de aportes y saldo de cesantía/deudas en iess.gob.ec.",
      "Solicita al empleador registrar el aviso de salida legalmente.",
      "Ingresa a la opción 'Trámites Virtuales' -> 'Asegurados' -> 'Pensionistas' -> 'Jubilación'.",
      "Accede con tu cédula y clave del afiliado.",
      "Completa y aprueba el formulario electrónico de solicitud.",
      "Confirma o registra la cuenta bancaria para la transferencia de pensiones.",
      "Envía la solicitud para validaciones correspondientes (de preferencia antes del día 25)."
    ]
  },
  {
    id: "Quirografario",
    emoji: "💰",
    title: "Préstamo Quirografario BIESS",
    requirements: [
      "Aportaciones vigentes: Mínimo 36 aportaciones en total, con 12 consecutivas inmediatas.",
      "Fondos acumulados: Poseer de forma garantizada Cesantía y/o Fondos de Reserva en el BIESS.",
      "Sin mora patronal: Que el empleador no registre mora en el pago de planillas IESS.",
      "Cero deudas: No tener deudas vencidas ni en coactiva en el IESS / BIESS.",
      "Cuenta activa: Cuenta bancaria individual verificada y registrada para depósitos BIESS.",
      "Sin créditos en trámite: No poseer préstamos de vivienda o quirografarios en curso simultáneo."
    ],
    steps: [
      "Entra al portal del BIESS (biess.fin.ec) y haz clic en 'Quirografarios'.",
      "Ingresa tus credenciales personales (cédula y contraseña de afiliado).",
      "Selecciona tu rol correspondiente (Afiliado, Jubilado o Pensionista).",
      "Consulta el cupo de endeudamiento precalificado automáticamente por la plataforma.",
      "Selecciona el plazo de reembolso del crédito y el sistema de amortización anual.",
      "Valida y confirma la cuenta bancaria registrada para recibir el desembolso.",
      "Presiona 'Aprobar solicitud' y espera el código de confirmación vía correo electrónico."
    ]
  },
  {
    id: "Afil. Voluntaria",
    emoji: "📝",
    title: "Afiliación Voluntaria IESS",
    requirements: [
      "No tener relación de laboral dependiente simultánea/activa con ningún empleador.",
      "Cédula de identidad física o ciudadanía ecuatoriana registrada y vigente.",
      "Residencia o extranjería regular registrada oficialmente si eres extranjero en Ecuador.",
      "Cuenta bancaria ecuatoriana configurada para débito automático de la obligación.",
      "Ingreso de aportación declarado mayor o igual al Salario Básico (SBU, USD 482 en 2026).",
      "Validar historial para asegurar la ausencia de impedimentos de afiliación activos."
    ],
    steps: [
      "Accede a iess.gob.ec y navega al botón de 'Afiliación Voluntaria'.",
      "Escoge el tipo de afiliación aplicable (Ecuatoriano, Extranjero, Residente Exterior).",
      "Introduce el número de cédula y fecha de nacimiento para búsqueda en el Registro Civil.",
      "Ingresa el monto mensual sobre el que deseas aportar (mínimo USD 482 en 2026).",
      "Confirma tus canales de contacto (correo, teléfono) y registra la cuenta bancaria.",
      "Genera la aprobación e imprime la precalificación emitida por el portal del IESS.",
      "Realice sus aportaciones puntualmente antes del día 15 de cada mes vencido."
    ]
  },
  {
    id: "Cesantía",
    emoji: "💼",
    title: "Retiro de Cesantía IESS",
    requirements: [
      "Tener registrado el aviso de salida legal por el empleador en el sistema del IESS.",
      "Contar con al menos 24 aportaciones mensuales no simultáneas en total.",
      "Estar en situación de desempleo o cese laboral por un lapso mínimo de 60 días seguidos.",
      "Tener cuenta bancaria debidamente registrada y validada para transferencias de fondos.",
      "No tener préstamos quirografarios vigentes o deudas activas con el IESS/BIESS.",
      "No registrar solicitudes de jubilación activas en trámite de resolución."
    ],
    steps: [
      "Espera a cumplir los 60 días calendario de desempleo desde tu fecha de aviso de salida.",
      "Ingresa al portal iess.gob.ec con tus datos de asegurado.",
      "Selecciona 'Trámites Virtuales' -> 'Asegurados' -> 'Afiliados' -> 'Cesantía'.",
      "Inicie sesión digitando tu cédula de ciudadanía y clave del afiliado.",
      "El sistema comprobará tu récord de aportaciones y días de cese de forma autónoma.",
      "Si precalificas, ingresa el monto total o parcial a retirar de tu cuenta acumulada.",
      "Confirma tu cuenta bancaria y envía la solicitud para transferencia en 5 días."
    ]
  }
];

interface FrequentProcedure {
  emoji: string;
  title: string;
  timeframe: string;
  query: string;
}

const FREQUENT_PROCEDURES: FrequentProcedure[] = [
  {
    emoji: "👴",
    title: "Jubilación por Vejez",
    timeframe: "30-60 días",
    query: "Me gustaría conocer los requisitos, combinaciones de edad y aportaciones, y los pasos para tramitar la Jubilación por Vejez en el IESS."
  },
  {
    emoji: "💰",
    title: "Préstamo Quirografario BIESS",
    timeframe: "24-72 horas",
    query: "¿Cómo puedo solicitar un Préstamo Quirografario en el BIESS? Indícame los requisitos para afiliados activos, jubilados y los montos disponibles."
  },
  {
    emoji: "🏠",
    title: "Préstamo Hipotecario BIESS",
    timeframe: "15-30 días",
    query: "Quiero solicitar un Préstamo Hipotecario en el BIESS para adquirir una vivienda, terreno o remodelarla. ¿Cuáles son los requisitos y montos de financiamiento?"
  },
  {
    emoji: "📝",
    title: "Afiliación Voluntaria",
    timeframe: "Inmediato",
    query: "Hola. Quiero afiliarme de forma voluntaria al IESS. ¿Cuánto debo aportar mensualmente si lo hago sobre el SBU (Sueldo Básico), cuáles son los pasos actuales y qué beneficios o coberturas me ofrece?"
  },
  {
    emoji: "🤱",
    title: "Subsidio Maternidad/Enfermedad",
    timeframe: "5-10 días",
    query: "¿Cuáles son los requisitos actuales y plazos para tramitar y cobrar el Subsidio de Maternidad y Enfermedad (Incapacidad Temporal) en el IESS?"
  },
  {
    emoji: "💼",
    title: "Cesantía y Seguro de Desempleo",
    timeframe: "5-15 días",
    query: "¿Cómo puedo retirar fondos de Cesantía y cómo postular al Seguro de Desempleo? Indícame los plazos, requisitos legales según el C.D. 515 y montos de beneficio."
  },
  {
    emoji: "🏢",
    title: "Aviso de Entrada/Salida",
    timeframe: "Inmediato",
    query: "Soy empleador y necesito detalles sobre la obligación de registrar los avisos de entrada y salida de mis empleados en el IESS. ¿Cuáles son los plazos reglamentarios y consecuencias de no hacerlo a tiempo?"
  },
  {
    emoji: "📞",
    title: "Actualización de Datos",
    timeframe: "Inmediato",
    query: "Necesito realizar la Actualización de Datos Personales en el IESS de forma virtual o presencial. ¿Cuáles son los requisitos oficiales o documentos que debo tener?"
  }
];

export default function App() {
  // Advanced Router states
  const [currentRoute, setCurrentRoute] = useState<'home' | 'procedure' | 'blog' | 'faq' | 'category' | 'tool'>('home');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSeoCategory, setSelectedSeoCategory] = useState<SeoCategory | null>(null);
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState<string | null>(null);
  const [activeLegalPage, setActiveLegalPage] = useState<'about' | 'editorial' | 'contact' | 'privacy' | 'terms' | 'legal' | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [activeReqTab, setActiveReqTab] = useState<"Jubilación" | "Quirografario" | "Afil. Voluntaria" | "Cesantía">("Jubilación");

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! Soy tu asistente para trámites del IESS. Puedo orientarte sobre jubilación, préstamos, afiliación, subsidios, quejas y mucho más. ¿En qué te ayudo hoy?",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  // FORM GENERATOR STATES
  const [generatorType, setGeneratorType] = useState<'aportes' | 'maternidad'>('aportes');
  const [copied, setCopied] = useState(false);

  // States for Reclamo de Aportes Faltantes
  const [aportesNombre, setAportesNombre] = useState("");
  const [aportesCedula, setAportesCedula] = useState("");
  const [aportesEmpleador, setAportesEmpleador] = useState("");
  const [aportesFechaInicio, setAportesFechaInicio] = useState("");
  const [aportesFechaFin, setAportesFechaFin] = useState("");
  const [aportesPeriodos, setAportesPeriodos] = useState("");
  const [aportesCiudad, setAportesCiudad] = useState("Quito");

  // States for Subsidio de Maternidad
  const [maternidadNombre, setMaternidadNombre] = useState("");
  const [maternidadCedula, setMaternidadCedula] = useState("");
  const [maternidadEmpleador, setMaternidadEmpleador] = useState("");
  const [maternidadFechaNacimiento, setMaternidadFechaNacimiento] = useState("");
  const [maternidadFechaCertificado, setMaternidadFechaCertificado] = useState("");
  const [maternidadBanco, setMaternidadBanco] = useState("");
  const [maternidadCuentaType, setMaternidadCuentaType] = useState("Ahorros");
  const [maternidadCuentaNum, setMaternidadCuentaNum] = useState("");
  const [maternidadMotivoRetraso, setMaternidadMotivoRetraso] = useState("");
  const [maternidadCiudad, setMaternidadCiudad] = useState("Quito");

  // Pestaña principal que organiza toda la web
  const [mainTab, setMainTab] = useState<'consultas' | 'oficios' | 'blog'>('consultas');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogSearch, setBlogSearch] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>("All");
  const [blogCurrentPage, setBlogCurrentPage] = useState<number>(1);
  const blogPostsPerPage = 4;

  // Estado del nuevo Generador integral de 17 Oficios de Ley
  const [selectedOficioId, setSelectedOficioId] = useState<string>("glosa");
  const [oficioFormValues, setOficioFormValues] = useState<Record<string, string>>({});
  const [oficioCopied, setOficioCopied] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Auto-cargar valores por defecto de inputs cuando cambia el oficio
  useEffect(() => {
    const template = OFICIOS_TEMPLATES.find(o => o.id === selectedOficioId);
    if (template) {
      const defaults: Record<string, string> = {};
      template.fields.forEach(field => {
        defaults[field.id] = field.defaultValue || "";
      });
      setOficioFormValues(defaults);
      setOficioCopied(false);
    }
  }, [selectedOficioId]);

  // FLOATING CHATBOT WIDGET (FAB) STATES
  const [isFabChatOpen, setIsFabChatOpen] = useState(false);
  const [fabChatMessages, setFabChatMessages] = useState<ChatMessage[]>([
    {
      id: "fab-welcome",
      role: "assistant",
      content: "¡Hola! Soy tu asistente virtual del IESS 🛡️. Estoy aquí para resolver tus consultas sobre trámites, requisitos o reclamos 24/7. Selecciona una opción rápida abajo o escribe lo que necesitas.",
      timestamp: new Date()
    }
  ]);
  const [fabChatInput, setFabChatInput] = useState("");
  const [isFabTyping, setIsFabTyping] = useState(false);

  // DEFERRED LOADING OF FAB CHAT (Hydration / Idle optimization)
  const [loadFab, setLoadFab] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setLoadFab(true));
      } else {
        setTimeout(() => setLoadFab(true), 2000);
      }
    }
    
    const triggerLoad = () => {
      setLoadFab(true);
      cleanup();
    };
    const events = ["pointermove", "touchstart", "scroll", "keydown"];
    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, triggerLoad));
    };
    events.forEach(e => window.addEventListener(e, triggerLoad, { passive: true }));
    return cleanup;
  }, []);

  // Scroll ref for chat
  const chatSectionRef = useRef<HTMLElement>(null);

  // Check API health status and initialize vitals & ads on startup
  useEffect(() => {
    initWebVitals();
    initAdSense();

    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setApiOnline(data.api_configured);
      })
      .catch(() => {
        setApiOnline(false);
      });
  }, []);

  // Advanced unified route handler
  const handleUrlNavigation = (url: string) => {
    const path = url.toLowerCase();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset sub-routes by default
    setSelectedProcedure(null);
    setSelectedPost(null);
    setSelectedCity(null);
    setSelectedSeoCategory(null);
    setSelectedSubcategorySlug(null);
    setActiveLegalPage(null);
    setActiveTool(null);

    if (path.startsWith("/herramientas/calculadora-jubilacion") || path === "/herramientas/calculadora-jubilacion") {
      setCurrentRoute('tool');
      setActiveTool('calculadora-jubilacion');
      updateMetaTags({
        title: "Calculadora de Jubilación IESS Ecuador " + CURRENT_YEAR + " | IESS Asistente",
        description: "Simule su elegibilidad para la jubilación por vejez del IESS ingresando su edad y aportes. Cálculos ajustados a la Ley de Seguridad Social.",
        url: "/herramientas/calculadora-jubilacion",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Calculadora de Jubilación IESS",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }
      });
    } else if (path === "/herramientas/calculadora-aporte-afiliacion-voluntaria") {
      setCurrentRoute('tool');
      setActiveTool('calculadora-aporte-afiliacion-voluntaria');
      updateMetaTags({
        title: "Calculadora de Aporte de Afiliación Voluntaria IESS | IESS Asistente",
        description: "Simulador interactivo para calcular el valor exacto de su aporte mensual como afiliado voluntario del IESS en Ecuador según su salario.",
        url: "/herramientas/calculadora-aporte-afiliacion-voluntaria",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Calculadora de Aporte de Afiliación Voluntaria IESS",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }
      });
    } else if (path === "/herramientas/calculadora-subsidio-maternidad") {
      setCurrentRoute('tool');
      setActiveTool('calculadora-subsidio-maternidad');
      updateMetaTags({
        title: "Calculadora de Subsidio de Maternidad IESS | IESS Asistente",
        description: "Simule y calcule los montos compartidos del IESS (75%) y empleador (25%) durante su licencia de maternidad de 84 días en Ecuador.",
        url: "/herramientas/calculadora-subsidio-maternidad",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Calculadora de Subsidio de Maternidad IESS",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }
      });
    } else if (path === "/herramientas/verifica-requisitos-prestamo-quirografario") {
      setCurrentRoute('tool');
      setActiveTool('verifica-requisitos-prestamo-quirografario');
      updateMetaTags({
        title: "Verificador de Requisitos Préstamo Quirografario | IESS Asistente",
        description: "Autoevaluación interactiva de requisitos mínimos del BIESS para calificar y simular un préstamo quirografario de consumo en Ecuador.",
        url: "/herramientas/verifica-requisitos-prestamo-quirografario",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Verificador de Requisitos Préstamo Quirografario BIESS",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }
      });
    } else if (path === "/herramientas/generador-de-oficios" || path === "/herramientas/oficios") {
      setCurrentRoute('tool');
      setActiveTool('generador-de-oficios');
      updateMetaTags({
        title: "Generador de Oficios y Reclamaciones IESS | IESS Asistente",
        description: "Cree y descargue de forma gratuita cartas de descargo, apelación de glosas patronales y reclamos formales fundamentados ante el IESS en Ecuador.",
        url: "/herramientas/generador-de-oficios",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Generador de Oficios y Reclamaciones IESS",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }
      });
    } else if (path.startsWith("/herramientas/oficios/")) {
      const templateSlug = path.split("/herramientas/oficios/")[1];
      const template = OFICIOS_TEMPLATES.find(t => t.id === templateSlug);
      if (template) {
        setCurrentRoute('tool');
        setActiveTool(`oficio-${templateSlug}`);
        setSelectedOficioId(template.id);
        updateMetaTags({
          title: `Oficio para ${template.name} IESS | IESS Asistente`,
          description: `Generador de oficio gratuito y base legal para: ${template.description}`,
          url: `/herramientas/oficios/${templateSlug}`,
          jsonLd: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `Generador de Oficio - ${template.name}`,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          }
        });
      } else {
        setCurrentRoute('tool');
        setActiveTool('generador-de-oficios');
      }
    } else if (path === "/" || path === "/home") {
      setCurrentRoute('home');
      setMainTab('consultas');
      updateMetaTags({
        title: "IESS Ecuador: trámites y requisitos " + CURRENT_YEAR + " | IESS Asistente",
        description: "Consulta requisitos de jubilación, préstamos quirografarios, hipotecarios, afiliación voluntaria y genera oficios de ley de forma gratuita.",
        url: "/",
        jsonLd: getHomeGraph(getSiteUrl(), PROCEDURES_DATA)
      });
    } else if (path === "/oficios") {
      setCurrentRoute('home');
      setMainTab('oficios');
      updateMetaTags({
        title: "Formatos y Oficios de Ley IESS " + CURRENT_YEAR + " | IESS Asistente",
        description: "Generador inteligente y gratuito de 17 oficios, apelaciones e impugnaciones de glosas para afiliados y empleadores del IESS en Ecuador.",
        url: "/oficios",
        jsonLd: getCategoryGraph(getSiteUrl(), SEO_CATEGORIES.find(c => c.slug === "herramientas") || { slug: "herramientas", title: "Herramientas de Ley", metaTitle: "Herramientas de Ley", metaDescription: "Herramientas", faqs: [] }, null)
      });
    } else if (path === "/faq") {
      setCurrentRoute('faq');
      setMainTab('consultas');
      updateMetaTags({
        title: "Preguntas Frecuentes IESS: respuestas " + CURRENT_YEAR + " | IESS Asistente",
        description: "Respuestas inmediatas a tus dudas de jubilación, préstamos BIESS, afiliación voluntaria y cobro de fondos en el IESS de Ecuador.",
        url: "/faq",
        jsonLd: getCategoryGraph(getSiteUrl(), SEO_CATEGORIES.find(c => c.slug === "faq") || { slug: "faq", title: "Preguntas Frecuentes", metaTitle: "FAQ", metaDescription: "Preguntas Frecuentes IESS", faqs: [] }, null)
      });
    } else if (path === "/sobre-nosotros") {
      setActiveLegalPage("about");
      setCurrentRoute('home');
      updateMetaTags({
        title: "Sobre Nosotros | Guía IESS Ciudadano",
        description: "Conoce más sobre el portal independiente de orientación y asistencia ciudadana para trámites del IESS en Ecuador.",
        url: "/sobre-nosotros"
      });
    } else if (path === "/editorial") {
      setActiveLegalPage("editorial");
      setCurrentRoute('home');
      updateMetaTags({
        title: "Metodología Editorial | Guía IESS Ciudadano",
        description: "Descubre nuestro riguroso proceso de verificación y contraste normativo para asegurar la fidelidad legal de nuestras guías del IESS.",
        url: "/editorial"
      });
    } else if (path === "/contacto") {
      setActiveLegalPage("contact");
      setCurrentRoute('home');
      updateMetaTags({
        title: "Contacto | Guía IESS Ciudadano",
        description: "Ponte en contacto con el equipo editorial de Guía IESS Ciudadano para sugerencias, reportes o consultas generales.",
        url: "/contacto"
      });
    } else if (path === "/privacidad") {
      setActiveLegalPage("privacy");
      setCurrentRoute('home');
      updateMetaTags({
        title: "Política de Privacidad | Guía IESS Ciudadano",
        description: "Detalles sobre cómo tratamos la información en nuestro portal de asistencia y simuladores del IESS.",
        url: "/privacidad"
      });
    } else if (path === "/terminos") {
      setActiveLegalPage("terms");
      setCurrentRoute('home');
      updateMetaTags({
        title: "Términos y Condiciones | Guía IESS Ciudadano",
        description: "Términos de uso de la plataforma informativa y de orientación para afiliados del IESS en Ecuador.",
        url: "/terminos"
      });
    } else if (path === "/aviso-legal") {
      setActiveLegalPage("legal");
      setCurrentRoute('home');
      updateMetaTags({
        title: "Aviso Legal | Guía IESS Ciudadano",
        description: "Declaración de independencia informativa respecto al Instituto Ecuatoriano de Seguridad Social.",
        url: "/aviso-legal"
      });
    } else if (path.startsWith("/procedimiento/")) {
      const slug = path.split("/procedimiento/")[1];
      const proc = PROCEDURES_DATA.find(p => p.id.toLowerCase().replace(/\s+/g, '-') === slug || p.id.toLowerCase() === slug);
      if (proc) {
        setSelectedProcedure(proc);
        setCurrentRoute('procedure');
        setMainTab('consultas');
        updateMetaTags({
          title: proc.title + ": requisitos y pasos " + CURRENT_YEAR + " | IESS Asistente",
          description: "Requisitos indispensables, guía paso a paso y errores a evitar para tramitar " + proc.title + " en el IESS de Ecuador. Genera tu oficio gratis.",
          url: `/procedimiento/${slug}`,
          jsonLd: getProcedureGraph(getSiteUrl(), proc)
        });
      }
    } else if (path.startsWith("/blog/page/") || path === "/blog") {
      let p = 1;
      if (path.startsWith("/blog/page/")) {
        p = parseInt(path.split("/blog/page/")[1], 10) || 1;
      }
      setBlogCurrentPage(p);
      setCurrentRoute('blog');
      setMainTab('blog');
      
      const title = p <= 1
        ? "Blog de Guías Prácticas del IESS " + CURRENT_YEAR + " | IESS Asistente"
        : "Blog de Guías de Seguridad Social - Página " + p + " | IESS Asistente";
      const description = p <= 1
        ? "Encuentra explicaciones sencillas, normativas vigentes y guías detalladas de jubilaciones, préstamos BIESS y trámites del IESS de Ecuador."
        : "Página " + p + " del archivo de guías y normativas del IESS de Ecuador. Información de requisitos y resoluciones del Consejo Directivo.";
      
      const totalPages = Math.ceil(BLOG_POSTS.length / blogPostsPerPage) || 1;
      const prevUrl = p === 2 ? "/blog" : p > 2 ? `/blog/page/${p - 1}` : undefined;
      const nextUrl = p < totalPages ? `/blog/page/${p + 1}` : undefined;
      const robots = p > 5 ? "noindex, follow" : "index, follow";

      const limit = blogPostsPerPage;
      const offset = (p - 1) * limit;
      const pagePosts = BLOG_POSTS.slice(offset, offset + limit);

      updateMetaTags({
        title,
        description,
        url: p <= 1 ? "/blog" : `/blog/page/${p}`,
        robots,
        prevUrl,
        nextUrl,
        jsonLd: getBlogArchiveGraph(getSiteUrl(), p, pagePosts)
      });
    } else if (path.startsWith("/blog/")) {
      const slug = path.split("/blog/")[1];
      const post = BLOG_POSTS.find(p => p.slug === slug || p.id === slug);
      if (post) {
        setSelectedPost(post);
        setCurrentRoute('blog');
        setMainTab('blog');
        updateMetaTags({
          title: post.title + " | IESS Asistente",
          description: post.metaDescription,
          url: `/blog/${post.slug}`,
          image: post.image,
          jsonLd: getArticleGraph(getSiteUrl(), post)
        });
      }
    } else if (path === "/iess" || path === "/iess/") {
      setSelectedCity('directory');
      setCurrentRoute('home');
      setMainTab('consultas');
      updateMetaTags({
        title: `Directorio Local IESS de Oficinas y Hospitales ${CURRENT_YEAR} | IESS Asistente`,
        description: "Consulta el directorio independiente de oficinas, CAUs y hospitales del IESS por provincia y ciudad de Ecuador. Información real verificada.",
        url: "/iess"
      });
    } else if (path.startsWith("/iess/")) {
      const city = path.split("/iess/")[1];
      const cityData = CITIES_DATA[city];
      if (cityData) {
        setSelectedCity(city);
        setCurrentRoute('home');
        setMainTab('consultas');
        const cityNameCap = cityData.name;
        
        const wordCount = cityData.uniqueContent.split(/\s+/).filter(Boolean).length;
        const verifiedCount = cityData.dependencies.filter(dep => dep.verifiedAt !== null && dep.address !== null).length;
        const isIndexed = wordCount >= 600 && verifiedCount >= 2;
        const robots = isIndexed ? "index, follow" : "noindex, follow";

        const locData = ECUADOR_LOCATIONS[city] || {
          fullName: cityData.name,
          region: cityData.province,
          lat: cityData.lat,
          lng: cityData.lng
        };

        updateMetaTags({
          title: "IESS " + cityNameCap + ": oficinas, turnos y trámites " + CURRENT_YEAR + " | IESS Asistente",
          description: "Guía local para IESS " + cityNameCap + ". Consulta el horario de atención, ubicación física, requisitos de afiliación y trámites en tu provincia.",
          url: `/iess/${city}`,
          robots,
          jsonLd: getCityGraph(getSiteUrl(), city, locData)
         });
      }
    } else {
      // Category/Subcategory matching
      const pathParts = path.split("/").filter(Boolean);
      if (pathParts.length > 0) {
        const matchedCategory = SEO_CATEGORIES.find(c => c.slug === pathParts[0]);
        if (matchedCategory) {
          setSelectedSeoCategory(matchedCategory);
          let matchedSub = null;
          if (pathParts.length > 1) {
            matchedSub = matchedCategory.subcategories.find(s => s.slug === pathParts[1]) || null;
            if (matchedSub) {
              setSelectedSubcategorySlug(matchedSub.slug);
            }
          }
          setCurrentRoute('category');
          setMainTab('consultas');
          
          const url = pathParts.length > 1 ? `/${pathParts[0]}/${pathParts[1]}` : `/${pathParts[0]}`;
          const title = pathParts.length > 1 && matchedSub
            ? matchedSub.title + " - " + matchedCategory.title + " | IESS Asistente"
            : matchedCategory.title + " en el IESS: guía " + CURRENT_YEAR;
            
          updateMetaTags({
            title,
            description: pathParts.length > 1 
              ? matchedCategory.subcategories.find(s => s.slug === pathParts[1])?.description || matchedCategory.metaDescription
              : matchedCategory.metaDescription,
            url,
            jsonLd: getCategoryGraph(getSiteUrl(), matchedCategory, pathParts.length > 1 ? pathParts[1] : null)
          });
        }
      }
    }
  };

  useEffect(() => {
    handleUrlNavigation(window.location.pathname);
    registerNavigationListener(handleUrlNavigation);
    
    const handlePopState = () => {
      handleUrlNavigation(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      unregisterNavigationListener();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToProcedure = (procedure: Procedure) => {
    navigate(urlProcedure(procedure.id));
  };

  const clearSelectedProcedure = () => {
    navigate("/");
  };

  const clearSelectedBlogPost = () => {
    navigate(urlBlogPage(blogCurrentPage));
  };

  const navigateToBlogPage = (page: number) => {
    navigate(urlBlogPage(page));
  };

  const handleConsultasTabClick = () => {
    navigate("/");
  };

  const handleOficiosTabClick = () => {
    navigate("/oficios");
  };

  const handleBlogTabClick = () => {
    navigate("/blog");
  };

  const navigateToCity = (city: string) => {
    navigate(urlCity(city));
  };

  const clearSelectedCity = () => {
    navigate("/");
  };

  const navigateToCategory = (categorySlug: string, subcategorySlug: string | null = null) => {
    navigate(urlCategory(categorySlug, subcategorySlug));
  };

  // Filtered procedures for Home View
  const categoriesList = ["All", "Jubilación", "Créditos", "Seguros y Subsidios", "Trámites y Afiliación"];
  
  const filteredProcedures = PROCEDURES_DATA.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.whoCanDo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchTrigger = () => {
    if (searchQuery.trim()) {
      analytics.search(searchQuery.trim(), filteredProcedures.length);
    }
    if (mainTab !== 'consultas' || currentRoute !== 'home' || selectedProcedure || selectedPost || selectedCity || selectedSeoCategory) {
      setMainTab('consultas');
      setCurrentRoute('home');
      setSelectedProcedure(null);
      setSelectedPost(null);
      setSelectedCity(null);
      setSelectedSeoCategory(null);
      setSelectedSubcategorySlug(null);
      window.history.pushState(null, "Asistente IESS Ecuador - Trámites y Requisitos", "/");
    }
    setTimeout(() => {
      const element = document.getElementById("catalogo-tramites");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleProblemClick = (problemTitle: string, description: string) => {
    const customPrompt = `Hola. Tengo un problema de "${problemTitle}" (${description}). ¿Cómo puedo solucionarlo y a través de qué canales oficiales del IESS puedo poner una denuncia o reclamo?`;
    sendMessage(customPrompt);
    
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFrequentProcedureClick = (title: string, prompt: string) => {
    sendMessage(prompt);
    
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Chat message sender API
  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    if (chatMessages.length <= 1) {
      analytics.chatStart("main_chat");
    }
    analytics.chatMessage(textToSend.length, "user");

    const userMsgId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
    setIsTyping(true);

    try {
      const historyContext = chatMessages
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: historyContext }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.schema) {
        const existing = document.querySelectorAll('script[data-dynamic-schema="chat"]');
        existing.forEach(el => el.remove());
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.schema;
        const actualScript = tempDiv.firstChild;
        if (actualScript instanceof HTMLScriptElement) {
          actualScript.setAttribute('data-dynamic-schema', 'chat');
          document.head.appendChild(actualScript);
        }
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response || "Lo siento, experimenté un error. Por favor intenta de nuevo.",
        timestamp: new Date()
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
      analytics.chatMessage((data.response || "").length, "assistant", Boolean(data.simulator));
    } catch {
      setIsTyping(false);
      const assistantMsg: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content: "Para confirmar este dato te recomiendo verificar en iess.gob.ec o llamar al 1800-4377 ya que la red fluctuó levemente.",
        timestamp: new Date()
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    }
  };

  const onClearChat = () => {
    setChatMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "¡Hola! Soy tu asistente para trámites del IESS. Puedo orientarte sobre jubilación, préstamos, afiliación, subsidios, quejas y mucho más. ¿En qué te ayudo hoy?",
        timestamp: new Date()
      }
    ]);
  };

  // FAB Widget message sender API
  const sendFabMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    if (fabChatMessages.length <= 1) {
      analytics.chatStart("fab_chat");
    }
    analytics.chatMessage(textToSend.length, "user");

    const userMsgId = `user-fab-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setFabChatMessages((prev) => [...prev, newMsg]);
    setFabChatInput("");
    setIsFabTyping(true);

    try {
      const historyContext = fabChatMessages
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: historyContext }),
      });

      const data = await response.json();
      setIsFabTyping(false);

      if (data.schema) {
        const existing = document.querySelectorAll('script[data-dynamic-schema="chat"]');
        existing.forEach(el => el.remove());
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.schema;
        const actualScript = tempDiv.firstChild;
        if (actualScript instanceof HTMLScriptElement) {
          actualScript.setAttribute('data-dynamic-schema', 'chat');
          document.head.appendChild(actualScript);
        }
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-fab-${Date.now()}`,
        role: "assistant",
        content: data.response || "Lo siento, de momento no he podido resolver la consulta. Por favor, intenta de nuevo.",
        timestamp: new Date()
      };
      setFabChatMessages((prev) => [...prev, assistantMsg]);
      analytics.chatMessage((data.response || "").length, "assistant", Boolean(data.simulator));
    } catch {
      setIsFabTyping(false);
      const assistantMsg: ChatMessage = {
        id: `assistant-fab-error-${Date.now()}`,
        role: "assistant",
        content: "Para confirmar este dato te recomiendo verificar en iess.gob.ec o llamar al 1800-4377 ya que la red fluctuó levemente.",
        timestamp: new Date()
      };
      setFabChatMessages((prev) => [...prev, assistantMsg]);
    }
  };

  const isHomePage = 
    currentRoute === 'home' && 
    mainTab === 'consultas' && 
    !selectedProcedure && 
    !selectedPost && 
    !selectedCity && 
    !selectedSeoCategory && 
    !activeLegalPage && 
    !activeTool;

  const showPortalTabs = 
    (currentRoute === 'home' || currentRoute === 'blog') && 
    !selectedProcedure && 
    !selectedPost && 
    !selectedCity && 
    !selectedSeoCategory && 
    !activeLegalPage && 
    !activeTool;

  return (
    <div id="app-root" className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased flex flex-col selection:bg-[#c9a84c] selection:text-white overflow-x-hidden w-full">
      
      {/* HEADER PERFECT 3-ZONE CONTRACT */}
      <Header onOpenAssistant={() => setIsFabChatOpen(true)} />

      {/* BANNER DE ALERTA ROJO */}
      <div id="red-alert-banner" className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-inner">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left transition-all">
          <div className="flex items-center gap-2">
            <span className="bg-white shrink-0 text-red-700 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full uppercase animate-pulse font-sans">
              Nuevo
            </span>
            <p className="text-xs sm:text-sm font-semibold tracking-wide font-sans">
              El IESS habilitó canales 24/7 para denuncias: <span className="underline font-bold decoration-white/50">denuncias.iess.gob.ec</span> | WhatsApp <span className="underline font-bold">0962532338</span>
            </p>
          </div>
          <div className="flex gap-2">
            <a 
              href="https://denuncias.iess.gob.ec" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[11px] bg-red-800/80 hover:bg-black/20 text-white font-bold py-1 px-3 rounded-md transition-colors border border-white/20 uppercase tracking-wider font-sans no-underline"
            >
              Ir a Denuncias
            </a>
            <button 
              onClick={() => handleFrequentProcedureClick("Canales de Denuncia", "¿Cómo denunciar un mal servicio en el IESS o falta de atención?")}
              className="text-[11px] bg-white text-red-700 font-bold py-1 px-3 rounded-md hover:bg-slate-100 transition-colors uppercase tracking-wider font-sans cursor-pointer"
            >
              Consultar Guía
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION - EXECUTIVE CIVIC ALIGNMENT (SOLO EN PORTADA PRINCIPAL) */}
      {isHomePage && (
        <section id="hero-section" className="bg-gradient-to-b from-[#0a1f42] via-[#0d2754] to-[#0a1f42] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 relative overflow-hidden border-b border-slate-800">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#c9a84c]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          
          <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            
            {/* Eyebrow / Kicker */}
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-200 tracking-wide mb-4 shadow-sm mx-auto"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span>Portal Ciudadano Independiente · Normativa Oficial 2026</span>
            </motion.div>

            {/* Main Title - PERFECT MATHEMATICAL AND OPTICAL ALIGNMENT */}
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.2] text-center max-w-2xl mx-auto font-sans"
            >
              <span className="block text-white">Tu guía completa para</span>
              <span className="block bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#c9a84c] bg-clip-text text-transparent mt-1 sm:mt-1.5">
                trámites del IESS y BIESS
              </span>
            </motion.h1>

            {/* Subtitle - BALANCED SYMMETRY */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.35 }}
              className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto mt-4 text-center font-normal leading-relaxed font-sans [text-wrap:balance]"
            >
              Consulta requisitos oficiales, genera oficios de ley gratuitos y resuelve tus dudas con nuestro asistente legal interactivo.
            </motion.p>

            {/* SearchBar Container */}
            <div className="w-full max-w-2xl mx-auto mt-6 sm:mt-8">
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearchTrigger}
              />
            </div>

            {/* Quick-Access Filter Tabs */}
            <div className="mt-5 sm:mt-6 w-full max-w-3xl mx-auto flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-medium text-slate-300/80 mb-2 tracking-wide">
                Accesos rápidos por trámite:
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {categoriesList.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        if (mainTab !== 'consultas' || currentRoute !== 'home' || selectedProcedure || selectedPost || selectedCity || selectedSeoCategory) {
                          setMainTab('consultas');
                          setCurrentRoute('home');
                          setSelectedProcedure(null);
                          setSelectedPost(null);
                          setSelectedCity(null);
                          setSelectedSeoCategory(null);
                          setSelectedSubcategorySlug(null);
                          window.history.pushState(null, "Asistente IESS Ecuador - Trámites y Requisitos", "/");
                        }
                        setSelectedCategory(cat);
                        setTimeout(() => {
                          const element = document.getElementById("catalogo-tramites");
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer font-sans ${
                        isSelected 
                          ? "bg-[#c9a84c] text-[#0a1f42] font-black shadow-md border border-[#c9a84c]" 
                          : "bg-white/8 hover:bg-white/15 text-slate-200 border border-white/10 hover:border-white/25"
                      }`}
                    >
                      {cat === "All" ? "Todos los Trámites" : cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Trust & Metric Cards: Laser aligned to 5xl grid */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12 text-left">
              <div className="bg-white/6 hover:bg-white/10 backdrop-blur-sm border border-white/12 hover:border-[#c9a84c]/50 rounded-xl p-3.5 sm:p-4 transition-all duration-150 flex flex-col justify-between min-h-[96px] group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center shrink-0 border border-[#c9a84c]/30 group-hover:scale-105 transition-transform">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base sm:text-lg font-black text-white tabular-nums tracking-tight">13+ Guías</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">
                  Paso a paso con requisitos oficiales actualizados
                </p>
              </div>

              <div className="bg-white/6 hover:bg-white/10 backdrop-blur-sm border border-white/12 hover:border-amber-400/50 rounded-xl p-3.5 sm:p-4 transition-all duration-150 flex flex-col justify-between min-h-[96px] group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/15 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30 group-hover:scale-105 transition-transform">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base sm:text-lg font-black text-white tracking-tight">Chatbot 24/7</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">
                  Orientación legal y cálculo en tiempo real
                </p>
              </div>

              <div className="bg-white/6 hover:bg-white/10 backdrop-blur-sm border border-white/12 hover:border-emerald-400/50 rounded-xl p-3.5 sm:p-4 transition-all duration-150 flex flex-col justify-between min-h-[96px] group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-400/15 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base sm:text-lg font-black text-white tabular-nums tracking-tight">100% Legal</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">
                  Apegada a resoluciones y boletines del IESS
                </p>
              </div>

              <div className="bg-white/6 hover:bg-white/10 backdrop-blur-sm border border-white/12 hover:border-[#c9a84c]/50 rounded-xl p-3.5 sm:p-4 transition-all duration-150 flex flex-col justify-between min-h-[96px] group">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center shrink-0 border border-[#c9a84c]/30 group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base sm:text-lg font-black text-white tabular-nums tracking-tight">$0 Gratuito</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">
                  Sin intermediarios ni cobros por gestión
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑAS PRINCIPALES DEL PORTAL CIUDADANO (Visible en Home y Blog para alternar pestañas del portal) */}
      {showPortalTabs && (
        <div id="main-portal-tabs" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-none pt-4 pb-1">
              <button
                onClick={handleConsultasTabClick}
                type="button"
                className={`pt-2.5 pb-4 px-1 text-xs sm:text-sm font-extrabold border-b-4 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  mainTab === 'consultas'
                    ? 'border-[#0a1f42] text-[#0a1f42]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                CONSULTAS Y CHATBOT 24/7
              </button>
              <button
                onClick={handleOficiosTabClick}
                type="button"
                className={`pt-2.5 pb-4 px-1 text-xs sm:text-sm font-extrabold border-b-4 transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  mainTab === 'oficios'
                    ? 'border-[#0a1f42] text-[#0a1f42]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>FORMATOS Y OFICIOS DE LEY</span>
                <span className="bg-red-500 text-white font-black text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full uppercase animate-bounce shrink-0">
                  17 formatos
                </span>
              </button>
              <button
                onClick={handleBlogTabClick}
                type="button"
                className={`pt-2.5 pb-4 px-1 text-xs sm:text-sm font-extrabold border-b-4 transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  mainTab === 'blog'
                    ? 'border-[#0a1f42] text-[#0a1f42]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>BLOG DE GUÍAS PRÁCTICAS</span>
                <span className="bg-emerald-500 text-white font-black text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full uppercase shrink-0">
                  Nuevo
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BREADCRUMBS SEO WIDGET */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 -mb-2">
        <Breadcrumbs
          currentRoute={currentRoute}
          mainTab={mainTab}
          selectedCity={selectedCity}
          selectedProcedure={selectedProcedure}
          selectedPost={selectedPost}
          selectedCategory={selectedSeoCategory}
          selectedSubcategorySlug={selectedSubcategorySlug}
          onNavigateHome={() => {
            setMainTab('consultas');
            setCurrentRoute('home');
            setSelectedProcedure(null);
            setSelectedPost(null);
            setSelectedCity(null);
            setSelectedSeoCategory(null);
            setSelectedSubcategorySlug(null);
            window.history.pushState(null, "Asistente IESS Ecuador - Trámites y Requisitos", "/");
          }}
          onNavigateTab={(tab) => {
            if (tab === 'consultas') handleConsultasTabClick();
            else if (tab === 'oficios') handleOficiosTabClick();
            else if (tab === 'blog') handleBlogTabClick();
          }}
          onNavigateCategory={navigateToCategory}
          onClearProcedure={clearSelectedProcedure}
          onClearPost={clearSelectedBlogPost}
          onClearCity={clearSelectedCity}
        />
      </div>

      {/* MAIN CONTAINER LAYOUT */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col gap-10">
        
        <Suspense fallback={
          <div className="w-full flex justify-center items-center py-20">
            <div className="flex gap-2 items-center font-sans font-extrabold text-sm text-[#0a1f42]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c] animate-bounce"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c] animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c] animate-bounce" style={{ animationDelay: "300ms" }}></span>
              Cargando guía...
            </div>
          </div>
        }>
          {currentRoute === 'tool' && activeTool ? (
            <Tools activeTool={activeTool} />
          ) : activeLegalPage ? (
            <LegalPage activeLegalPage={activeLegalPage} />
          ) : (
            <div className="w-full flex flex-col gap-10 min-w-0">
              {mainTab === 'consultas' ? (
                currentRoute === 'category' && selectedSeoCategory ? (
                  <CategoryPage
                    category={selectedSeoCategory}
                    activeSubcategorySlug={selectedSubcategorySlug}
                    onNavigateToCategory={navigateToCategory}
                    onNavigateToBlogPost={(slug) => {
                      const post = BLOG_POSTS.find(p => p.slug === slug);
                      if (post) {
                        setSelectedPost(post);
                        setCurrentRoute('blog');
                        setMainTab('blog');
                        window.history.pushState(null, post.title, `/blog/${post.slug}`);
                      }
                    }}
                    onConsultChatbot={(query) => {
                      sendMessage(query);
                      if (chatSectionRef.current) {
                        chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    onBackToHome={() => {
                      setSelectedSeoCategory(null);
                      setSelectedSubcategorySlug(null);
                      setCurrentRoute('home');
                      window.history.pushState(null, "Asistente IESS Ecuador - Trámites y Requisitos", "/");
                    }}
                    allCategories={SEO_CATEGORIES}
                  />
                ) : selectedCity ? (
                  <CityPage 
                    selectedCity={selectedCity} 
                    clearSelectedCity={clearSelectedCity}
                    navigateToCity={navigateToCity}
                    onConsultChatbot={(query) => {
                      sendMessage(query);
                      if (chatSectionRef.current) {
                        chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                ) : currentRoute === 'faq' ? (
                  <Faq />
                ) : (
                  <Home 
                    categories={categoriesList}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filteredProcedures={filteredProcedures}
                    onNavigateToProcedure={navigateToProcedure}
                    onNavigateToCity={navigateToCity}
                    onSendMessage={sendMessage}
                    chatSectionRef={chatSectionRef}
                    handleProblemClick={handleProblemClick}
                    handleFrequentProcedureClick={handleFrequentProcedureClick}
                    activeReqTab={activeReqTab}
                    setActiveReqTab={setActiveReqTab}
                    TAB_REQUIREMENTS_DATA={TAB_REQUIREMENTS_DATA}
                    FREQUENT_PROCEDURES={FREQUENT_PROCEDURES}
                    SEO_CATEGORIES={SEO_CATEGORIES}
                    
                    generatorType={generatorType}
                    setGeneratorType={setGeneratorType}
                    copied={copied}
                    setCopied={setCopied}
                    aportesNombre={aportesNombre}
                    setAportesNombre={setAportesNombre}
                    aportesCedula={aportesCedula}
                    setAportesCedula={setAportesCedula}
                    aportesEmpleador={aportesEmpleador}
                    setAportesEmpleador={setAportesEmpleador}
                    aportesFechaInicio={aportesFechaInicio}
                    setAportesFechaInicio={setAportesFechaInicio}
                    aportesFechaFin={aportesFechaFin}
                    setAportesFechaFin={setAportesFechaFin}
                    aportesPeriodos={aportesPeriodos}
                    setAportesPeriodos={setAportesPeriodos}
                    aportesCiudad={aportesCiudad}
                    setAportesCiudad={setAportesCiudad}
                    
                    maternidadNombre={maternidadNombre}
                    setMaternidadNombre={setMaternidadNombre}
                    maternidadCedula={maternidadCedula}
                    setMaternidadCedula={setMaternidadCedula}
                    maternidadEmpleador={maternidadEmpleador}
                    setMaternidadEmpleador={setMaternidadEmpleador}
                    maternidadFechaNacimiento={maternidadFechaNacimiento}
                    setMaternidadFechaNacimiento={setMaternidadFechaNacimiento}
                    maternidadFechaCertificado={maternidadFechaCertificado}
                    setMaternidadFechaCertificado={setMaternidadFechaCertificado}
                    maternidadBanco={maternidadBanco}
                    setMaternidadBanco={setMaternidadBanco}
                    maternidadCuentaType={maternidadCuentaType}
                    setMaternidadCuentaType={setMaternidadCuentaType}
                    maternidadCuentaNum={maternidadCuentaNum}
                    setMaternidadCuentaNum={setMaternidadCuentaNum}
                    maternidadMotivoRetraso={maternidadMotivoRetraso}
                    setMaternidadMotivoRetraso={setMaternidadMotivoRetraso}
                    maternidadCiudad={maternidadCiudad}
                    setMaternidadCiudad={setMaternidadCiudad}
                    
                    chatMessages={chatMessages}
                    chatInput={chatInput}
                    setChatInput={setChatInput}
                    isTyping={isTyping}
                    apiOnline={apiOnline}
                    onClearChat={onClearChat}
                  />
                )
              ) : mainTab === 'oficios' ? (
                <Oficios 
                  selectedOficioId={selectedOficioId}
                  setSelectedOficioId={setSelectedOficioId}
                  oficioFormValues={oficioFormValues}
                  setOficioFormValues={setOficioFormValues}
                  oficioCopied={oficioCopied}
                  setOficioCopied={setOficioCopied}
                  onConsultChatbot={(query) => {
                    sendMessage(query);
                    if (chatSectionRef.current) {
                      chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              ) : (
                selectedPost ? (
                  <BlogPost 
                    post={selectedPost}
                    blogCurrentPage={blogCurrentPage}
                    onClear={clearSelectedBlogPost}
                    onConsultChatbot={(title, prompt) => {
                      handleFrequentProcedureClick(title, prompt);
                    }}
                    allPosts={BLOG_POSTS}
                  />
                ) : (
                  <BlogList 
                    blogSearch={blogSearch}
                    setBlogSearch={setBlogSearch}
                    selectedBlogCategory={selectedBlogCategory}
                    setSelectedBlogCategory={setSelectedBlogCategory}
                    blogCurrentPage={blogCurrentPage}
                    setBlogCurrentPage={setBlogCurrentPage}
                    blogPostsPerPage={blogPostsPerPage}
                    BLOG_POSTS={BLOG_POSTS}
                    navigateToBlogPage={navigateToBlogPage}
                  />
                )
              )}
            </div>
          )}
        </Suspense>
      </main>

      {/* DETAIL MODAL DRAWER FOR SELECTED PROCEDURES */}
      <AnimatePresence>
        {selectedProcedure && (
          <div id="modal-container" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-slate-200"
            >
              <Suspense fallback={
                <div className="p-10 text-center font-sans font-bold text-xs text-[#0a1f42]">
                  Cargando requisitos del trámite...
                </div>
              }>
                <ProcedurePage 
                  procedure={selectedProcedure}
                  onClear={clearSelectedProcedure}
                  onConsultChatbot={(query) => {
                    sendMessage(query);
                    clearSelectedProcedure();
                    if (chatSectionRef.current) {
                      chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              </Suspense>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* DEFERRED FLOATING CHATBOT WIDGET (FAB) */}
      {loadFab && (
        <Suspense fallback={null}>
          <FabChat 
            isOpen={isFabChatOpen}
            setIsOpen={setIsFabChatOpen}
            messages={fabChatMessages}
            input={fabChatInput}
            setInput={setFabChatInput}
            isTyping={isFabTyping}
            onSendMessage={sendFabMessage}
          />
        </Suspense>
      )}

    </div>
  );
}
