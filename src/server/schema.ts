export function getOrganizationSchema(siteUrl: string) {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "IESS Asistente Ciudadano",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      "url": `${siteUrl}/logo-512.png`,
      "caption": "IESS Asistente Logo"
    },
    "image": {
      "@id": `${siteUrl}/#logo`
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contacto@iessasistente.com",
      "availableLanguage": ["es"]
    }
  };
}

export function getWebSiteSchema(siteUrl: string) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "IESS Asistente",
    "publisher": {
      "@id": `${siteUrl}/#organization`
    },
    "inLanguage": "es-EC"
  };
}

export function getHomeGraph(siteUrl: string, procedures: any[]) {
  const org = getOrganizationSchema(siteUrl);
  const website = getWebSiteSchema(siteUrl);
  
  const webpage = {
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    "url": siteUrl,
    "name": "Asistente IESS Ecuador - Trámites y Requisitos",
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "about": { "@id": `${siteUrl}/#organization` },
    "description": "Consulta requisitos de jubilación, préstamos quirografarios, hipotecarios, afiliación voluntaria y genera oficios de ley de forma gratuita.",
    "inLanguage": "es-EC"
  };
  
  const itemList = {
    "@type": "ItemList",
    "@id": `${siteUrl}/#itemlist`,
    "name": "Principales Trámites del IESS de Ecuador",
    "numberOfItems": procedures.length,
    "itemListElement": procedures.map((proc, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `${siteUrl}/procedimiento/${proc.id || proc.slug}`
    }))
  };
  
  return {
    "@context": "https://schema.org",
    "@graph": [org, website, webpage, itemList]
  };
}

export function getProcedureGraph(siteUrl: string, proc: any) {
  const org = getOrganizationSchema(siteUrl);
  const website = getWebSiteSchema(siteUrl);
  
  const pageUrl = `${siteUrl}/procedimiento/${proc.id}`;
  
  const webpage = {
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    "url": pageUrl,
    "name": `${proc.title} - Requisitos y Pasos Oficiales`,
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "description": `Guía completa sobre ${proc.title}. Requisitos de aportes, documentos de respaldo, pasos de trámite en línea y errores comunes.`,
    "inLanguage": "es-EC",
    "datePublished": "2026-01-10T09:00:00-05:00",
    "dateModified": "2026-10-01T15:30:00-05:00"
  };
  
  const howTo = {
    "@type": "HowTo",
    "@id": `${pageUrl}/#howto`,
    "name": proc.title,
    "description": `Instrucciones completas para radicar y tramitar ${proc.title} de forma exitosa en el IESS de Ecuador.`,
    "mainEntityOfPage": { "@id": `${pageUrl}/#webpage` },
    "supply": proc.requirements.slice(0, 5).map((req: string) => ({
      "@type": "HowToSupply",
      "name": req
    })),
    "step": proc.steps.map((step: string, idx: number) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": `Paso ${idx + 1}`,
      "text": step,
      "url": `${pageUrl}#step-${idx + 1}`
    })),
    "author": {
      "@type": "Person",
      "name": "Dr. Fernando Torres",
      "jobTitle": "Especialista en Seguridad Social",
      "url": `${siteUrl}/sobre-nosotros`
    },
    "reviewedBy": {
      "@type": "Person",
      "name": "Dra. Eliana Suárez",
      "jobTitle": "Asesora Legal Corporativa",
      "url": `${siteUrl}/editorial`
    }
  };
  
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumbs`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Trámites",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": proc.title,
        "item": pageUrl
      }
    ]
  };
  
  const faqs = {
    "@type": "FAQPage",
    "@id": `${pageUrl}/#faqpage`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": `¿Quién puede solicitar el trámite de ${proc.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": proc.whoCanDo || "Cualquier afiliado activo o jubilado del IESS que cumpla con los requisitos reglamentarios."
        }
      },
      {
        "@type": "Question",
        "name": `¿Cuáles son los principales errores a evitar en ${proc.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": proc.commonErrors.slice(0, 2).join(" ") || "No cumplir con el número mínimo de aportaciones consecutivas requeridas por el IESS."
        }
      },
      {
        "@type": "Question",
        "name": `¿Dónde se realiza el trámite de ${proc.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Este trámite se puede iniciar a través del canal oficial: ${proc.whereTo?.label || "iess.gob.ec"}.`
        }
      }
    ]
  };
  
  return {
    "@context": "https://schema.org",
    "@graph": [org, website, webpage, howTo, breadcrumbs, faqs]
  };
}

export function getArticleGraph(siteUrl: string, post: any) {
  const org = getOrganizationSchema(siteUrl);
  const website = getWebSiteSchema(siteUrl);
  
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  
  const webpage = {
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    "url": pageUrl,
    "name": post.title,
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "description": post.metaDescription,
    "inLanguage": "es-EC"
  };
  
  const article = {
    "@type": "Article",
    "@id": `${pageUrl}/#article`,
    "isPartOf": { "@id": `${pageUrl}/#webpage` },
    "headline": post.title.slice(0, 110),
    "description": post.metaDescription,
    "image": [post.image],
    "datePublished": "2026-02-14T09:00:00-05:00",
    "dateModified": "2026-10-03T16:00:00-05:00",
    "inLanguage": "es-EC",
    "about": {
      "@type": "Thing",
      "name": post.category
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${siteUrl}/editorial`
    },
    "publisher": {
      "@id": `${siteUrl}/#organization`
    },
    "mainEntityOfPage": `${pageUrl}`,
    "citation": ["https://www.iess.gob.ec", "https://www.biess.fin.ec"]
  };
  
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumbs`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": pageUrl
      }
    ]
  };
  
  return {
    "@context": "https://schema.org",
    "@graph": [org, website, webpage, article, breadcrumbs]
  };
}

export function getCategoryGraph(siteUrl: string, cat: any, subSlug: string | null) {
  const org = getOrganizationSchema(siteUrl);
  const website = getWebSiteSchema(siteUrl);
  
  const pageUrl = subSlug ? `${siteUrl}/${cat.slug}/${subSlug}` : `${siteUrl}/${cat.slug}`;
  const title = subSlug 
    ? `${cat.title} - ${cat.subcategories.find((s: any) => s.slug === subSlug)?.title || ""}`
    : cat.metaTitle;
    
  const description = subSlug
    ? (cat.subcategories.find((s: any) => s.slug === subSlug)?.description || cat.metaDescription)
    : cat.metaDescription;
  
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}/#collectionpage`,
    "url": pageUrl,
    "name": title,
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "description": description,
    "inLanguage": "es-EC"
  };
  
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumbs`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": cat.title,
        "item": `${siteUrl}/${cat.slug}`
      },
      ...(subSlug ? [{
        "@type": "ListItem",
        "position": 3,
        "name": cat.subcategories.find((s: any) => s.slug === subSlug)?.title || "",
        "item": pageUrl
      }] : [])
    ]
  };
  
  const graphs: any[] = [org, website, collectionPage, breadcrumbs];
  
  // FAQPage (solo si las FAQs son visibles en la página)
  if (cat.faqs && cat.faqs.length > 0 && !subSlug) {
    const faqPage = {
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faqpage`,
      "mainEntity": cat.faqs.slice(0, 5).map((faq: any) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };
    graphs.push(faqPage);
  }
  
  return {
    "@context": "https://schema.org",
    "@graph": graphs
  };
}

