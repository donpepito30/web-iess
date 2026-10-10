# Guía y Estrategia de Monetización Web — Trámites Ecuador

Esta guía detalla la arquitectura técnica, los requisitos de aprobación, las políticas de contenido y las recomendaciones estratégicas para monetizar el portal con publicidad display sin comprometer el posicionamiento SEO, la experiencia de usuario (UX) ni las métricas de Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1).

---

## 1. Principios No Negociables del Sitio

1. **Contenido Primero:** La respuesta rápida, el resumen y las herramientas útiles siempre se presentan antes de cualquier formato publicitario.
2. **Sin anuncios intrusivos:**
   - Cero pop-ups o modales emergentes.
   - Cero pop-unders ni auto-redirecciones.
   - Cero *Social Bars*, barras flotantes invasivas o notificaciones push engañosas.
   - Prohibido cualquier anuncio que simule botones oficiales de trámites ("Descargar Formulario", "Iniciar Sesión IESS", "Imprimir").
3. **Respeto a Espacios Sensibles e Inteligencia:**
   - **Cero anuncios dentro del Chatbot ni en las respuestas de asistencia de IA.**
   - **Cero anuncios en páginas de quejas, denuncias administrativas ni emergencias médicas.** Los usuarios en situaciones de vulnerabilidad o urgencia no deben ser interrumpidos por anuncios.
4. **Reserva Estricta de Espacio (Anti-CLS):** Todo espacio publicitario cuenta con `minHeight` y contenedor CSS reservado (`min-h-[...]`), evitando saltos visuales durante la carga tardía de scripts.
5. **Apagado por Defecto:** La variable `VITE_ADS_ENABLED=false` mantiene el sitio limpio y sin renderizar contenedores vacíos hasta recibir aprobación de la red.

---

## 2. Requisitos Previos para Solicitar Aprobación en Redes

Antes de enviar la URL para revisión en **Google AdSense** o cualquier red publicitaria certificada por Google (Google MCM), el sitio debe cumplir con los siguientes umbrales:

### A. Mínimo de Contenido y Arquitectura
- [ ] **Mínimo 30-40 artículos y guías de alta calidad** publicados y completamente indexados en Google Search Console.
- [ ] Guías con profundidad editorial (>1.000 palabras por trámite clave, incluyendo pasos, requisitos, enlaces gubernamentales oficiales y tabla de resumen).
- [ ] Ausencia de páginas "en construcción", contenido huérfano o enlaces rotos (404).

### B. Páginas Legales y de Confianza Obligatorias
- [ ] **/terminos**: Términos y Condiciones de uso claros.
- [ ] **/privacidad**: Política de Privacidad detallada que mencione expresamente el uso de cookies publicitarias y proveedores externos (ej. Google AdSense).
- [ ] **/cookies**: Política de Cookies con consentimiento interactivo (banner de cookies granular: técnicas, analíticas, publicidad).
- [ ] **/contacto**: Formulario o canal de contacto real con tiempo de respuesta estimado.
- [ ] **/descargo**: Descargo de responsabilidad explícito y visible en el pie de página aclarando que este sitio es un **portal informativo no oficial e independiente**.

### C. Tráfico Orgánico y Estabilidad
- [ ] Tráfico orgánico estable y verificable procedente de motores de búsqueda durante al menos 3 a 4 semanas.
- [ ] Baja tasa de rebote fraudulento y cero tráfico procedente de intercambiadores de visitas o bots.
- [ ] Rendimiento Core Web Vitals en verde en el informe *PageSpeed Insights* y *CrUX* de Google Search Console.

---

## 3. Checklist de Políticas de Contenido (YMYL y AdSense)

El sector de seguridad social, pensiones y subsidios pertenece a la categoría **YMYL (Your Money or Your Life)**. Las redes publicitarias aplican las directrices de Calidad del Evaluador de Google con máximo rigor:

1. **Claridad sobre No Oficialidad:**
   - No utilizar logos oficiales del Estado, del IESS ni escudos patrios que induzcan a confusión o suplantación.
   - Declarar claramente en la cabecera/pie: *"Portal informativo y de orientación ciudadana no afiliado a instituciones gubernamentales"*.
2. **Cero Contenido Copiado o Scrapeado:**
   - Todo el contenido debe haber sido redactado de forma original, aportando valor agregado (explicaciones sencillas, calculadoras, guías paso a paso, resolución de problemas comunes).
3. **Fuentes Oficiales Verificables:**
   - Citar siempre las fuentes primarias (`iess.gob.ec`, `biess.fin.ec`, Registro Oficial, leyes aplicables).
   - Indicar fecha de actualización para garantizar que los requisitos y montos de aportación o jubilación no induzcan a error.
4. **Respeto a Políticas de Clics Accidentales:**
   - Todos los bloques publicitarios llevan la etiqueta visible y legible: **"Publicidad"**.
   - Distancia mínima de 24px respecto a botones de navegación, descargables o enlaces de descarga.

