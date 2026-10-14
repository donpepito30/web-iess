export interface Author {
  slug: string;
  name: string;
  title: string;
  bio: string;
  experience?: string[];
  imageUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  email?: string;
  isRealPerson: boolean;
}

export const EDITORIAL_TEAM: Author = {
  slug: "equipo-editorial",
  name: "Equipo editorial de IESS Asistente",
  title: "Equipo editorial independiente",
  bio: "Equipo editorial independiente que redacta guías ciudadanas a partir de fuentes oficiales primarias del Ecuador (Ley de Seguridad Social, resoluciones del Consejo Directivo y Registro Oficial), utiliza inteligencia artificial como herramienta de apoyo y síntesis, y revisa exhaustivamente los datos antes de publicar.",
  experience: [
    "Redacción de guías ciudadanas basadas exclusivamente en fuentes oficiales primarias del Ecuador",
    "Contraste sistemático con resoluciones y normativas del Consejo Directivo del IESS",
    "Uso de modelos de IA como apoyo en estructuración, con revisión y verificación humana de datos previa a la publicación"
  ],
  imageUrl: "",
  isRealPerson: false
};

export const AUTHORS: Record<string, Author> = {
  "equipo-editorial": EDITORIAL_TEAM
};

export const DEFAULT_AUTHOR = EDITORIAL_TEAM;