export function getCityGraph(siteUrl: string, city: string, locationData: any) {
  const org = getOrganizationSchema(siteUrl);
  const website = getWebSiteSchema(siteUrl);
  
  const pageUrl = `${siteUrl}/iess/${city}`;
  const cityNameCap = locationData.fullName;
  
  const webpage = {
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    "url": pageUrl,
    "name": `IESS ${cityNameCap} - Trámites, Requisitos y Oficios`,
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "description": `Guía local para trámites y oficinas del IESS en ${cityNameCap}, provincia de ${locationData.region || "Ecuador"}.`,
    "inLanguage": "es-EC",
    "about": {
      "@type": "Place",
      "name": cityNameCap,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityNameCap,
        "addressRegion": locationData.region,
        "addressCountry": "EC"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": String(locationData.lat),
        "longitude": String(locationData.lng)
      }
    }
  };
  
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumbs`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `IESS ${cityNameCap}`,
        "item": pageUrl
      }
    ]
  };
  
  return {
    "@context": "https://schema.org",
    "@graph": [org, website, webpage, breadcrumbs]
  };
}

export function getBlogArchiveGraph(siteUrl: string, page: number, posts: any[]) {
  const org = getOrganizationSchema(siteUrl);
  const website = getWebSiteSchema(siteUrl);
  
  const pageUrl = page <= 1 ? `${siteUrl}/blog` : `${siteUrl}/blog/page/${page}`;
  
  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}/#collectionpage`,
    "url": pageUrl,
    "name": page <= 1 ? "Blog de Guías Prácticas de Seguridad Social" : `Blog de Guías - Página ${page}`,
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "description": "Artículos informativos y guías del IESS actualizados con la normativa vigente.",
    "inLanguage": "es-EC"
  };
  
  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}/#itemlist`,
    "name": "Artículos del Blog de Guías IESS",
    "numberOfItems": posts.length,
    "itemListElement": posts.map((post, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": post.title,
      "description": post.metaDescription,
      "url": `${siteUrl}/blog/${post.slug}`
    }))
  };
  
  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumbs`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      },
      ...(page > 1 ? [{
        "@type": "ListItem",
        "position": 3,
        "name": `Página ${page}`,
        "item": pageUrl
      }] : [])
    ]
  };
  
  return {
    "@context": "https://schema.org",
    "@graph": [org, website, collectionPage, itemList, breadcrumbs]
  };
}