---

## 4. Configuración Técnica en el Proyecto

### Variables de Entorno (`.env`)
```bash
# Activar publicidad cuando se reciba la aprobación (false durante desarrollo/revisión)
VITE_ADS_ENABLED=false

# ID de editor de Google AdSense
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX

# IDs de bloques publicitarios (generados en el panel de AdSense)
VITE_AD_SLOT_HOME_MID=1234567890
VITE_AD_SLOT_BLOG_MID=2345678901
VITE_AD_SLOT_SIDEBAR=3456789012
VITE_AD_SLOT_PROCEDURE_MID=4567890123

# Contenido para /ads.txt (gestionado en el backend sin re-compilar el frontend)
ADS_TXT="google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
```

### Gestión de `ads.txt`
El archivo se sirve dinámicamente mediante la ruta Express `/ads.txt` configurada en `server.ts`. Cuando la red publicitaria proporcione las líneas de autorización, basta con definirlas en la variable de entorno `ADS_TXT` en el panel de alojamiento (ej. Google Cloud Run / Render / VPS), sin necesidad de crear archivos estáticos ni volver a desplegar la aplicación.

### Carga Asíncrona y Consentimiento
El script principal de Google AdSense (`adsbygoogle.js`) solo se inserta en el DOM cuando:
1. `VITE_ADS_ENABLED === 'true'`.
2. El usuario acepta explícitamente las cookies publicitarias en el componente `CookieConsent`.
3. Si el usuario rechaza las cookies de publicidad, la biblioteca `src/lib/ads.ts` instruye a la red mediante `adsbygoogle.requestNonPersonalizedAds = 1` para no registrar cookies de personalización.

---

## 5. Ubicaciones Recomendadas y Densidad

Para mantener una experiencia prémium y cumplir con la política de densidad publicitaria (<30% de la superficie visible):

| Ubicación | Formato | Altura Mínima Reservada | Condición de Inserción |
| :--- | :--- | :--- | :--- |
| **Página de Inicio (Home)** | `in-article` | 280 px | Después de los accesos directos y requisitos clave; nunca en la cabecera. |
| **Artículo de Trámite** | `in-article` | 280 px | Entre las secciones largas del procedimiento (~600 palabras), antes de preguntas frecuentes y fuentes. |
| **Entrada de Blog** | `in-article` | 280 px | Después del primer bloque de texto y resumen inicial. |
| **Barra Lateral (Escritorio)** | `sidebar` | 600 px | En el lateral de artículos largos, visible únicamente en pantallas `lg` (>1024px) y con espacio reservado. |

*Límites estrictos:*
- Máximo 3 anuncios por página en versión móvil.
- Máximo 4 anuncios por página en versión de escritorio.
- Cero anuncios en páginas cuya URL o título coincida con denuncias, quejas administrativas, subsidios por emergencia médica o formularios de oficios.

---

## 6. Hoja de Ruta de Monetización por Etapas

| Etapa | Tráfico Mensual | Red Publicitaria Recomendada | Estrategia y Enfoque |
| :--- | :--- | :--- | :--- |
| **Fase 1: Inicial** | 0 – 25.000 visitas | **Google AdSense** | Aprobar la cuenta con 30+ artículos de calidad y páginas legales. No saturar. Familiarizarse con RPM y CTR. |
| **Fase 2: Crecimiento** | 25.000 – 50.000 visitas | **Ezoic / Monumetric** | Pruebas de mediación algorítmica y mejora de RPM con subastas de encabezado (*header bidding*). |
| **Fase 3: Consolidación** | 50.000 – 100.000 sesiones | **Mediavine (Journey)** o **Raptive Rise** | Optimización de anunciantes premium para tráfico hispanohablante de alta intención. |
| **Fase 4: Escala Top** | > 100.000 sesiones | **Raptive / Mediavine** | Gestión publicitaria prémium con soporte dedicado y acuerdos directos con patrocinadores del sector legal y financiero. |

---

## 7. Advertencia Especial sobre Adsterra y Redes Alternativas

Si en algún momento se contempla el uso de redes publicitarias como Adsterra, PropellerAds o PopAds:

1. **Evitar estrictamente formatos de alto rebote:**
   - **Pop-unders / Click-unders:** Abren pestañas en segundo plano. Destruyen la confianza del ciudadano en un sitio de orientación legal y provocan penalizaciones algorítmicas por Google Search Console.
   - **Social Bar / In-page Push:** Imita mensajes de WhatsApp o alertas del sistema. Viola directamente la directriz de sitios YMYL y causará rechazos inmediatos en Google AdSense.
   - **Interstitials invasivos:** Incrementan el INP y degradan drásticamente el CLS.
2. **Uso permitido únicamente en formato nativo:**
   Si se utiliza alguna campaña de banner nativo de Adsterra, debe encapsularse exclusivamente dentro del componente `AdSlot` con reserva de altura previa, con la etiqueta "Publicidad" y sujeto al consentimiento del usuario.
