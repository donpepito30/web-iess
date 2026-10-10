# Guía Técnica de Google Search Console y Bing Webmaster Tools

Esta guía detalla los pasos exactos para configurar, verificar y monitorear la presencia del portal independiente de trámites del IESS en los motores de búsqueda principales (Google y Bing).

---

## 1. Verificación de Propiedad de Dominio por Registro DNS (TXT)

La verificación a nivel de **Dominio** (en lugar de prefijo de URL) es obligatoria para recopilar el tráfico de todos los protocolos (`http`, `https`) y subdominios (`www`, no-www).

### Pasos en Google Search Console:
1. Accede a [Google Search Console](https://search.google.com/search-console).
2. Selecciona **Añadir propiedad** y escoge el tipo **Dominio** (ej. `ieesciudadano.vercel.app` o tu dominio principal `tudominio.ec`).
3. Copia el registro de verificación `google-site-verification=...`.
4. Dirígete al panel de tu proveedor de DNS (Cloudflare, Vercel Domains, GoDaddy, Namecheap o NIC.ec).
5. Crea un registro de tipo **TXT**:
   - **Nombre / Host:** `@` (o la raíz del dominio).
   - **Tipo:** `TXT`
   - **TTL:** Automático o 3600 segundos (1 hora).
   - **Valor:** `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
6. Espera la propagación de DNS (generalmente toma entre 2 y 15 minutos).
7. Vuelve a Google Search Console y haz clic en **Verificar**.

> **Nota para subdominios Vercel / Cloud Run:** Si estás usando un subdominio donde no administras la zona DNS raíz, utiliza la verificación por **Etiqueta HTML**, la cual ya está inyectada en el `<head>` de `index.html` (`<meta name="google-site-verification" content="..." />`).

---

## 2. Envío del Mapa del Sitio (`sitemap.xml`)

El portal genera dinámicamente un mapa de sitio con todas las URLs canónicas, trámites, artículos del blog y directorios de ciudades en `/sitemap.xml`.

1. En el menú lateral izquierdo de Search Console, ve a **Indexación > Sitemaps**.
2. En el campo **Añadir un sitemap nuevo**, escribe exactamente:
   ```text
   sitemap.xml
   ```
3. Haz clic en **Enviar**.
4. Verifica que el estado cambie a **"Correcto"** (en verde) y que el recuento de URLs descubiertas coincida con el total de trámites, categorías y páginas pilares.
5. El sitemap se actualiza con directiva `Cache-Control: public, max-age=3600` (1 hora) para que Googlebot siempre encuentre contenidos nuevos al volver a rastrear.

---

## 3. Inspección de URLs Clave e Indexación Prioritaria

Para acelerar la indexación del nuevo contenido o tras actualizar directrices legales del IESS:

1. En la barra superior de búsqueda de Search Console (**"Inspeccionar las URLs de..."**), introduce la URL a probar:
   - Portada: `https://ieesciudadano.vercel.app/`
   - Trámite principal: `https://ieesciudadano.vercel.app/procedimiento/jubilacion-vejez`
   - Simulador: `https://ieesciudadano.vercel.app/herramientas/calculadora-jubilacion`
2. Haz clic en **Probar URL publicada**.
3. Verifica:
   - **Disponibilidad:** *La URL está en Google* o *La URL se puede indexar*.
   - **Canonical seleccionada por el usuario:** Coincide con la canonical detectada por Google.
   - **Rastreador utilizado:** *Smartphone Googlebot*.
4. Haz clic en el botón **"Solicitar indexación"**.

---

## 4. Revisión de Cobertura e Indexación de Páginas

En el informe **Indexación > Páginas**, supervisa periódicamente los estados de rastreo:

- **Indexadas:** Todas las páginas de trámites, guías de ciudades con contenido único (>600 palabras) y artículos del blog.
- **Excluidas intencionalmente:**
  - Rutas de la API (`/api/*`) mediante cabecera `X-Robots-Tag: noindex, nofollow`.
  - Ciudades con contenido mínimo o dependencias no verificadas (`noindex, follow`).
  - Páginas 404 dinámicas (`noindex, nofollow`).
- **Páginas con redirección:** Confirma que cualquier variante HTTP o de dominios no principales se resuelva con código `301 Moved Permanently` hacia la URL canónica.

---

## 5. Core Web Vitals y Experiencia de Usuario (CWV)

El portal está optimizado para cumplir holgadamente los umbrales de Google:

| Métrica | Umbral Recomendado | Estado en este Portal |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | < 2,5 s | Optimizado con imágenes locales WebP, fuentes Inter pre-cargadas y compresión Brotli (`.br`). |
| **INP** (Interaction to Next Paint) | < 200 ms | Componentes diferidos con `React.lazy` y React 19 concurrent mode. |
| **CLS** (Cumulative Layout Shift) | < 0,1 | Alturas mínimas reservadas en bloques de anuncios (`AdSlot`), imágenes con `aspect-ratio` explícito y tipografía con `size-adjust`. |

### Pasos en Search Console:
1. Revisa **Experiencia > Métricas web principales**.
2. Comprueba que el 100% de las URLs en **Móvil** figuren en verde (**"Buenas"**).

---

## 6. Mejoras y Datos Estructurados (Schema.org)

Google Search Console detecta automáticamente los bloques `<script type="application/ld+json">`:

1. Ve a **Mejoras**:
   - **Preguntas frecuentes (FAQPage):** Habilitadas en la portada y guías de trámites para snippets enriquecidos en los resultados de búsqueda de Google.
   - **Rutas de exploración (Breadcrumbs):** Habilitadas en todas las subpáginas para mostrar la jerarquía visual `Inicio > Trámites > [Trámite]`.
   - **Artículos (Article):** Reconocimiento de autoría E-E-A-T (`author`, `publisher`, `datePublished`, `dateModified`).
2. Confirma que la sección **Válidas con advertencias** o **No válidas** esté en `0`.

---

## 7. Configuración de Bing Webmaster Tools

Bing representa una cuota de búsqueda relevante en entornos empresariales y dispositivos con Windows preinstalado en Ecuador:

1. Ingresa a [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Haz clic en **Agregar un sitio**.
3. Selecciona la opción recomendada: **Importar desde Google Search Console**.
4. Concede los permisos de lectura de tu cuenta de Google.
5. Bing importará instantáneamente el dominio verificado, el archivo `sitemap.xml` y la estructura canonical sin necesidad de editar nuevamente los registros DNS.
6. Activa la función **IndexNow** si deseas notificar en tiempo real a Bing cada vez que se publique un nuevo post o se actualice una resolución del IESS.

---

## 8. Configuración de Alertas y Monitoreo Proactivo

1. En Google Search Console, accede a **Configuración > Usuarios y permisos**.
2. En las preferencias de correo electrónico:
   - Activa **"Problemas críticos de indexación"**.
   - Activa **"Caídas drásticas de tráfico o cobertura"**.
   - Activa **"Nuevos problemas de seguridad o acciones manuales"**.
3. Ejecuta semanalmente desde el repositorio:
   ```bash
   npm run seo:check
   npm run seo:chat-topics
   ```
   Esto asegura que el código mantenga el 100% de cumplimiento con las directivas SEO antes de cada despliegue a producción.
