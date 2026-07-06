import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  ChevronRight, 
  Building2, 
  ArrowRight, 
  PhoneCall, 
  AlertCircle, 
  HelpCircle, 
  BadgeInfo,
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  CornerDownRight, 
  Info, 
  Send, 
  X, 
  MessageSquare, 
  Heart, 
  AlertTriangle,
  Building,
  RefreshCw,
  Clock,
  UserCheck,
  CreditCard,
  Activity,
  Printer,
  Copy,
  FileText,
  Check,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { PROCEDURES_DATA, Procedure } from "./data/procedures";
import { OFICIOS_TEMPLATES } from "./data/templates";
import { BLOG_POSTS, BlogPost } from "./data/blogPosts";

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
      "Realiza el primer pago de tu planilla correspondiente antes del vencimiento mensual."
    ]
  },
  {
    id: "Cesantía",
    emoji: "💼",
    title: "Cesantía y Seguro Desempleo",
    requirements: [
      "Situación de cesantía legal certificada (mínimo 60 días seguidos sin relación laboral).",
      "Contar con al menos 24 aportes mensuales obligatorios acumulados cronológicamente.",
      "Carga de aviso de salida debidamente realizada por tu último empleador en línea.",
      "Tener la clave de afiliado y usuario del IESS activa y sin suspensiones.",
      "Registrar una cuenta bancaria personal para transferencias, validada ante el IESS.",
      "No tener préstamos quirografarios en mora ni solicitudes de crédito en trámite."
    ],
    steps: [
      "Solicita tu acta de finiquito laboral y comprueba que conste el cese en la plataforma.",
      "Ingresa a iess.gob.ec, 'Servicios en línea' -> 'Asegurados' -> 'Cesantía'.",
      "Digita tus credenciales de afiliado (cédula y contraseña personal).",
      "Consulta el saldo acumulado en tu cuenta individual de fondos de cesantía.",
      "Da clic en la opción 'Solicitar Fondos de Cesantía' y verifica los datos de tu banco.",
      "Acepta electrónicamente las condiciones legales de retiro definitivo.",
      "Haz seguimiento al depósito en tu cuenta bancaria personal (plazo de 3-15 días laborables)."
    ]
  }
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function updateMetaTags(config: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  // Title
  document.title = config.title;
  let titleMeta = document.querySelector('meta[property="og:title"]');
  if (!titleMeta) {
    titleMeta = document.createElement('meta');
    titleMeta.setAttribute('property', 'og:title');
    document.head.appendChild(titleMeta);
  }
  titleMeta.setAttribute('content', config.title);
  
  // Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', config.description);
  
  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-lcespzc3y2p5yn5ey2rbly-34447954721.us-west2.run.app';
  canonical.setAttribute('href', `${origin}${config.url}`);
}

const CIUDAD_FAQS: Record<string, { q: string; a: string }[]> = {
  'quito': [
    { q: '¿Dónde queda la oficina IESS en Quito?', a: 'En Av. Américas y Eloy Alfaro, edificio del IESS.' },
    { q: '¿Cuál es el número de atención IESS Quito?', a: '1800-IESS (1800-4377) - disponible de lunes a viernes.' },
    { q: '¿Cómo puedo agendar un turno para atención médica en Quito?', a: 'Puedes agendar turnos médicos llamando al 140 o directamente ingresando con tu cédula y clave en iess.gob.ec.' }
  ],
  'guayaquil': [
    { q: '¿Dónde queda la oficina principal IESS Guayaquil?', a: 'En el centro de Guayaquil, edificio de la Caja del Seguro (Av. Olmedo y Boyacá) o en el edificio administrativo de la Av. 9 de Octubre.' },
    { q: '¿Cómo solicitar la clave del IESS presencialmente en Guayaquil?', a: 'Acude a las ventanillas de atención al usuario de la Caja del Seguro llevando tu cédula y papeleta de votación.' }
  ],
  'cuenca': [
    { q: '¿Dónde queda la oficina principal del IESS en Cuenca?', a: 'En la calle Huayna Cápac y Alfonso Jerves (Edificio del IESS Cuenca).' },
    { q: '¿Cómo solicitar préstamos quirografarios de forma presencial en Cuenca?', a: 'La solicitud se realiza 100% online en el portal del BIESS, pero puedes recibir soporte técnico personalizado en la oficina de la calle Huayna Cápac.' }
  ],
  'ambato': [
    { q: '¿Dónde se ubica la oficina del IESS en Ambato?', a: 'En las calles Castillo y Olmedo, frente al parque Montalvo.' },
    { q: '¿Qué trámites puedo agendar de forma presencial en Ambato?', a: 'Desbloqueo de claves, registro de cuentas bancarias de afiliados e inicio de trámites de jubilaciones ordinarias.' }
  ],
  'machala': [
    { q: '¿Dónde quedan las oficinas del IESS en Machala?', a: 'En la Av. 25 de Junio y Ayacucho.' },
    { q: '¿Existe atención del Hospital del IESS en Machala?', a: 'Sí, el Hospital General del IESS de Machala se encuentra en la Vía de Integración Lojana para toda clase de especialidades médicas.' }
  ]
};

