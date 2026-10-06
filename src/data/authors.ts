export interface Author {
  slug: string;
  name: string;
  title: string;
  bio: string;
  experience: string[];
  imageUrl: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export const AUTHORS: Record<string, Author> = {
  "fernando-torres": {
    slug: "fernando-torres",
    name: "Dr. Fernando Torres",
    title: "Especialista en Seguridad Social y Derecho Laboral",
    bio: "[COMPLETAR: Dr. Fernando Torres es Abogado por la Universidad Central del Ecuador, con más de 12 años de experiencia asesorando a afiliados, jubilados y empleadores en normativas de la seguridad social ecuatoriana.]",
    experience: [
      "Consultor Senior en Seguridad Social y Derecho Administrativo Laboral en [COMPLETAR: Torres & Asociados]",
      "Ex-asesor jurídico de la Dirección Provincial del IESS [COMPLETAR: Pichincha]",
      "Coautor de diversos manuales y guías sobre pensiones de jubilación e impugnaciones de glosas patronales en Ecuador."
    ],
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop", // Professional headshot
    twitterUrl: "https://twitter.com/[COMPLETAR_USUARIO_X]",
    linkedinUrl: "https://linkedin.com/in/[COMPLETAR_USUARIO_LINKEDIN]",
    email: "contacto+ftorres@iessasistente.com"
  },
  "eliana-suarez": {
    slug: "eliana-suarez",
    name: "Dra. Eliana Suárez",
    title: "Asesora Legal y Consultora de Pensiones",
    bio: "[COMPLETAR: Dra. Eliana Suárez cuenta con un Máster en Derecho del Trabajo y de la Seguridad Social y se especializa en la calificación de pensiones de jubilación por invalidez y vejez en Ecuador.]",
    experience: [
      "Asesora técnica de la Dirección Nacional de Pensiones del IESS entre [COMPLETAR: 2018 y 2022]",
      "Docente de Postgrado en Derecho de la Seguridad Social en la Universidad [COMPLETAR: San Francisco de Quito]",
      "Especialista en estructuración de descargos y apelaciones patronales frente al Consejo Directivo."
    ],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop", // Professional female headshot
    twitterUrl: "https://twitter.com/[COMPLETAR_USUARIO_X_2]",
    linkedinUrl: "https://linkedin.com/in/[COMPLETAR_USUARIO_LINKEDIN_2]",
    email: "contacto+esuarez@iessasistente.com"
  }
};

export const DEFAULT_REVIEWER = AUTHORS["eliana-suarez"];
export const DEFAULT_AUTHOR = AUTHORS["fernando-torres"];