export default function App() {
  // Advanced Router states
  const [currentRoute, setCurrentRoute] = useState<'home' | 'procedure' | 'blog' | 'faq'>('home');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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

  // FORM GENERATOR STATES (PUNTO 2 Y 3: RECLAMO DE APORTES Y MATERNIDAD)
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

  // Pestaña principal que organiza toda la web (Punto 2 y 3)
  const [mainTab, setMainTab] = useState<'consultas' | 'oficios' | 'blog'>('consultas');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogSearch, setBlogSearch] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>("All");

  // Estado del nuevo Generador integral de 17 Oficios de Ley
  const [selectedOficioId, setSelectedOficioId] = useState<string>("glosa");
  const [oficioFormValues, setOficioFormValues] = useState<Record<string, string>>({});
  const [oficioCopied, setOficioCopied] = useState(false);

  // Auto-cargar valores por defecto de inputs cuando cambia el oficio
  useEffect(() => {
    const template = OFICIOS_TEMPLATES.find(o => o.id === selectedOficioId);
    if (template) {
      const defaults: Record<string, string> = {};
      template.fields.forEach(field => {
        if (field.defaultValue) {
          defaults[field.id] = field.defaultValue;
        } else {
          defaults[field.id] = "";
        }
      });
      setOficioFormValues(defaults);
      setOficioCopied(false);
    }
  }, [selectedOficioId]);

  const formatFecha = (fechaStr: string) => {
    if (!fechaStr) return "";
    const partes = fechaStr.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return fechaStr;
  };

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
  const fabChatEndRef = useRef<HTMLDivElement>(null);

  // Scroll ref for chat
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSectionRef = useRef<HTMLElement>(null);

  // Scroll to bottom of FAB chat
  useEffect(() => {
    if (fabChatEndRef.current) {
      fabChatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [fabChatMessages, isFabTyping]);

  // Check API health status on startup
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setApiOnline(data.api_configured);
      })
      .catch(() => {
        setApiOnline(false); // Fallback to simulation mode if requests fail
      });
  }, []);

  // Advanced dynamic hydration from URL or data attribute on startup
  useEffect(() => {
    const rootEl = document.getElementById("root");
    const dataProcId = rootEl?.getAttribute("data-procedure");
    const dataBlogSlug = rootEl?.getAttribute("data-blog-slug");
    const dataLocation = rootEl?.getAttribute("data-location");
    const dataTab = rootEl?.getAttribute("data-tab");

    const path = window.location.pathname.toLowerCase();

    if (dataProcId) {
      const proc = PROCEDURES_DATA.find(p => p.id === dataProcId);
      if (proc) {
        setSelectedProcedure(proc);
        setCurrentRoute('procedure');
        setMainTab('consultas');
      }
    } else if (dataBlogSlug) {
      const post = BLOG_POSTS.find(p => p.slug === dataBlogSlug);
      if (post) {
        setSelectedPost(post);
        setCurrentRoute('blog');
        setMainTab('blog');
      }
    } else if (dataLocation) {
      setSelectedCity(dataLocation);
      setMainTab('consultas');
      setCurrentRoute('home');
    } else if (dataTab === "blog" || path === "/blog") {
      setMainTab('blog');
      setCurrentRoute('blog');
    } else if (dataTab === "consultas" || path === "/faq") {
      setMainTab('consultas');
      setCurrentRoute('faq');
    } else {
      // Fallback parsing of URL pathname directly
      if (path.startsWith("/procedimiento/")) {
        const slug = path.split("/procedimiento/")[1];
        const proc = PROCEDURES_DATA.find(p => p.id.toLowerCase().replace(/\s+/g, '-') === slug || p.id.toLowerCase() === slug);
        if (proc) {
          setSelectedProcedure(proc);
          setCurrentRoute('procedure');
          setMainTab('consultas');
        }
      } else if (path.startsWith("/blog/")) {
        const slug = path.split("/blog/")[1];
        const post = BLOG_POSTS.find(p => p.slug === slug || p.id === slug);
        if (post) {
          setSelectedPost(post);
          setCurrentRoute('blog');
          setMainTab('blog');
        }
      } else if (path.startsWith("/iess/")) {
        const city = path.split("/iess/")[1];
        if (['quito', 'guayaquil', 'cuenca', 'ambato', 'machala'].includes(city)) {
          setSelectedCity(city);
          setMainTab('consultas');
          setCurrentRoute('home');
        }
      }
    }
  }, []);

  // Popstate history listener for Back/Forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname.toLowerCase();
      if (path === "/" || path === "/home") {
        setCurrentRoute('home');
        setSelectedProcedure(null);
        setSelectedPost(null);
        setSelectedCity(null);
        setMainTab('consultas');
      } else if (path.startsWith("/procedimiento/")) {
        const slug = path.split("/procedimiento/")[1];
        const proc = PROCEDURES_DATA.find(p => p.id.toLowerCase().replace(/\s+/g, '-') === slug || p.id.toLowerCase() === slug);
        if (proc) {
          setSelectedProcedure(proc);
          setSelectedCity(null);
          setCurrentRoute('procedure');
          setMainTab('consultas');
        }
      } else if (path.startsWith("/blog/")) {
        const slug = path.split("/blog/")[1];
        const post = BLOG_POSTS.find(p => p.slug === slug || p.id === slug);
        if (post) {
          setSelectedPost(post);
          setSelectedCity(null);
          setCurrentRoute('blog');
          setMainTab('blog');
        }
      } else if (path.startsWith("/iess/")) {
        const city = path.split("/iess/")[1];
        if (['quito', 'guayaquil', 'cuenca', 'ambato', 'machala'].includes(city)) {
          setSelectedCity(city);
          setSelectedProcedure(null);
          setSelectedPost(null);
          setCurrentRoute('home');
          setMainTab('consultas');
        }
      } else if (path === "/blog") {
        setCurrentRoute('blog');
        setSelectedPost(null);
        setSelectedCity(null);
        setMainTab('blog');
      } else if (path === "/faq") {
        setCurrentRoute('faq');
        setSelectedProcedure(null);
        setSelectedPost(null);
        setSelectedCity(null);
        setMainTab('consultas');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Función para navegar a un procedimiento con pushState y meta tags
  const navigateToProcedure = (procedure: Procedure) => {
    setSelectedProcedure(procedure);
    setCurrentRoute('procedure');
    
    // Update URL para que sea indexable
    window.history.pushState(
      { procedure: procedure.id },
      procedure.title,
      `/procedimiento/${procedure.id.toLowerCase().replace(/\s+/g, '-')}`
    );
    
    // Update meta tags dinámicamente
    updateMetaTags({
      title: `${procedure.title} - IESS Asistente Ecuador`,
      description: `Guía completa sobre ${procedure.title}. Requisitos, pasos y respuestas a dudas frecuentes.`,
      url: `/procedimiento/${procedure.id.toLowerCase().replace(/\s+/g, '-')}`
    });
  };

  // Función para borrar el procedimiento seleccionado y restaurar URL
  const clearSelectedProcedure = () => {
    setSelectedProcedure(null);
    setCurrentRoute('home');
    
    // Restore URL
    window.history.pushState(
      null,
      "Asistente IESS Ecuador - Trámites y Requisitos",
      "/"
    );
    
    // Restore Meta Tags
    updateMetaTags({
      title: "Asistente IESS Ecuador - Trámites y Requisitos",
      description: "Consulta requisitos de jubilación, préstamos quirografarios, hipotecarios, afiliación voluntaria y genera oficios de ley automatizados.",
      url: "/"
    });
  };

  // Función para navegar a un post de blog con pushState y meta tags
  const navigateToBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentRoute('blog');
    
    window.history.pushState(
      { blogSlug: post.slug },
      post.title,
      `/blog/${post.slug}`
    );
    
    updateMetaTags({
      title: `${post.title} | Blog IESSAsistente`,
      description: post.metaDescription,
      url: `/blog/${post.slug}`
    });
  };

  // Función para borrar el post seleccionado y restaurar URL del blog
  const clearSelectedBlogPost = () => {
    setSelectedPost(null);
    setCurrentRoute('blog');
    
    window.history.pushState(
      null,
      "Blog Oficial IESS Ecuador - Guías de Seguridad Social",
      "/blog"
    );
    
    updateMetaTags({
      title: "Blog Oficial IESS Ecuador - Guías de Seguridad Social",
      description: "Encuentra explicaciones sencillas, normativas legales vigentes y guías detalladas para jubilaciones, préstamos BIESS y aportaciones.",
      url: "/blog"
    });
  };

  // Click handlers for tab navigation with history state
  const handleConsultasTabClick = () => {
    setMainTab('consultas');
    setSelectedPost(null);
    setSelectedCity(null);
    setCurrentRoute('home');
    window.history.pushState(null, "Asistente IESS Ecuador - Trámites y Requisitos", "/");
    updateMetaTags({
      title: "Asistente IESS Ecuador - Trámites y Requisitos",
      description: "Consulta requisitos de jubilación, préstamos quirografarios, hipotecarios, afiliación voluntaria y genera oficios de ley automatizados.",
      url: "/"
    });
  };

  const handleOficiosTabClick = () => {
    setMainTab('oficios');
    setSelectedPost(null);
    setSelectedCity(null);
    setCurrentRoute('home');
    window.history.pushState(null, "Formatos y Oficios de Ley IESS - IESSAsistente", "/oficios");
    updateMetaTags({
      title: "Formatos y Oficios de Ley IESS - IESSAsistente",
      description: "Generador inteligente de 17 oficios, apelaciones e impugnaciones de glosas para afiliados y empleadores del IESS.",
      url: "/oficios"
    });
  };

  const handleBlogTabClick = () => {
    setMainTab('blog');
    setSelectedPost(null);
    setSelectedCity(null);
    setCurrentRoute('blog');
    window.history.pushState(null, "Blog Oficial IESS Ecuador - Guías de Seguridad Social", "/blog");
    updateMetaTags({
      title: "Blog Oficial IESS Ecuador - Guías de Seguridad Social",
      description: "Encuentra explicaciones sencillas, normativas legales vigentes y guías detalladas para jubilaciones, préstamos BIESS y aportaciones.",
      url: "/blog"
    });
  };

  const handleFaqClick = () => {
    setMainTab('consultas');
    setSelectedPost(null);
    setSelectedCity(null);
    setCurrentRoute('faq');
    window.history.pushState(null, "Preguntas Frecuentes IESS - Respuestas Rápidas de Seguridad Social", "/faq");
    updateMetaTags({
      title: "Preguntas Frecuentes IESS - Respuestas Rápidas de Seguridad Social",
      description: "Resuelve de forma inmediata tus dudas de trámites, requisitos de afiliación voluntaria, cobro de fondos de reserva, cesantías y cálculo de pensiones.",
      url: "/faq"
    });
  };

  // Función para navegar a una ciudad para SEO local
  const navigateToCity = (city: string) => {
    setSelectedCity(city);
    setSelectedProcedure(null);
    setSelectedPost(null);
    setMainTab('consultas');
    setCurrentRoute('home');

    const cityNameCap = city.charAt(0).toUpperCase() + city.slice(1);
    window.history.pushState(
      { city },
      `IESS ${cityNameCap} - Trámites y Asesoría | IESSAsistente`,
      `/iess/${city}`
    );

    updateMetaTags({
      title: `IESS ${cityNameCap} - Trámites, Requisitos y Oficios | IESSAsistente`,
      description: `Asesoría oficial IESS en ${cityNameCap}. Requisitos de jubilación por vejez, préstamos BIESS, subsidio de maternidad, afiliación voluntaria y oficios automatizados.`,
      url: `/iess/${city}`
    });
  };

  // Función para limpiar la ciudad seleccionada y volver a la home
  const clearSelectedCity = () => {
    setSelectedCity(null);
    window.history.pushState(
      null,
      "Asistente IESS Ecuador - Trámites y Requisitos",
      "/"
    );
    updateMetaTags({
      title: "Asistente IESS Ecuador - Trámites y Requisitos",
      description: "Consulta requisitos de jubilación, préstamos quirografarios, hipotecarios, afiliación voluntaria y genera oficios de ley automatizados.",
      url: "/"
    });
  };

  // Scroll to bottom of chat whenever messages list updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);

  // Categories list
  const categories = ["All", "Jubilación", "Créditos", "Seguros y Subsidios", "Trámites y Afiliación"];

  // Filtered procedures
  const filteredProcedures = PROCEDURES_DATA.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.whoCanDo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle preset shortcut questions for chat
  const handleShortcutClick = (question: string) => {
    sendMessage(question);
  };

  // Triggers chatbot scroll and sends custom complaint instructions
  const handleProblemClick = (problemTitle: string, description: string) => {
    const customPrompt = `Hola. Tengo un problema de "${problemTitle}" (${description}). ¿Cómo puedo solucionarlo y a través de qué canales oficiales del IESS puedo poner una denuncia o reclamo?`;
    sendMessage(customPrompt);
    
    // Smooth scroll to chat section
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Triggers chatbot scroll and sends custom query for frequent procedures
  const handleFrequentProcedureClick = (title: string, prompt: string) => {
    sendMessage(prompt);
    
    // Smooth scroll to chat section
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Send message API
  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

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
      // Keep track of the last few messages for historical context
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
    } catch {
      setIsTyping(false);
      // Offline Simulation fallback mock
      const assistantMsg: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content: "Para confirmar este dato te recomiendo verificar en iess.gob.ec o llamar al 1800-4377 ya que la red fluctuó levemente.",
        timestamp: new Date()
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      sendMessage(chatInput);
    }
  };

  // FLOATING CHAT WIDGET LOGIC
  const sendFabMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

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

  const handleFabFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fabChatInput.trim()) {
      sendFabMessage(fabChatInput);
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased flex flex-col selection:bg-[#c9a84c] selection:text-white overflow-x-hidden w-full">
      
      {/* HEADER: deep navy `#0a1f42` with `#c9a84c` golden accent border */}
      <header id="app-header" className="bg-[#0a1f42] text-white sticky top-0 z-40 shadow-md border-b-4 border-[#c9a84c] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#9a7e36] flex items-center justify-center shadow-lg transform rotate-3">
              <Building2 id="nav-icon" className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#c9a84c] bg-clip-text text-transparent">
                IESS GUÍA
              </span>
              <span className="text-xs block text-slate-300 font-medium tracking-widest pl-0.5">
                CIUDADANO ECUADOR
              </span>
            </div>
          </div>
          
          <nav className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
            <a 
              href="https://www.iess.gob.ec" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-300 hover:text-[#c9a84c] transition-colors flex items-center gap-1 py-1"
            >
              IESS Portal
              <span className="text-[10px] bg-[#0d2a58] px-1.5 py-0.5 rounded text-white font-mono">Oficial</span>
            </a>
            <a 
              href="https://www.biess.fin.ec" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-300 hover:text-[#c9a84c] transition-colors flex items-center gap-1 py-1"
            >
              BIESS Portal
              <span className="text-[10px] bg-[#0d2a58] px-1.5 py-0.5 rounded text-white font-mono">Préstamos</span>
            </a>
          </nav>
        </div>
      </header>

      {/* BANNER DE ALERTA ROJO */}
      <div id="red-alert-banner" className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left transition-all">
          <div className="flex items-center gap-2">
            <span className="bg-white shrink-0 text-red-700 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full uppercase animate-pulse">
              Nuevo
            </span>
            <p className="text-xs sm:text-sm font-semibold tracking-wide">
              El IESS habilitó canales 24/7 para denuncias: <span className="underline font-bold decoration-white/50">denuncias.iess.gob.ec</span> | WhatsApp <span className="underline font-bold">0962532338</span>
            </p>
          </div>
          <div className="flex gap-2">
            <a 
              href="https://denuncias.iess.gob.ec" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[11px] bg-red-800/80 hover:bg-black/20 text-white font-bold py-1 px-3 rounded-md transition-colors border border-white/20 uppercase tracking-wider"
            >
              Ir a Denuncias
            </a>
            <button 
              onClick={() => handleShortcutClick("¿Cómo denunciar un mal servicio en el IESS o falta de atención?")}
              className="text-[11px] bg-white text-red-700 font-bold py-1 px-3 rounded-md hover:bg-slate-100 transition-colors uppercase tracking-wider"
            >
              Consultar Guía
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION DE AZUL */}
      <section id="hero-section" className="bg-gradient-to-b from-[#0a1f42] via-[#0f2d5e] to-[#0a1f42] text-white pt-10 pb-12 sm:pb-16 px-4 relative overflow-hidden">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c9a84c]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-1.5 bg-[#0f2e5c] border border-blue-400/20 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold text-[#c9a84c] mb-4 uppercase tracking-widest mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
            Normativa Nacional Actualizada 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4"
          >
            Tu guía completa para <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#c9a84c] bg-clip-text text-transparent">
              trámites del IESS y BIESS
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed"
          >
            Busca requisitos oficiales, resuelve tus dudas al instante con nuestro Chatbot inteligente de consulta legal y toma el control de tu seguridad social.
          </motion.p>

          {/* BUSCADOR BLANCO */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-2 flex items-center gap-2 border border-slate-200"
          >
            <div className="flex-1 flex items-center pl-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const element = document.getElementById("catalogo-tramites");
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                placeholder="Escribe jubilación, quirografario, afiliación voluntaria..."
                className="w-full text-slate-800 bg-transparent py-2.5 focus:outline-none text-sm placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button 
              onClick={() => {
                const element = document.getElementById("catalogo-tramites");
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-[#0a1f42] hover:bg-[#123162] text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg active:scale-95 duration-100 cursor-pointer"
            >
              Buscar
            </button>
          </motion.div>

          {/* Quick Filter Pill Badges */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setTimeout(() => {
                      const element = document.getElementById("catalogo-tramites");
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 50);
                  }}
                  className={`text-[11px] sm:text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-[#c9a84c] text-[#0a1f42] ring-2 ring-white border-2 border-[#0a1f42] shadow-md transform -translate-y-0.5" 
                      : "bg-white/10 hover:bg-white/20 text-slate-200"
                  }`}
                >
                  {cat === "All" ? "🔍 Todos los Temas" : cat}
                </button>
              );
            })}
          </div>

          {/* 4 ESTADÍSTICAS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 md:mt-12 text-left max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-white/20 transition-all">
              <span className="text-xl sm:text-2xl font-black text-[#c9a84c] block mb-0.5">13+ Trámites</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide">Guías completas paso a paso</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-white/20 transition-all">
              <span className="text-xl sm:text-2xl font-black text-rose-400 block mb-0.5 flex items-center gap-1">
                24/7 Chatbot
              </span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide">Orientación legal inmediata</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-white/20 transition-all">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block mb-0.5">100% Normativa</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide">Apegada a boletines oficiales</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-white/20 transition-all">
              <span className="text-xl sm:text-2xl font-black text-[#c9a84c] block mb-0.5">$0 Gratis</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide">Sin tramitadores ni recargos</span>
            </div>
          </div>
        </div>
      </section>

      {/* PESTAÑAS PRINCIPALES DEL PORTAL CIUDADANO (Punto 5 y 6) */}
      <div id="main-portal-tabs" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-none">
            <button
              onClick={handleConsultasTabClick}
              className={`py-4 px-1 text-xs sm:text-sm font-extrabold border-b-4 transition-all whitespace-nowrap flex items-center gap-2 ${
                mainTab === 'consultas'
                  ? 'border-[#0a1f42] text-[#0a1f42]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Search className="w-4 h-4 text-[#c9a84c]" />
              CONSULTAS Y CHATBOT 24/7
            </button>
            <button
              onClick={handleOficiosTabClick}
              className={`py-4 px-1 text-xs sm:text-sm font-extrabold border-b-4 transition-all whitespace-nowrap flex items-center gap-2 relative ${
                mainTab === 'oficios'
                  ? 'border-[#0a1f42] text-[#0a1f42]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-[#c9a84c]" />
              FORMATOS Y OFICIOS DE LEY
              <span className="bg-red-500 text-white font-black text-[8px] px-1.5 py-0.5 rounded-full uppercase absolute -top-1 -right-4 animate-bounce">
                17 formatos
              </span>
            </button>
            <button
              onClick={handleBlogTabClick}
              className={`py-4 px-1 text-xs sm:text-sm font-extrabold border-b-4 transition-all whitespace-nowrap flex items-center gap-2 relative ${
                mainTab === 'blog'
                  ? 'border-[#0a1f42] text-[#0a1f42]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#c9a84c]" />
              BLOG DE GUÍAS SEO
              <span className="bg-emerald-500 text-white font-black text-[8px] px-1.5 py-0.5 rounded-full uppercase absolute -top-1 -right-4">
                Nuevo
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* BREADCRUMBS SEO WIDGET */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 -mb-2">
        <nav className="flex items-center flex-wrap gap-1 text-xs text-slate-500 font-semibold bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
          <button 
            onClick={() => { 
              setMainTab('consultas'); 
              setCurrentRoute('home'); 
              setSelectedProcedure(null); 
              setSelectedPost(null); 
              setSelectedCity(null); 
              window.history.pushState(null, "Asistente IESS Ecuador - Trámites y Requisitos", "/");
            }} 
            className="hover:text-[#0a1f42] flex items-center gap-1 cursor-pointer transition-colors"
          >
            🏠 Inicio
          </button>
          
          <span className="text-slate-300">/</span>
          
          {mainTab === 'consultas' && currentRoute === 'home' && !selectedCity && (
            <span className="text-[#0a1f42]">Consultas y Chatbot</span>
          )}
          
          {mainTab === 'oficios' && (
            <span className="text-[#0a1f42]">Formatos y Oficios de Ley</span>
          )}

          {mainTab === 'blog' && !selectedPost && (
            <span className="text-[#0a1f42]">Blog de Guías SEO</span>
          )}

          {selectedCity && (
            <>
              <button 
                onClick={() => { 
                  setSelectedCity(null); 
                  window.history.pushState(null, "Asistente IESS Ecuador - Trámites y Requisitos", "/");
                }} 
                className="hover:text-[#0a1f42] cursor-pointer transition-colors"
              >
                Ciudades
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-[#0a1f42]">IESS {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}</span>
            </>
          )}

          {selectedProcedure && (
            <>
              <button 
                onClick={() => { 
                  setSelectedProcedure(null); 
                  setCurrentRoute('home'); 
                  window.history.pushState(null, "Asistente IESS Ecuador - Trámites y Requisitos", "/");
                }} 
                className="hover:text-[#0a1f42] cursor-pointer transition-colors"
              >
                Trámites
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-[#0a1f42] truncate max-w-[200px] sm:max-w-xs">{selectedProcedure.title}</span>
            </>
          )}

          {selectedPost && (
            <>
              <button 
                onClick={() => { 
                  setSelectedPost(null); 
                  setCurrentRoute('blog'); 
                  window.history.pushState(null, "Blog Oficial IESS Ecuador - Guías de Seguridad Social", "/blog");
                }} 
                className="hover:text-[#0a1f42] cursor-pointer transition-colors"
              >
                Blog
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-[#0a1f42] truncate max-w-[200px] sm:max-w-xs">{selectedPost.title}</span>
            </>
          )}
          
          {currentRoute === 'faq' && (
            <span className="text-[#0a1f42]">Preguntas Frecuentes</span>
          )}
        </nav>
      </div>

      {/* MAIN CONTAINER LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: PROCEDURES LIST & SECTIONS */}
        <section className="flex-1 flex flex-col gap-8 min-w-0">
          {mainTab === 'consultas' ? (
            <>
              {/* SECCIÓN SEO LOCAL: CIUDADES DE ECUADOR */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-[#0a1f42] flex items-center gap-2">
                      <span className="text-xl">📍</span>
                      Asesoría y Trámites del IESS por Ciudad
                    </h2>
                    <p className="text-xs text-slate-500">
                      Selecciona una ciudad principal para ver oficinas, horarios y preguntas frecuentes personalizadas de tu región.
                    </p>
                  </div>
                  {selectedCity && (
                    <button
                      onClick={clearSelectedCity}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-[#0a1f42] px-3 py-1.5 rounded-lg font-extrabold transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Quitar Filtro de Ciudad
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {['quito', 'guayaquil', 'cuenca', 'ambato', 'machala'].map((city) => {
                    const isSelected = selectedCity === city;
                    return (
                      <button
                        key={city}
                        onClick={() => navigateToCity(city)}
                        className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#0a1f42] text-white shadow-md transform -translate-y-0.5 border border-[#0a1f42]"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        <span className="text-sm">🏢</span>
                        IESS {city.charAt(0).toUpperCase() + city.slice(1)}
                      </button>
                    );
                  })}
                </div>

                {/* Si hay una ciudad seleccionada, mostramos las preguntas frecuentes personalizadas de esa ciudad */}
                <AnimatePresence mode="wait">
                  {selectedCity && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="mt-5 p-4 sm:p-5 bg-gradient-to-br from-amber-50/40 via-white to-slate-50/30 border border-[#c9a84c]/30 rounded-xl"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">⭐</span>
                        <h3 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wider">
                          Guía Localizada para IESS {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {CIUDAD_FAQS[selectedCity]?.map((faq, i) => (
                          <div key={i} className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 shadow-2xs">
                            <h4 className="text-xs font-extrabold text-[#0a1f42] flex items-start gap-1.5 mb-1.5">
                              <span className="text-[#c9a84c] mt-0.5">❓</span>
                              {faq.q}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed pl-5">
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="text-slate-500 font-medium">
                          Palabras clave locales: <span className="font-bold font-mono text-[10px] text-slate-700">IESS {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}, trámites {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}</span>
                        </div>
                        <button
                          onClick={() => {
                            const query = `Hola. Necesito asesoría específica para trámites del IESS en la ciudad de ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}. ¿Podrías indicarme cómo proceder y qué precauciones tomar en mi localidad?`;
                            sendMessage(query);
                            if (chatSectionRef.current) {
                              chatSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="bg-[#c9a84c] hover:bg-[#b0913b] text-[#0a1f42] font-black py-1.5 px-3.5 rounded-lg transition-all text-xs cursor-pointer"
                        >
                          Consultar al Chatbot sobre {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)} 💬
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SECCIÓN DE 8 TARJETAS DE TRÁMITES FRECUENTES CON EMOJIS */}
              <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
                <span className="text-2xl leading-none">🔥</span>
                Trámites Frecuentes IESS y BIESS
              </h2>
              <p className="text-xs text-slate-500">
                Haz clic en cualquier tarjeta para consultar requisitos, tiempos estimados de atención y guías directamente con el chatbot.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {FREQUENT_PROCEDURES.map((proc, index) => (
                <div
                  key={index}
                  onClick={() => handleFrequentProcedureClick(proc.title, proc.query)}
                  className="bg-white border border-slate-200 p-3 sm:p-3.5 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer group hover:border-[#c9a84c] hover:-translate-y-0.5 duration-150 flex flex-col justify-between h-[125px] relative"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-2xl" role="img" aria-label={proc.title}>
                        {proc.emoji}
                      </span>
                      <span className={`text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded ${
                        proc.timeframe.toLowerCase().includes("inmediato")
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {proc.timeframe}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-[#0a1f42] mt-3 group-hover:text-[#c9a84c] transition-colors leading-tight line-clamp-2">
                      {proc.title}
                    </h3>
                  </div>

                  <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                    Consultar
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN DE REQUISITOS CON 4 PESTAÑAS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
                <span className="text-2xl leading-none">📋</span>
                Guía Rápida de Requisitos y Pasos de Ley
              </h2>
              <p className="text-xs text-slate-500">
                Selecciona una de las 4 categorías principales para consultar requisitos mínimos vigentes y el paso a paso del trámite oficial.
              </p>
            </div>

            {/* Selector de Pestañas */}
            <div className="flex border-b border-slate-100 mb-5 overflow-x-auto gap-1 scrollbar-none">
              {(["Jubilación", "Quirografario", "Afil. Voluntaria", "Cesantía"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveReqTab(tab)}
                  className={`py-2 px-4 text-xs font-bold whitespace-nowrap rounded-t-lg border-b-2 transition-all duration-155 ${
                    activeReqTab === tab
                      ? "border-[#c9a84c] text-[#0a1f42] bg-slate-50/70"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/30"
                  }`}
                >
                  <span className="mr-1.5">
                    {TAB_REQUIREMENTS_DATA.find(t => t.id === tab)?.emoji}
                  </span>
                  {tab}
                </button>
              ))}
            </div>

            {/* Contenedor de Dos Columnas */}
            {(() => {
              const currentData = TAB_REQUIREMENTS_DATA.find((t) => t.id === activeReqTab);
              if (!currentData) return null;
              return (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna 1: Requisitos con ✓ Verde */}
                    <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0a1f42] mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                        <span className="text-emerald-600 font-bold text-sm">✓</span>
                        Requisitos de Ley {activeReqTab}
                      </h3>
                      <ul className="space-y-2">
                        {currentData.requirements.map((req, ridx) => (
                          <li key={ridx} className="text-xs text-slate-750 flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-600 font-extrabold shrink-0 mt-0.5">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Columna 2: Pasos Numerados */}
                    <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0a1f42] mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                        <span className="text-slate-400 font-mono text-xs">#</span>
                        Pasos para Tramitarlo
                      </h3>
                      <ol className="space-y-2.5">
                        {currentData.steps.map((step, sidx) => (
                          <li key={sidx} className="text-xs text-slate-750 flex items-start gap-2.5 leading-relaxed">
                            <span className="w-5 h-5 bg-[#0a1f42] text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              {sidx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Acceso de consulta rápida */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/20 border border-dashed border-amber-200 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-base">💡</span>
                      <span className="text-xs text-[#0a1f42] font-semibold">
                        ¿Tienes dudas específicas sobre {currentData.title}?
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const freqItem = FREQUENT_PROCEDURES.find(f => f.title.includes(activeReqTab) || activeReqTab.includes(f.title));
                        const query = freqItem ? freqItem.query : `Hola, necesito consultar sobre: ${currentData.title}`;
                        handleFrequentProcedureClick(currentData.title, query);
                      }}
                      className="w-full sm:w-auto text-xs font-bold text-white bg-[#0a1f42] hover:bg-[#113160] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      Consultar en Chatbot
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* GENERADOR DE SOLICITUDES Y OFICIOS DE LEY - EVITA TRAMITADORES (PUNTO 2 Y 3) */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/10 border-2 border-[#c9a84c] rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 bg-amber-150 text-[#9c7d31] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                🛡️ Defensa al Ciudadano
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2 animate-pulse">
                <span className="text-2xl leading-none">🛠️</span>
                Formularios y Oficios Libres (Evita Tramitadores)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Muchos "tramitadores" cobran montos abusivos (hasta $35) solo por llenar una carta de reclamo dirigida al IESS. Completa tus datos abajo y genera gratis un oficio formal sustentado en la Constitución y la Ley de Seguridad Social para defender tus derechos de forma 100% gratuita. Por favor, selecciona una categoría:
              </p>
            </div>

            {/* Tabs for Generator Selection */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => { setGeneratorType('aportes'); setCopied(false); }}
                className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  generatorType === 'aportes'
                    ? 'bg-[#0a1f42] text-white border-[#0a1f42] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>📁</span> Reclamo de Aportes Faltantes
              </button>
              <button
                type="button"
                onClick={() => { setGeneratorType('maternidad'); setCopied(false); }}
                className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                  generatorType === 'maternidad'
                    ? 'bg-[#0a1f42] text-white border-[#0a1f42] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>🤰</span> Pago de Subsidio Maternidad
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
              
              {/* Form Input fields (xl:col-span-12 or col-span-5) */}
              <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-4 shadow-xs">
                <div>
                  <h3 className="text-xs font-bold text-slate-705 uppercase tracking-wider mb-3 pb-1.5 border-b border-slate-100 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#c9a84c]" />
                    Rellenar Datos Formulario
                  </h3>

                  {generatorType === 'aportes' ? (
                    // APORTES FORM FIELDS
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Nombre Completo del Afiliado</label>
                        <input
                          type="text"
                          value={aportesNombre}
                          onChange={(e) => setAportesNombre(e.target.value)}
                          placeholder="Ej. Juan Carlos Pérez Mina"
                          className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Cédula de Identidad</label>
                          <input
                            type="text"
                            value={aportesCedula}
                            onChange={(e) => setAportesCedula(e.target.value)}
                            placeholder="Ej. 1712345678"
                            maxLength={10}
                            className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Ciudad de Trámite</label>
                          <input
                            type="text"
                            value={aportesCiudad}
                            onChange={(e) => setAportesCiudad(e.target.value)}
                            placeholder="Ej. Guayaquil"
                            className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Nombre del Empleador o Empresa</label>
                        <input
                          type="text"
                          value={aportesEmpleador}
                          onChange={(e) => setAportesEmpleador(e.target.value)}
                          placeholder="Ej. Corporación Comercial S.A."
                          className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Fecha Inicio Labores</label>
                          <input
                            type="date"
                            value={aportesFechaInicio}
                            onChange={(e) => setAportesFechaInicio(e.target.value)}
                            className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Fecha Fin Labores</label>
                          <input
                            type="date"
                            value={aportesFechaFin}
                            onChange={(e) => setAportesFechaFin(e.target.value)}
                            className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Meses/Periodos Faltantes a Reclamar</label>
                        <input
                          type="text"
                          value={aportesPeriodos}
                          onChange={(e) => setAportesPeriodos(e.target.value)}
                          placeholder="Ej. Enero a Septiembre del 2024 (9 planillas impagas)"
                          className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                        />
                      </div>
                    </div>
                  ) : (
                    // MATERNIDAD FORM FIELDS
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Nombre de la Madre Afiliada</label>
                        <input
                          type="text"
                          value={maternidadNombre}
                          onChange={(e) => setMaternidadNombre(e.target.value)}
                          placeholder="Ej. María Elena Espinel Cruz"
                          className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Cédula de Identidad</label>
                          <input
                            type="text"
                            value={maternidadCedula}
                            onChange={(e) => setMaternidadCedula(e.target.value)}
                            placeholder="Ej. 0912345678"
                            maxLength={10}
                            className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Ciudad de Trámite</label>
                          <input
                            type="text"
                            value={maternidadCiudad}
                            onChange={(e) => setMaternidadCiudad(e.target.value)}
                            placeholder="Ej. Quito"
                            className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Empleador actual</label>
                        <input
                          type="text"
                          value={maternidadEmpleador}
                          onChange={(e) => setMaternidadEmpleador(e.target.value)}
                          placeholder="Ej. Unidad Educativa del Norte"
                          className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Fecha de Nacimiento del Bebé</label>
                          <input
                            type="date"
                            value={maternidadFechaNacimiento}
                            onChange={(e) => setMaternidadFechaNacimiento(e.target.value)}
                            className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Fecha Certificado Médico</label>
                          <input
                            type="date"
                            value={maternidadFechaCertificado}
                            onChange={(e) => setMaternidadFechaCertificado(e.target.value)}
                            className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Tipo Cuenta</label>
                          <select
                            value={maternidadCuentaType}
                            onChange={(e) => setMaternidadCuentaType(e.target.value)}
                            className="w-full text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#0a1f42] bg-white h-[34px]"
                          >
                            <option value="Ahorros">Ahorros</option>
                            <option value="Corriente">Corriente</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Banco Oficial</label>
                          <input
                            type="text"
                            value={maternidadBanco}
                            onChange={(e) => setMaternidadBanco(e.target.value)}
                            placeholder="Ej. Pichincha"
                            className="w-full text-xs border border-slate-250 rounded px-2 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">No. Cuenta</label>
                          <input
                            type="text"
                            value={maternidadCuentaNum}
                            onChange={(e) => setMaternidadCuentaNum(e.target.value)}
                            placeholder="Ej. 220145892"
                            className="w-full text-xs border border-[#cbd5e1] rounded px-2 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Observación o Motivo del Retraso</label>
                        <input
                          type="text"
                          value={maternidadMotivoRetraso}
                          onChange={(e) => setMaternidadMotivoRetraso(e.target.value)}
                          placeholder="Ej. Demora en la validación del certificado físico"
                          className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <div className="text-[10px] text-slate-500 font-medium leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="font-extrabold text-[#0a1f42] block mb-0.5">💡 Utilidad Comprobada:</span>
                    Rellena todos los casilleros de la izquierda y verás cómo redactamos oportunamente la petición formal a la derecha. Ningún intermediario te cobrará de más.
                  </div>
                  
                  {/* Shortcut Button to ask chatbot for assistance with documents */}
                  <button
                    type="button"
                    onClick={() => handleShortcutClick(
                      generatorType === 'aportes' 
                        ? "Hola. Requiero que me orientes sobre los formularios del IESS y qué leyes amparan mi reclamo de aportes faltantes y afiliación laboral retroactiva."
                        : "Hola. Por favor facilítame asistencia sobre la normativa del subsidio de maternidad del IESS, montos de pago y plazos pensionales."
                    )}
                    className="w-full text-[11px] font-extrabold text-[#0a1f42] bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] p-2 rounded transition-colors uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-205"
                  >
                    <span>💬</span> Preguntar normativa al Asistente
                  </button>
                </div>
              </div>

              {/* Document Live Preview Panel (xl:col-span-7) */}
              <div className="xl:col-span-7 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-[#0a1f42] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse"></span>
                      Vista Previa (Oficio del IESS listo)
                    </h3>
                    <div className="flex gap-1.5">
                      {/* Copy Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const fileContent = generatorType === 'aportes' 
                            ? `
${aportesCiudad || "Quito"}, ${new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación Provincial de Afiliación y Control Patronal
Presente.-

Asunto: Solicitud formal de investigación e impugnación por aportes faltantes y falta de registro de afiliación laboral (Glosa Patronal / Art. 67 y 369 de la Constitución)

Yo, ${aportesNombre || "[Tu Nombre Completo]"}, con cédula de ciudadanía No. ${aportesCedula || "[Tu Cédula]"}, en mi calidad de afiliado del IESS, me dirijo a ustedes amparado en el Art. 66 num. 23 de la Constitución de la República del Ecuador (Derecho a dirigir quejas y peticiones formales), y los Arts. 67 y 369 de la norma ibídem que garantizan la seguridad social como un derecho legítimo e irrenunciable.

Por medio de la presente, presento mi reclamo formal y solicito se inicie el proceso administrativo de inspección e investigación laboral al empleador ${aportesEmpleador || "[Nombre del Empleador/Empresa]"}, bajo las siguientes consideraciones de hecho:

1. Relación laboral: Presté mis servicios bajo relación de dependencia laboral para el empleador antes mencionado desde el ${aportesFechaInicio || "[Fecha de Inicio]"} hasta el ${aportesFechaFin || "[Fecha de Fin]"}.
2. Novedad de aportes: Revisando mi historial laboral digital a través del portal oficial iess.gob.ec, he verificado con preocupación de que no constan registradas ni pagadas las aportaciones correspondientes a los periodos: ${aportesPeriodos || "[Meses/Periodos Faltantes]"}.
3. Perjuicios: Esta mora de aportaciones del empleador vulnera directamente mi récord de imposiciones líquidas obligatorias, bloqueando mi ahorro por fondos de reserva y cesantía, y previniendo que precalifique para préstamos quirografarios en el BIESS o futuras jubilaciones ordinarias por vejez, según las Resoluciones C.D. 625 y C.D. 677.

Por lo expuesto, solicito expresamente:
- Se ordene una inspección laboral urgente en las oficinas del empleador para validar la relación laboral descrita.
- Se liquiden y emitan las glosas de cobro, multas e intereses acumulados correspondientes a favor del afiliado perjudicado de acuerdo con el marco legal.
- Se registre oportunamente mi historial de aportaciones retroactivas una vez recaudados los valores de las planillas en mora.

Adjunto copias físicas de soporte:
- Copia de cédula de ciudadanía legible.
- Reporte impreso de historia laboral obtenido en el portal web (iess.gob.ec).
- [Opcional] Pruebas de relación laboral (actas, roles de pago o comprobantes).

Atentamente,

_________________________________________
Firma de Solicitante
Nombre: ${aportesNombre || "[Tu Nombre Completo]"}
C.C.: ${aportesCedula || "[Tu Cédula]"}
                        `
                            : `
${maternidadCiudad || "Quito"}, ${new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación Provincial de Prestaciones de Salud / Subsidios Económicos
Presente.-

Asunto: Solicitud formal de acreditación y pago de subsidio por maternidad en mora (Licencia por ley de 84 días)

Yo, ${maternidadNombre || "[Nombre de la Madre]"}, con cédula No. ${maternidadCedula || "[Tu Cédula]"}, en calidad de afiliada activa, me dirijo a ustedes amparada en los Arts. 35 y 43 de la Constitución de la República del Ecuador (atención prioritaria al subsidio de maternidad, gestación y parto), en concordancia con la Ley de Seguridad Social.

Por medio de este oficio, presento mi reclamo formal y solicito se ordene la inmediata acreditación financiera de mi subsidio de maternidad, considerando:

1. Relación laboral: Presto mis servicios para el empleador ${maternidadEmpleador || "[Nombre del Empleador o Empresa]"} y cumplo con el requisito de 12 aportes mensuales mínimos.
2. Certificado validado: El parto fue el ${maternidadFechaNacimiento || "[Fecha de Parto]"}. El certificado médico que valida mi periodo de licencia temporal y cese de labores fue aprobado con fecha ${maternidadFechaCertificado || "[Fecha de Certificado médica]"}.
3. Cuenta bancaria registrada: Mi cuenta autorizada es de tipo ${maternidadCuentaType || "Ahorros"} No. ${maternidadCuentaNum || "[Número de Cuenta]"} del ${maternidadBanco || "[Institución de la cuenta]"} registrada debidamente.
4. Mora observada: Los fondos no se han transferido a mi cuenta debido al siguiente problema: ${maternidadMotivoRetraso || "[Describa el retraso o falta de pago]"}.

Por lo expresado, ruego a ustedes autorizar la liberación presupuestaria y pago inmediato por transferencia a mi cuenta bancaria.

Adjunto como soportes:
- Copia legible de cédula.
- Acta de nacimiento / Nacido vivo emitido por el Registro Civil.
- Certificado médico del IESS de validación aprobado.
- Certificado bancario de cuenta activa.

Atentamente,

_________________________________________
Firma de Madre Afiliada
Nombre: ${maternidadNombre || "[Nombre de la Madre]"}
C.C.: ${maternidadCedula || "[Tu Cédula]"}
                        `;
                          navigator.clipboard.writeText(fileContent.trim());
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="bg-slate-100 hover:bg-[#c9a84c] hover:text-white text-slate-705 text-[11px] font-bold py-1 px-3 rounded flex items-center gap-1.5 transition-all border border-slate-200"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ¡Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copiar Texto
                          </>
                        )}
                      </button>
                      {/* Print button */}
                      <button
                        type="button"
                        onClick={() => {
                          window.print();
                        }}
                        className="bg-[#0a1f42] hover:bg-slate-800 text-white text-[11px] font-bold py-1 px-3 rounded flex items-center gap-1.5 transition-all border border-[#0a1f42]"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#c9a84c]" />
                        Imprimir
                      </button>
                    </div>
                  </div>

                  {/* Styled Letter Sandbox / Card Document View */}
                  <div className="bg-white border-2 border-slate-200 rounded-xl shadow-inner p-5 text-slate-800 text-[11px] font-serif leading-relaxed h-[350px] overflow-y-auto relative scrollbar-thin">
                    {/* Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none text-center">
                      <div className="w-32 h-32 rounded-full border-4 border-slate-900 flex items-center justify-center text-4xl p-1 font-sans font-black">
                        IESS
                      </div>
                      <span className="text-[9px] font-sans font-black uppercase tracking-widest mt-1 block">TRÁMITE CIUDADANO</span>
                    </div>

                    <div className="relative space-y-3.5 font-sans select-text">
                      
                      {/* Date Block */}
                      <p className="text-right font-medium text-slate-600">
                        {generatorType === 'aportes' ? (aportesCiudad || "Quito") : (maternidadCiudad || "Quito")}, 
                        {" "}{new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>

                      {/* Sender block */}
                      <div className="font-bold space-y-0.5 uppercase tracking-wide text-slate-800">
                        <p>Señores</p>
                        <p className="text-[#0a1f42] text-xs font-black">DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)</p>
                        <p className="text-[10px] text-[#c9a84c] font-bold">
                          {generatorType === 'aportes' 
                            ? "Coordinación Provincial de Afiliación y Control de Obligaciones"
                            : "Coordinación Provincial de Subsidios y Prestaciones Económicas"
                          }
                        </p>
                        <p className="text-slate-500 font-normal">Presente.-</p>
                      </div>

                      {/* Sub block */}
                      <p className="font-extrabold text-slate-900 border-l-2 border-[#c9a84c] pl-2 text-[10.5px]">
                        ASUNTO:{" "}
                        {generatorType === 'aportes'
                          ? `Solicitud formal de investigación e impugnación de aportes patronales faltantes para el afiliado ${aportesNombre || "[Tu Nombre]"}`
                          : `Solicitud de acreditación oficial de subsidio de maternidad para la asegurada ${maternidadNombre || "[Tu Nombre]"}`
                        }
                      </p>

                      {/* Greeting & Intro */}
                      <p className="text-justify leading-snug">
                        Yo, <span className="font-bold border-b border-slate-350 pb-px">{generatorType === 'aportes' ? (aportesNombre || "_____________________") : (maternidadNombre || "_____________________")}</span>, 
                        con cédula de identidad No. <span className="font-bold font-mono bg-slate-50 px-1 rounded">{generatorType === 'aportes' ? (aportesCedula || "__________") : (maternidadCedula || "__________")}</span>, 
                        en pleno goce de mis derechos constitucionales y en mi calidad de afiliado, me dirijo a sus dignas autoridades amparado en el 
                        <span className="font-semibold text-[#0a1f42]"> Art. 66 numeral 23 de la Constitución de la República del Ecuador </span> 
                        (petición individual y reclamo de ley) y los artículos 67 y 369 de nuestra carta magna de seguridad social.
                      </p>

                      {/* Body Considerations */}
                      {generatorType === 'aportes' ? (
                        <div className="space-y-2 text-justify leading-snug">
                          <p>
                            Presento un reclamo de aportes contra mi empleador 
                            {" "}<span className="font-bold text-slate-900">{aportesEmpleador || "[Nombre del Empleador o Empresa]"}</span>, fundamentando las novedades:
                          </p>
                          <div className="pl-3 space-y-1 bg-slate-50 border-l-2 border-slate-200 py-1 rounded">
                            <p>
                              • <span className="font-semibold">Lapso laboral:</span> Desde el 
                              {" "}<span className="font-bold font-mono">{aportesFechaInicio || "___/___/____"}</span> hasta el <span className="font-bold font-mono">{aportesFechaFin || "___/___/____"}</span>.
                            </p>
                            <p>
                              • <span className="font-semibold">Periodos impagos:</span> Al revisar mi historia laboral en el portal del IESS se constata la total falta de registro laboral retroactivo en: 
                              {" "}<span className="font-bold text-red-700">{aportesPeriodos || "[Describa meses faltantes (ej: Enero a Noviembre 2024)]"}</span>.
                            </p>
                          </div>
                          <p>
                            Esta mora vulnera de forma absoluta mi derecho al fondo de reserva, cesantías parciales e historial de aportes mínimos para préstamos de vivienda del BIESS o jubilación de invalidez y vejez conforme las Resoluciones C.D. 625 y C.D. 677.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-justify leading-snug">
                          <p>
                            Solicito la acreditación efectiva correspondientes a mi licencia médica de maternidad por 84 días frente a mi empleador 
                            {" "}<span className="font-bold text-slate-900">{maternidadEmpleador || "[Nombre del Empleador o Empresa]"}</span>, de acuerdo a la ley:
                          </p>
                          <div className="pl-3 space-y-1 bg-slate-50 border-l-2 border-slate-200 py-1 rounded">
                            <p>
                              • <span className="font-semibold">Fecha Parto:</span> Sucedido el día <span className="font-bold font-mono">{maternidadFechaNacimiento || "___/___/____"}</span>.
                            </p>
                            <p>
                              • <span className="font-semibold">Validación Médica del IESS:</span> Certificado emitido en fecha <span className="font-bold font-mono">{maternidadFechaCertificado || "___/___/____"}</span>.
                            </p>
                            <p>
                              • <span className="font-semibold">Depósito solicitado:</span> Cuenta de <span className="font-bold font-mono">{maternidadCuentaType}</span> No. <span className="font-bold font-mono">{maternidadCuentaNum || "_______________"}</span> del Banco/Cooperativa <span className="font-bold">{maternidadBanco || "_______________"}</span>.
                            </p>
                            <p>
                              • <span className="font-semibold">Inconveniente de cobro:</span> {maternidadMotivoRetraso || "[Describa la traba del sistema, ej: falta de planilla o demora técnica de acreditación]"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Ask/Petición block */}
                      <div className="space-y-1 leading-snug">
                        <p className="font-extrabold text-[#0a1f42] text-[10px] tracking-wide uppercase">PETICIÓN FORMAL REGLAMENTARIA:</p>
                        <p className="text-justify text-slate-700">
                          {generatorType === 'aportes' 
                            ? "Solicito encarecidamente se catalogue una inspección patronal técnica en el domicilio fiscal de la empresa, emitiendo glosas acumuladas de cobro con intereses correspondientes y asentándose las imposiciones legalmente debidas."
                            : "Solicito que se agilice la liberación de fondos del subsidio de maternidad correspondiente y se disponga de inmediato la transferencia oficial a mi cuenta bancaria debidamente validada."
                          }
                        </p>
                      </div>

                      {/* Attachments */}
                      <p className="text-[10px] text-slate-400 italic">
                        * Se anexan justificativos de cédula física, historia laboral, partida de nacido vivo, libreta de ahorros e informe de consulta del IESS.
                      </p>

                      {/* Closing & Signatures */}
                      <div className="pt-4 text-center space-y-1 font-sans">
                        <p>Atentamente,</p>
                        <div className="w-40 h-px bg-slate-300 mx-auto my-5"></div>
                        <p className="font-extrabold uppercase text-slate-800">{generatorType === 'aportes' ? (aportesNombre || "_____________________") : (maternidadNombre || "_____________________")}</p>
                        <p className="text-[9px] text-slate-500 font-mono">CÉDULA: {generatorType === 'aportes' ? (aportesCedula || "__________") : (maternidadCedula || "__________")}</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Friendly tips for submission */}
                <div className="mt-3 bg-blue-50/70 border border-blue-150 p-2.5 rounded-lg flex items-start gap-2 text-[10.5px] text-[#0a1f42]">
                  <span className="text-base shrink-0">📍</span>
                  <div>
                    <span className="font-bold block">Pasos para realizar el trámite presencial en 5 minutos:</span>
                    <ol className="list-decimal pl-3.5 space-y-0.5 mt-0.5 font-medium text-slate-700">
                      <li>Haz clic en <span className="font-bold uppercase text-[#0a1f42]">"Copiar Texto"</span> e ingresa en Microsoft Word o Google Docs en tu computadora, luego imprímelo en dos ejemplares.</li>
                      <li>Firma ambas hojas. Lleva ambas copias físicas al <span className="font-bold">Centro de Atención Universal</span> del IESS más cercano.</li>
                      <li>Entrega el documento en la ventanilla de <span className="font-bold">Recepción de Correspondencia (Ventanilla de Ofidios)</span>. Recuerda conservar la copia que te sellen como fecha de recibido.</li>
                    </ol>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          {/* PROCEDURES EXPLORER GRID */}
          <div id="catalogo-tramites" className="scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
                  <BadgeInfo className="w-5 h-5 text-[#c9a84c]" />
                  Catálogo de Trámites y Coberturas del IESS
                </h2>
                <p className="text-xs text-slate-500">Selecciona un tema o escribe en el buscador para ver requisitos y guías paso a paso.</p>
              </div>
              <span className="text-xs font-black bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200">
                Mostrando {filteredProcedures.length} de {PROCEDURES_DATA.length}
              </span>
            </div>

            {/* Inline Connected Categories / Themes Selector */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 bg-slate-50 border border-slate-200 p-2 rounded-xl">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[11px] sm:text-xs font-extrabold px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0a1f42] text-white shadow-sm ring-2 ring-[#c9a84c]/50"
                        : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {cat === "All" ? "🔍 Todos los Temas" : cat}
                  </button>
                );
              })}
            </div>

            {filteredProcedures.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700 mb-1">No se encontraron trámites</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                  Prueba buscando otra palabra clave como "jubilación", "biess", o "enfermedad". También puedes consultar directamente al Chatbot.
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="text-xs bg-[#0a1f42] text-white py-2 px-4 rounded-md font-bold hover:bg-[#113160] transition-colors"
                >
                  Restaurar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProcedures.map((proc) => (
                  <motion.div 
                    layout
                    key={proc.id}
                    onClick={() => navigateToProcedure(proc)}
                    className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-[#c9a84c] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group h-full relative overflow-hidden"
                  >
                    {/* Badge of category */}
                    <div>
                      <span className="inline-block text-[10px] uppercase font-extrabold tracking-wider text-[#0a1f42] bg-[#f0f4fa] px-2.5 py-0.5 rounded-full mb-3">
                        {proc.category}
                      </span>
                      <h3 className="text-base font-bold text-[#0a1f42] group-hover:text-[#c9a84c] transition-colors mb-2 line-clamp-1">
                        {proc.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {proc.whoCanDo}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <span className="text-[#c9a84c] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-[#c9a84c]" />
                        {proc.requirements.length} Requisitos
                      </span>
                      <span className="text-[#0a1f42] group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                        Ver Guía
                        <ChevronRight className="w-4 h-4 shrink-0 text-[#c9a84c]" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* SECCIÓN CON 8 TARJETAS DE PROBLEMAS COMUNES CON BORDE ROJO IZQUIERDO */}
          <div className="mt-2">
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#0a1f42] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Problemas Comunes: ¿Cómo actuar?
              </h2>
              <p className="text-xs text-slate-500">¿Sufres alguna de estas situaciones en el IESS? Haz clic en la tarjeta para indicarle al Asistente y obtener solución inmediata.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Tarjeta 1 */}
              <div 
                onClick={() => handleProblemClick("Demoras en citas médicas", "Tiempos excesivos para agendamiento o retrasos severos en sala de espera de consulta externa")}
                className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Citas y Atención</span>
                    <Activity className="w-4 h-4 text-red-500 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                    1. Demoras en citas médicas
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Tiempos de espera excesivos para ser atendido por un especialista o agendar consulta externa.
                  </p>
                </div>
                <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
                  Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Tarjeta 2 */}
              <div 
                onClick={() => handleProblemClick("Falta de medicamentos", "Desabastecimiento de recetas médicas básicas o insumos terapéuticos obligatorios")}
                className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Farmacia IESS</span>
                    <Clock className="w-4 h-4 text-red-500 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                    2. Falta de medicamentos
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Falta de abastecimiento en farmacias IESS de fármacos básicos o tratamientos continuos.
                  </p>
                </div>
                <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
                  Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Tarjeta 3 */}
              <div 
                onClick={() => handleProblemClick("Glosas y multas injustas del IESS", "Notificaciones de cobros de glosas, sanciones o multas improcedentes emitidas a empleadores")}
                className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Empleadores</span>
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                    3. Glosas y multas injustas
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Responsabilidad patronal, planillas incorrectas o resoluciones sancionatorias no válidas de la directiva.
                  </p>
                </div>
                <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
                  Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Tarjeta 4 */}
              <div 
                onClick={() => handleProblemClick("Aportes que no aparecen en tu historia laboral", "Falta de visualización de imposiciones devengadas o aportes patronales pagados")}
                className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Afiliados</span>
                    <UserCheck className="w-4 h-4 text-red-500 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                    4. Aportes no reflejados
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Meses laborados y aportados que no constan registrados en tu historial laboral digital del portal.
                  </p>
                </div>
                <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
                  Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Tarjeta 5 */}
              <div 
                onClick={() => handleProblemClick("Subsidio de maternidad no cobrado", "Demora persistente en el desembolso o la acreditación monetaria del subsidio de maternidad")}
                className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Subsidios</span>
                    <CreditCard className="w-4 h-4 text-red-500 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                    5. Subsidio de maternidad
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Trámite aprobado por licencia médica pero sin acreditación de fondos en tu cuenta bancaria registrada.
                  </p>
                </div>
                <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
                  Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Tarjeta 6 */}
              <div 
                onClick={() => handleProblemClick("Pensión de montepío sin tramitar", "Retrasos excesivos o trabas burocráticas en reclamo de montepío o herencias")}
                className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Montepío</span>
                    <Building className="w-4 h-4 text-red-500 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                    6. Pensión de montepío
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Retraso para heredar los derechos pensionales del familiar titular fallecido por temas documentales.
                  </p>
                </div>
                <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
                  Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Tarjeta 7 */}
              <div 
                onClick={() => handleProblemClick("Citas canceladas sin aviso", "Turno de atención con médico del IESS cancelado sin notificación ni justificación")}
                className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Atención Médica</span>
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                    7. Citas canceladas sin aviso
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    La cita programada fue anulada o postergada de imprevisto sin aviso por SMS, teléfono o correo.
                  </p>
                </div>
                <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
                  Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Tarjeta 8 */}
              <div 
                onClick={() => handleProblemClick("Trámites sin respuesta en meses", "Lapsos excesivos congelados en solicitudes de asignación de fondos o prestaciones")}
                className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Trámites Virtuales</span>
                    <RefreshCw className="w-4 h-4 text-red-500 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                    8. Trámites sin respuesta
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Solicitudes de cesantía, precalificación quirografaria o jubilación totalmente congeladas.
                  </p>
                </div>
                <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
                  Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

            </div>

            {/* SECCIÓN DE CANALES DE QUEJAS - FONDO AZUL MARINO */}
            <div className="bg-[#0a1f42] border border-[#1b3154] rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden mt-6">
              {/* Ambient subtle glow background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c] opacity-5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="mb-4">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#c9a84c] bg-amber-500/10 px-2 py-0.5 rounded border border-[#c9a84c]/20 inline-block mb-1.5">
                  🔴 Canales Oficiales 2026
                </span>
                <h2 className="text-base sm:text-lg font-extrabold flex items-center gap-2 text-white">
                  Canales de Quejas y Denuncias IESS
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mt-1">
                  La directiva nacional del IESS pone a disposición canales digitales y presenciales para reportar mala atención, falta de insumos, o cobros indebidos de forma 100% confidencial.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                
                {/* Tarjeta 1 - Portal Web */}
                <div 
                  onClick={() => handleFrequentProcedureClick("Denuncia Portal Web", "Hola. Deseo saber cómo poner una denuncia en línea a través del Portal Web de denuncias del IESS (denuncias.iess.gob.ec), qué datos me van a solicitar y qué tipo de irregularidades o problemas médicos/administrativos puedo reportar.")}
                  className="bg-[#112444] border border-[#1d335c] rounded-xl p-3 hover:border-[#c9a84c] hover:bg-[#152c53] transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">💻</span>
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/20">24/7 ONLINE</span>
                    </div>
                    <h3 className="text-xs font-bold text-white mt-2.5 group-hover:text-[#c9a84c] transition-colors">
                      Portal Web Oficial
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug mt-1">
                      denuncias.iess.gob.ec para reportes en el sitio web de atención directa.
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2">
                    Ver guía de denuncia <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Tarjeta 2 - WhatsApp */}
                <div 
                  onClick={() => handleFrequentProcedureClick("Denuncia WhatsApp", "Hola. Necesito información sobre cómo funciona el chatbot oficial de denuncias de WhatsApp del IESS en el número 0962532338. ¿Qué puedo reportar por ahí y qué datos son confidenciales?")}
                  className="bg-[#112444] border border-[#1d335c] rounded-xl p-3 hover:border-[#c9a84c] hover:bg-[#152c53] transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">💬</span>
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/20">CHAT BOT</span>
                    </div>
                    <h3 className="text-xs font-bold text-white mt-2.5 group-hover:text-[#c9a84c] transition-colors">
                      Chat de WhatsApp
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug mt-1">
                      Número 0962532338 habilitado para recepcionar denuncias vía chat de texto de manera inmediata.
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2">
                    Ver guía de denuncia <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Tarjeta 3 - Teléfono */}
                <div 
                  onClick={() => handleFrequentProcedureClick("Contacto Telefónico", "Hola. Quiero saber cuál es el canal telefónico oficial del IESS para presentar quejas, cuál es el número y el horario de atención para ayuda directa.")}
                  className="bg-[#112444] border border-[#1d335c] rounded-xl p-3 hover:border-[#c9a84c] hover:bg-[#152c53] transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">📞</span>
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20">1800-IESS</span>
                    </div>
                    <h3 className="text-xs font-bold text-white mt-2.5 group-hover:text-[#c9a84c] transition-colors">
                      Línea Gratuita
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug mt-1">
                      Llama sin costo al número de teléfono nacional: 1800-4377 para soporte directo.
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2">
                    Ver guía de denuncia <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Tarjeta 4 - Presencial */}
                <div 
                  onClick={() => handleFrequentProcedureClick("Denuncia Presencial", "Hola. Necesito saber cómo y dónde presentar una queja o denuncia formal de forma presencial en las oficinas del IESS, horario de atención y qué documentos llevar.")}
                  className="bg-[#112444] border border-[#1d335c] rounded-xl p-3 hover:border-[#c9a84c] hover:bg-[#152c53] transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🏢</span>
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20">PRESENCIAL</span>
                    </div>
                    <h3 className="text-xs font-bold text-white mt-2.5 group-hover:text-[#c9a84c] transition-colors">
                      Centros de Atención
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug mt-1">
                      Acude a los Centros de Atención Universal a nivel nacional (lun-vie, 08:00 - 17:00).
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2">
                    Ver guía de denuncia <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            </div>
          </div>
            </>
          ) : mainTab === 'oficios' ? (
            <div className="space-y-6">
              {/* BRANDING FORMULARIOS COMPLETOS */}
              <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 border-2 border-[#c9a84c] rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⚖️</span>
                      <h2 className="text-xl font-extrabold text-[#0a1f42]">
                        Generador Integral de Oficios y Peticiones de Ley
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                      ¿Sabías que muchos "tramitadores" afuera de los Centros de Atención cobran de $15 a $35 solo por llenar solicitudes básicas? Con nuestra herramienta gratuita, genera oficios formales sustentados en la Constitución del Ecuador y la normativa del IESS para ejercer tus derechos de forma 100% gratuita y sin intermediarios.
                    </p>
                  </div>
                  <div className="bg-[#0a1f42] text-white rounded-lg px-4 py-2 text-center shrink-0 shadow-sm border border-slate-800">
                    <span className="block text-lg font-black text-[#c9a84c]">17</span>
                    <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-300">Formatos Oficiales</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
                  {/* Selector de Trámite en Sidebar */}
                  <div className="xl:col-span-5 space-y-4">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-650 mb-2">
                        1. Selecciona el trámite de tu interés:
                      </label>
                      <select
                        value={selectedOficioId}
                        onChange={(e) => setSelectedOficioId(e.target.value)}
                        className="w-full text-xs font-bold border-2 border-[#0a1f42] rounded-xl px-3 py-2.5 bg-white text-[#0a1f42] focus:outline-none focus:ring-2 focus:ring-[#0a1f42]/20 h-11"
                      >
                        <optgroup label="💼 Afiliación, Glosas y Cartera">
                          <option value="glosa">Impugnación de Glosa Patronal (20 días)</option>
                          <option value="aportes">Reclamo de Aportes Faltantes</option>
                          <option value="convenioPago">Convenio de Pago y Exoneración</option>
                          <option value="fallaSistema">Fallas del Sistema Informático</option>
                        </optgroup>
                        <optgroup label="🤰 Salud, Maternidad y Subsidios">
                          <option value="maternidad">Subsidio de Maternidad (84 días)</option>
                          <option value="enfermedadSubsidio">Subsidio por Enfermedad Común/Accidente</option>
                          <option value="aportesExceso">Devolución de Aportes en Exceso</option>
                          <option value="quejaMedica">Cambio de Médico o Queja Médica</option>
                        </optgroup>
                        <optgroup label="👴 Jubilación y Pensiones">
                          <option value="montepio">Pensión de Montepío (Fallecimiento)</option>
                          <option value="prejubilacion">Pre-Jubilación Ordinaria</option>
                          <option value="jubilacionCatastrofica">Jubilación por Enfermedad Catastrófica</option>
                        </optgroup>
                        <optgroup label="💰 Préstamos y Cesantía (BIESS)">
                          <option value="quirografario">Préstamo Quirografario (Auditoría Previa)</option>
                          <option value="cesantia">Retiro de Cesantía por Desempleo</option>
                        </optgroup>
                        <optgroup label="📋 Trámites Generales y Beneficios">
                          <option value="actualizacion">Actualización de Datos Personales</option>
                          <option value="moraSubsidios">Reclamo por Mora en Subsidios/Pensiones</option>
                          <option value="beneficiarios">Inscripción / Retiro de Beneficiarios</option>
                          <option value="ceseVoluntario">Cese de Afiliación Voluntaria</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Mostrar Base Legal del Oficio seleccionado */}
                    {(() => {
                      const curOficio = OFICIOS_TEMPLATES.find(o => o.id === selectedOficioId);
                      if (!curOficio) return null;
                      return (
                        <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0a1f42] uppercase">
                            <span>🛡️</span> Fundamento Legal del Oficio:
                          </div>
                          <ul className="space-y-1.5">
                            {curOficio.laws.split(", ").map((law, lidx) => (
                              <li key={lidx} className="text-[10.5px] leading-relaxed text-slate-700 flex items-start gap-1.5">
                                <span className="text-amber-500 shrink-0 select-none">•</span>
                                <span>{law}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })()}

                    {/* FORMULARIO DINÁMICO */}
                    {(() => {
                      const curOficio = OFICIOS_TEMPLATES.find(o => o.id === selectedOficioId);
                      if (!curOficio) return null;
                      return (
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3.5 text-left">
                          <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#0a1f42] border-b border-slate-100 pb-2 flex items-center gap-1.5">
                            <span>✍️</span> Datos Necesarios del Trámite
                          </h3>
                          <div className="space-y-3.5">
                            {curOficio.fields.map((field) => (
                              <div key={field.id} className="space-y-1">
                                <label className="block text-[10px] font-extrabold uppercase tracking-wide text-slate-600 font-sans">
                                  {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                {field.type === "select" ? (
                                  <select
                                    value={oficioFormValues[field.id] || field.defaultValue || ""}
                                    onChange={(e) => setOficioFormValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                                    className="w-full text-xs border border-slate-205 rounded-lg px-2.5 py-1.5 bg-white font-medium font-sans focus:ring-1 focus:ring-[#0a1f42] focus:border-[#0a1f42] h-9"
                                  >
                                    {field.options?.map((opt) => (
                                      <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                  </select>
                                ) : field.type === "date" ? (
                                  <input
                                    type="date"
                                    value={oficioFormValues[field.id] || ""}
                                    onChange={(e) => setOficioFormValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                                    className="w-full text-xs border border-slate-205 rounded-lg px-2.5 py-1.5 bg-white font-medium font-sans focus:ring-1 focus:ring-[#0a1f42] focus:border-[#0a1f42]"
                                  />
                                ) : (
                                  <input
                                    type={field.type || "text"}
                                    value={oficioFormValues[field.id] || ""}
                                    placeholder={field.placeholder}
                                    maxLength={field.maxLength}
                                    onChange={(e) => setOficioFormValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                                    className="w-full text-xs border border-slate-205 rounded-lg px-2.5 py-1.5 bg-white font-medium font-sans focus:ring-1 focus:ring-[#0a1f42] focus:border-[#0a1f42]"
                                  />
                                )}
                                {field.description && (
                                  <p className="text-[9px] text-slate-400 italic mt-0.5">{field.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                handleShortcutClick(
                                  `Hola. Necesito ayuda para tramitar: ${curOficio.name}. ¿Cuáles son los requisitos obligatorios anexos y qué leyes me respaldan?`
                                );
                              }}
                              className="w-full bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-[10px] font-extrabold text-[#0a1f42] py-2 rounded-lg transition-colors uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-200"
                            >
                              <span>💬</span> Consultar en el Chatbot
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* VISTA PREVIA DEL DOCUMENTO DE LEY (lado derecho) */}
                  <div className="xl:col-span-7 flex flex-col justify-between space-y-4">
                    {(() => {
                      const curOficio = OFICIOS_TEMPLATES.find(o => o.id === selectedOficioId);
                      if (!curOficio) return null;
                      
                      // Preprarar los valores formateando las fechas antes de enviarlas al generateText
                      const preparedValues: Record<string, string> = { ...oficioFormValues };
                      curOficio.fields.forEach(field => {
                        if (field.type === "date" && preparedValues[field.id]) {
                          preparedValues[field.id] = formatFecha(preparedValues[field.id]);
                        }
                      });

                      const docContent = curOficio.generateText(preparedValues, formatFecha);

                      return (
                        <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                          {/* Botones de Acción */}
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-150">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 border px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse"></span>
                              Solicitud en Vivo
                            </span>
                            <div className="flex gap-2 font-sans">
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(docContent.trim());
                                  setOficioCopied(true);
                                  setTimeout(() => setOficioCopied(false), 2000);
                                }}
                                className="bg-slate-100 hover:bg-[#c9a84c] hover:text-white text-slate-700 text-[10.5px] font-extrabold py-1 px-2.5 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                              >
                                {oficioCopied ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ¡COPIADO!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    COPIAR TEXTO
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  window.print();
                                }}
                                className="bg-[#0a1f42] hover:bg-slate-800 text-white text-[10.5px] font-extrabold py-1 px-2.5 rounded-lg border border-[#0a1f42] transition-colors flex items-center gap-1"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                IMPRIMIR
                              </button>
                            </div>
                          </div>

                          {/* Hoja de Oficio Terminado */}
                          <div className="bg-slate-50 border-2 border-slate-250 rounded-xl p-5 font-serif text-[11px] leading-relaxed text-slate-800 h-[450px] overflow-y-auto relative shadow-inner select-text scrollbar-thin">
                            {/* Watermark */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none text-center">
                              <div className="w-32 h-32 rounded-full border-4 border-slate-900 flex items-center justify-center text-4xl p-1 font-sans font-black">
                                IESS
                              </div>
                              <span className="text-[9px] font-sans font-black uppercase tracking-widest mt-1 block">TRÁMITE CIUDADANO</span>
                            </div>

                            <p className="whitespace-pre-wrap relative font-sans">{docContent}</p>
                          </div>

                          {/* Diagnóstico y Próximos Pasos de Ley */}
                          <div className="mt-4 bg-slate-50 border-l-4 border-l-[#0a1f42] p-3.5 rounded-r-xl space-y-2 font-sans">
                            <div className="flex items-center gap-1.5 text-xs font-black text-[#0a1f42] uppercase tracking-wider">
                              <span>📍</span> Diagnóstico de su caso y Pasos para Radicarlo:
                            </div>
                            <div className="text-[10.5px] leading-relaxed text-slate-700 space-y-1">
                              <p>
                                <span className="font-extrabold text-[#0a1f42]">Trámite:</span> {curOficio.name}
                              </p>
                              {curOficio.timeframe && (
                                <p>
                                  <span className="font-extrabold text-[#0a1f42]">Plazo Reglamentario:</span> {curOficio.timeframe}
                                </p>
                              )}
                              <p className="font-semibold text-slate-800">Próximos pasos recomendados:</p>
                              <ol className="list-decimal pl-4 space-y-1 text-slate-650 font-medium">
                                <li>Haz clic en <span className="font-bold uppercase text-[#0a1f42] text-[9.5px]">"Copiar Texto"</span> e ingresa en Microsoft Word o Google Docs para imprimirlo en <span className="font-extrabold">original y copia</span>.</li>
                                <li>Firma de puño y letra ambas copias físicas.</li>
                                <li>Acude al <span className="font-semibold text-slate-800">Centro de Atención Universal</span> del IESS de tu ciudad (Ventanilla de Correspondencia).</li>
                                <li>Entrega el original junto a los documentos de soporte recomendados y haz que te sellen la copia física con la fecha de recibido para llevar tu control.</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* BLOG INFORMATIVO OPTIMIZADO PARA SEO */
            <div className="space-y-6">
              {selectedPost ? (
                /* MOSTRAR DETALLE DEL ARTÍCULO */
                <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      onClick={clearSelectedBlogPost}
                      className="text-xs font-bold text-[#0a1f42] hover:text-[#c9a84c] transition-colors flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                    >
                      ← Volver al listado de guías
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#0a1f42]/5 text-[#0a1f42] uppercase">
                        {selectedPost.category}
                      </span>
                      <span className="text-xs text-slate-450 font-medium font-mono">{selectedPost.publishDate}</span>
                    </div>
                  </div>

                  <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight drop-shadow">
                        {selectedPost.title}
                      </h1>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Columna de contenido */}
                    <div className="lg:col-span-8 space-y-6 select-text">
                      <div className="prose prose-slate max-w-none prose-sm sm:prose-base">
                        <ReactMarkdown
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1f42] mt-6 mb-4 border-b border-slate-150 pb-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-bold text-[#0a1f42] mt-6 mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2" {...props} />,
                            p: ({node, ...props}) => <p className="text-sm text-slate-700 leading-relaxed mb-4" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-sm text-slate-700" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-sm text-slate-700" {...props} />,
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
                            td: ({node, ...props}) => <td className="p-3 text-slate-650" {...props} />,
                          }}
                        >
                          {selectedPost.content}
                        </ReactMarkdown>
                      </div>

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
                            handleFrequentProcedureClick(
                              selectedPost.title,
                              `Hola. Acabo de leer el artículo de blog "${selectedPost.title}" y necesito ayuda personalizada. ¿Podrías indicarme de forma detallada cuáles son los requisitos vigentes, los pasos y cómo evitar errores en este trámite?`
                            );
                          }}
                          className="w-full py-2.5 px-4 bg-[#0a1f42] text-white hover:bg-[#112d59] font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 border border-slate-800 hover:-translate-y-0.5 uppercase tracking-wider cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-[#c9a84c]" />
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
                            <span className="block text-xs font-bold text-[#0a1f42]">{selectedPost.author}</span>
                            <span className="block text-[10px] text-slate-400 font-medium font-mono">Asesor de Seguridad Social</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Guías elaboradas con base en la Ley de Seguridad Social, reglamentos del IESS, boletines oficiales y resoluciones actuales de Ecuador.
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                        <h4 className="text-xs font-black text-[#0a1f42] uppercase tracking-wider border-b pb-2">
                          Palabras Clave SEO
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPost.keywords.map((kw, i) => (
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
                          {BLOG_POSTS.filter(p => p.id !== selectedPost.id).slice(0, 3).map(p => (
                            <div
                              key={p.id}
                              onClick={() => {
                                navigateToBlogPost(p);
                                window.scrollTo({ top: 350, behavior: 'smooth' });
                              }}
                              className="group cursor-pointer block border-b border-slate-100 last:border-0 pb-2.5 last:pb-0"
                            >
                              <h5 className="text-[11px] font-bold text-slate-750 group-hover:text-[#c9a84c] transition-colors leading-tight line-clamp-2">
                                {p.title}
                              </h5>
                              <span className="text-[9px] text-slate-450 mt-1 block font-mono">
                                {p.category} • {p.readTime} min
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schema para artículos */}
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "BlogPosting",
                      "headline": selectedPost.title,
                      "description": selectedPost.metaDescription,
                      "image": selectedPost.image,
                      "datePublished": selectedPost.publishDate,
                      "author": {
                        "@type": "Organization",
                        "name": selectedPost.author
                      }
                    })}
                  </script>
                </article>
              ) : (
                /* MOSTRAR LISTADO DE ARTÍCULOS */
                <div className="space-y-6 animate-fade-in">
                  {/* Buscador y Filtros del Blog */}
                  <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
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
                        SEO Optimizado 2026
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-grow bg-white border-2 border-[#0a1f42]/10 rounded-xl px-3 py-2 flex items-center gap-2 focus-within:border-[#0a1f42] transition-colors h-11">
                        <Search className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={blogSearch}
                          onChange={(e) => setBlogSearch(e.target.value)}
                          placeholder="Buscar guías por palabra clave (ej. jubilación, quirografario)..."
                          className="w-full text-xs font-bold text-[#0a1f42] placeholder-slate-400 bg-transparent focus:outline-none"
                        />
                        {blogSearch && (
                          <button
                            onClick={() => setBlogSearch("")}
                            className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
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
                            onClick={() => setSelectedBlogCategory(cat)}
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

                  {/* Grid de Artículos */}
                  {(() => {
                    const filteredPosts = BLOG_POSTS.filter(post => {
                      const matchesSearch = blogSearch === "" || 
                        post.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
                        post.metaDescription.toLowerCase().includes(blogSearch.toLowerCase()) ||
                        post.keywords.some(kw => kw.toLowerCase().includes(blogSearch.toLowerCase()));
                      
                      const matchesCategory = selectedBlogCategory === "All" || post.category === selectedBlogCategory;

                      return matchesSearch && matchesCategory;
                    });

                    if (filteredPosts.length === 0) {
                      return (
                        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
                          <span className="text-4xl">🔍</span>
                          <h3 className="text-sm font-bold text-slate-700">No encontramos resultados</h3>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            Prueba buscando otros términos o seleccionando otra categoría en los filtros superiores.
                          </p>
                          <button
                            onClick={() => {
                              setBlogSearch("");
                              setSelectedBlogCategory("All");
                            }}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0a1f42] font-bold text-xs rounded-xl transition-all cursor-pointer"
                          >
                            Limpiar filtros
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredPosts.map((post) => (
                          <article
                            key={post.id}
                            onClick={() => {
                              navigateToBlogPost(post);
                              window.scrollTo({ top: 350, behavior: 'smooth' });
                            }}
                            className="bg-white border border-slate-200 hover:border-[#c9a84c] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer group flex flex-col h-full"
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
                                <span className="text-[10px] text-slate-450 font-mono block">
                                  📅 {post.publishDate} • ⏱️ {post.readTime} min lectura
                                </span>
                                <h3 className="text-xs sm:text-sm font-extrabold text-[#0a1f42] leading-snug group-hover:text-[#c9a84c] transition-colors line-clamp-2">
                                  {post.title}
                                </h3>
                                <p className="text-[11px] text-slate-550 leading-normal line-clamp-3">
                                  {post.metaDescription}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium">
                                <span className="text-slate-450">Por: {post.author}</span>
                                <span className="font-extrabold text-[#0a1f42] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                                  Ver Guía <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: CHATBOT INTERACTIVO (embedded on desktop) */}
        <section 
          ref={chatSectionRef}
          id="chatbot-section" 
          className="w-full lg:w-[400px] bg-white border border-slate-200 rounded-2xl shadow-lg flex flex-col h-[580px] overflow-hidden sticky lg:top-24 select-none lg:select-text shrink-0"
        >
          {/* Top Panel Brand */}
          <div className="bg-[#0a1f42] p-4 text-white border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#9c7d31] flex items-center justify-center font-bold text-white shadow">
                IA
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">IESS Asistente</h3>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                    {apiOnline === true ? "Gemini Inteligencia Activa" : "Soporte de Ley 2026"}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setChatMessages([
                  {
                    id: "welcome",
                    role: "assistant",
                    content: "¡Hola! He reiniciado nuestra sesión. Soy tu asistente virtual del IESS. ¿Qué duda legal o trámite deseas consultar hoy?",
                    timestamp: new Date()
                  }
                ]);
              }}
              title="Borrar Chat"
              className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ info helper banner */}
          <div className="bg-slate-50 border-b border-slate-100 p-2.5 px-3 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-[10px] text-slate-500 font-medium leading-relaxed">
              Este asistente está provisto con la normativa oficial en Ecuador (Ley Seguridad Social, resoluciones C.D. 625, 677, 515).
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs inline-block shadow-sm ${
                    msg.role === "user" 
                      ? "bg-[#0a1f42] text-white rounded-tr-none" 
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none leading-relaxed"
                  }`}
                >
                  {/* Process carriage returns into simple linebreaks */}
                  <p className="whitespace-pre-line">
                    {msg.content}
                  </p>
                  <span className={`text-[9px] block text-right mt-1.5 font-mono ${
                    msg.role === "user" ? "text-slate-300" : "text-slate-400"
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm inline-block">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    <span className="text-[10px] text-slate-400 pl-1 font-mono uppercase font-semibold">Buscando requisitos...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Shortcuts Suggestions Carousel */}
          <div className="bg-white border-t border-slate-100 p-2 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-thin">
            <button 
              onClick={() => handleShortcutClick("Requisitos para Jubilación por Vejez")}
              className="text-[10px] font-bold bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors shrink-0"
            >
              👴 Jubilación Vejez
            </button>
            <button 
              onClick={() => handleShortcutClick("¿Cómo pedir un préstamo quirografario en el BIESS?")}
              className="text-[10px] font-bold bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors shrink-0"
            >
              💳 Préstamo Quirografario
            </button>
            <button 
              onClick={() => handleShortcutClick("¿Cuánto se paga de aportación obligatoria para afiliación voluntaria?")}
              className="text-[10px] font-bold bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors shrink-0"
            >
              🏥 Afiliación Voluntaria
            </button>
            <button 
              onClick={() => handleShortcutClick("¿Cómo hacer reclamo de medicamento faltante o cita cancelada?")}
              className="text-[10px] font-bold bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors shrink-0"
            >
              🚨 Quejas y Denuncias
            </button>
          </div>

          {/* Bottom Chat Input form */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Pregunta sobre jubilación, préstamos..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0a1f42]"
            />
            <button 
              type="submit"
              disabled={!chatInput.trim()}
              className="bg-[#0a1f42] hover:bg-[#113160] disabled:bg-slate-100 text-white p-2 rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed text-xs font-bold"
            >
              <Send className="w-4 h-4 shrink-0" />
            </button>
          </form>
        </section>

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
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0a1f42] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#c9a84c] z-10 shadow">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9a84c] bg-amber-400/10 px-2 py-0.5 rounded">
                    Normativa de {selectedProcedure.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold mt-1 tracking-tight">
                    {selectedProcedure.title}
                  </h3>
                </div>
                <button 
                  onClick={clearSelectedProcedure}
                  className="p-1 px-2.5 text-xs bg-[#c9a84c] text-[#0a1f42] hover:bg-white hover:text-[#0a1f42] font-extrabold rounded-lg transition-all border border-transparent shadow active:scale-95 duration-100"
                >
                  <X className="w-4 h-4 inline-block mr-1 font-black shrink-0" /> Cerrar
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-6 text-slate-800 text-xs sm:text-sm">
                
                {/* 1. ¿Quién puede hacer este trámite? */}
                <section>
                  <h4 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide">
                    <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-xs">✓</span>
                    ¿Quién puede hacer este trámite?
                  </h4>
                  <p className="mt-2 text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-lg border-l-2 border-emerald-500">
                    {selectedProcedure.whoCanDo}
                  </p>
                </section>

                {/* 2. Requisitos */}
                <section>
                  <h4 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide">
                    <span className="bg-[#fcf7e6] text-[#9a7e36] px-1.5 py-0.5 rounded text-xs">📋</span>
                    Requisitos indispensables
                  </h4>
                  <ul className="mt-2.5 space-y-2 pl-1">
                    {selectedProcedure.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 leading-relaxed font-normal">
                        <CheckCircle className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 3. Pasos para tramitarlo */}
                <section>
                  <h4 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide">
                    <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-xs">🔢</span>
                    Pasos obligatorios para tramitarlo
                  </h4>
                  <div className="mt-3 space-y-3.5 pl-1">
                    {selectedProcedure.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0a1f42] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-600 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. Dónde tramitarlo */}
                <section>
                  <h4 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide">
                    <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs">🔗</span>
                    ¿Dónde tramitarlo?
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-2 items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-700 font-semibold">{selectedProcedure.whereTo.label}</span>
                    {selectedProcedure.whereTo.url && (
                      <a 
                        href={selectedProcedure.whereTo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#0a1f42] hover:bg-[#123060] text-white font-bold py-1.5 px-4 rounded-md text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        Web Oficial
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </section>

                {/* 5. Errores frecuentes */}
                <section>
                  <h4 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide text-rose-800">
                    <span className="bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded text-xs">⚠️</span>
                    Errores frecuentes a evitar
                  </h4>
                  <ul className="mt-2.5 space-y-1.5 pl-1 bg-red-50/50 p-3 rounded-xl border border-dotted border-red-200">
                    {selectedProcedure.commonErrors.map((err, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 font-medium leading-relaxed">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{err}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 6. Normativa & Más ayuda */}
                <section className="bg-slate-50 rounded-xl p-4 border border-dotted border-slate-200">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-slate-800 font-bold mb-1">¿Necesitás más ayuda?</h4>
                      <p className="text-slate-500 leading-normal mb-3">{selectedProcedure.needsMoreHelp}</p>
                      
                      {selectedProcedure.referenceNorm && (
                        <div className="text-[10px] text-slate-400 font-medium font-mono mb-2">
                          Norma de sustento: {selectedProcedure.referenceNorm}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <button 
                      onClick={() => {
                        const pm = `Hola, tengo una pregunta sobre el trámite de "${selectedProcedure.title}". ¿Me podrías detallar más sobre los requisitos indispensables y los pasos a seguir?`;
                        sendMessage(pm);
                        clearSelectedProcedure();
                        if (chatSectionRef.current) {
                          chatSectionRef.current.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="flex-1 bg-[#c9a84c] hover:bg-[#b0923f] text-[#0a1f42] font-extrabold py-2 px-3 rounded-lg text-xs uppercase tracking-wider text-center"
                    >
                      Preguntar al Chatbot 💬
                    </button>
                    <button 
                      onClick={clearSelectedProcedure}
                      className="sm:w-32 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-3 rounded-lg text-xs uppercase tracking-wider text-center"
                    >
                      Cerrar Guía
                    </button>
                  </div>
                </section>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER: azul oscuro */}
      <footer id="app-footer" className="bg-[#030f24] text-white border-t border-slate-900 pt-10 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800 text-slate-400 text-xs sm:text-sm">
            
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#c9a84c]" />
                <span className="text-white font-extrabold pb-0.5 tracking-wider">GUÍA IESS ECUADOR</span>
              </div>
              <p className="leading-relaxed">
                Plataforma interactiva gratuita de orientación cívica. Diseñada para educar a los afiliados y jubilados ecuatorianos garantizando el fácil acceso a la información pública preestablecida.
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                Actualizado con las reformas vigentes en Ecuador (Año 2026).
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <span className="text-white font-extrabold uppercase tracking-wider">Enlaces Directos Oficiales</span>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.iess.gob.ec" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white hover:underline transition-all flex items-center gap-1.5"
                  >
                    <CornerDownRight className="w-3.5 h-3.5 text-[#c9a84c]" />
                    iess.gob.ec - Trámites en línea
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.biess.fin.ec" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white hover:underline transition-all flex items-center gap-1.5"
                  >
                    <CornerDownRight className="w-3.5 h-3.5 text-[#c9a84c]" />
                    biess.fin.ec - Quirografarios e Hipotecarios
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.gob.ec/iess" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white hover:underline transition-all flex items-center gap-1.5"
                  >
                    <CornerDownRight className="w-3.5 h-3.5 text-[#c9a84c]" />
                    gob.ec/iess - Guía de trámites oficial
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <span className="text-white font-extrabold uppercase tracking-wider">Línea de Denuncias 24/7</span>
              <div className="p-3 bg-red-950/40 rounded-xl border border-red-900 text-slate-300 space-y-2">
                <p className="leading-snug">
                  ¿Experimentas maltrato, falta de fármacos o sobornos en el IESS? Denuncia de forma anónima y segura:
                </p>
                <div className="pt-1.5 border-t border-red-900 text-xs">
                  <span className="font-bold text-white block">🌐 denuncias.iess.gob.ec</span>
                  <span className="font-bold text-white block">📱 WhatsApp: 0962532338</span>
                  <span className="font-bold text-[#c9a84c] block">📞 Central: 1800-4377 (Opción 4)</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-[11px] text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} Guía IESS Ecuador. Todos los derechos reservados. Desarrollado con rigurosidad normativa.
            </p>
            <p className="max-w-md sm:text-right leading-relaxed font-light">
              Nota: Este portal es una herramienta informativa independiente. No representa ni sustituye al portal gubernamental oficial del Instituto Ecuatoriano de Seguridad Social.
            </p>
          </div>

        </div>
      </footer>

      {/* BOTÓN FLOTANTE AZUL CON EMOJI Y VENTANA DE CHAT COMPLETA */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isFabChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="bg-white border text-slate-850 border-slate-200 rounded-2xl shadow-2xl flex flex-col w-[calc(100vw-40px)] sm:w-[370px] h-[480px] mb-3 overflow-hidden"
            >
              {/* Header con Shield/Escudo 🛡️ */}
              <div className="bg-[#0a1f42] p-3 text-white border-b-2 border-[#c9a84c] flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold tracking-tight">IESS Asistente - En línea</h3>
                    <span className="text-[8px] sm:text-[9px] text-[#c9a84c] font-black uppercase tracking-wider block leading-none">
                      ● Inteligencia Activa
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFabChatOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mensajes de Chat */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
                {fabChatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs inline-block shadow-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#0a1f42] text-white rounded-tr-none"
                          : "bg-white text-slate-850 border border-slate-200 rounded-tl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                      <span className={`text-[8px] block text-right mt-1 font-mono ${
                        msg.role === "user" ? "text-slate-300" : "text-slate-400"
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isFabTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-800 border border-slate-150 rounded-2xl rounded-tl-none px-3 py-2 shadow-xs inline-block">
                      <div className="flex gap-1 items-center">
                        <span className="w-1 h-1 bg-[#c9a84c] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1 h-1 bg-[#c9a84c] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1 h-1 bg-[#c9a84c] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        <span className="text-[9px] text-slate-400 pl-1 font-mono uppercase font-bold">Consultando IESS...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={fabChatEndRef} />
              </div>

              {/* 5 Botones de Acceso Rápido */}
              <div className="bg-white px-2 py-1.5 border-t border-slate-100 flex flex-wrap gap-1 shrink-0 max-h-[105px] overflow-y-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => sendFabMessage("¿Cómo puedo solicitar un préstamo quirografario o hipotecario en el BIESS? Indícame los montos y requisitos de aportaciones.")}
                  className="text-[9px] font-extrabold bg-slate-50 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2 py-1 rounded border border-slate-200 transition-colors"
                >
                  💰 Préstamos BIESS
                </button>
                <button
                  type="button"
                  onClick={() => sendFabMessage("¿Cuáles son los pasos y canales autorizados para agendar, consultar o cancelar citas médicas en el IESS o centros de salud?")}
                  className="text-[9px] font-extrabold bg-slate-50 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2 py-1 rounded border border-slate-200 transition-colors"
                >
                  🏥 Citas médicas
                </button>
                <button
                  type="button"
                  onClick={() => sendFabMessage("¿Cuáles son los requisitos de jubilación por vejez, cuántas aportaciones e imposiciones mínimas de ley necesito por edad?")}
                  className="text-[9px] font-extrabold bg-slate-50 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2 py-1 rounded border border-slate-200 transition-colors"
                >
                  👴 Jubilación
                </button>
                <button
                  type="button"
                  onClick={() => sendFabMessage("¿Cómo funciona la afiliación voluntaria, cuánto cuesta aportar el 17.60% sobre el SBU de USD 482 en 2026 y qué beneficios tengo?")}
                  className="text-[9px] font-extrabold bg-slate-50 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-slate-700 px-2 py-1 rounded border border-slate-200 transition-colors"
                >
                  📝 Afiliación
                </button>
                <button
                  type="button"
                  onClick={() => sendFabMessage("Deseo reportar una mala atención administrativa, falta de medicinas o problemas de citas canceladas de forma oficial. ¿A qué canales oficiales debo acudir?")}
                  className="text-[9px] font-extrabold bg-red-50 hover:bg-red-100 text-red-800 px-2 py-1 rounded border border-red-200 transition-colors"
                >
                  😤 Quiero quejarme
                </button>
              </div>

              {/* Input de Mensaje de Texto */}
              <form onSubmit={handleFabFormSubmit} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5 shrink-0">
                <input
                  type="text"
                  value={fabChatInput}
                  onChange={(e) => setFabChatInput(e.target.value)}
                  placeholder="Pregúntale al Asistente IESS..."
                  className="flex-1 bg-slate-50 border border-slate-250 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#0a1f42]"
                />
                <button
                  type="submit"
                  disabled={!fabChatInput.trim()}
                  className="bg-[#0a1f42] hover:bg-[#113160] disabled:bg-slate-100 text-white p-2 rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed text-xs font-bold shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón flotante azul principal */}
        <button
          type="button"
          onClick={() => setIsFabChatOpen(!isFabChatOpen)}
          className="w-14 h-14 bg-[#0a1f42] hover:bg-[#113160] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-[#c9a84c] transition-all transform active:scale-90 hover:scale-105"
          title="Abrir Chatbot del IESS"
        >
          {isFabChatOpen ? (
            <X className="w-6 h-6 text-[#c9a84c]" />
          ) : (
            <span className="text-2xl animate-pulse">💬</span>
          )}
        </button>
      </div>

    </div>
  );
}
