# Guía IESS Ecuador - Documentación de Producción y Despliegue en Vercel

Este proyecto es una plataforma web optimizada para trámites, requisitos, subsidios y consultas de la seguridad social en Ecuador con asistente virtual interactivo y generación de oficios de ley.

---

## Despliegue en Vercel

La arquitectura en producción utiliza un servidor Express (`server.ts`) expuesto como función serverless en Vercel a través de `api/index.ts`, con compilación Vite y plantilla SSR en `dist/template.html`.

### 1. Variables de Entorno en Vercel

Configura las siguientes variables de entorno en el panel de Vercel (**Project Settings → Environment Variables**):

| Variable | Tipo | Descripción | Ejemplo / Valor |
| :--- | :--- | :--- | :--- |
| `SITE_URL` | **Requerida** | URL canónica absoluta del sitio para el servidor SSR y sitemaps (sin barra final). | `https://ieesciudadano.vercel.app` |
| `VITE_SITE_URL` | **Requerida** | URL base inyectada en el bundle cliente de Vite para navegación SPA y schemas JSON-LD. | `https://ieesciudadano.vercel.app` |
| `GEMINI_API_KEY` | **Requerida** | Clave de API de Google Gemini para el asistente virtual y respuestas del chatbot. | `AIzaSy...` |
| `ADS_TXT` | *Opcional* | Contenido textual para monetización servido dinámicamente en `/ads.txt`. | `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` |
| `INDEXNOW_KEY` | *Opcional* | Clave para notificaciones automáticas de indexación a Bing / Yandex en `/api/indexnow`. | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |

### 2. Comandos `curl` de Verificación en Producción

Ejecuta estos 4 comandos para verificar la salud del despliegue:

#### A. Verificación de Home (H1 y Canonical real, nunca `%SITE_URL%`):
```bash
curl -s https://ieesciudadano.vercel.app/ | grep -E "(<h1|<link rel=\"canonical\")"
```
*Salida esperada:*
- `<link rel="canonical" href="https://ieesciudadano.vercel.app/">`
- `<h1 ...>IESS Ecuador: trámites, requisitos y consultas...</h1>`

#### B. Verificación de Categoría (H1 y Canonical de sección):
```bash
curl -s https://ieesciudadano.vercel.app/afiliacion | grep -E "(<h1|<link rel=\"canonical\")"
```
*Salida esperada:*
- `<link rel="canonical" href="https://ieesciudadano.vercel.app/afiliacion">`
- `<h1 ...>Afiliación IESS Voluntaria e Independiente...</h1>`

#### C. Verificación de 404 Real (HTTP 404 y `noindex, nofollow`):
```bash
curl -i https://ieesciudadano.vercel.app/ruta-inexistente-404-test | head -n 25
```
*Salida esperada:*
- Código de estado `HTTP/1.1 404 Not Found` (o `HTTP/2 404`).
- `<meta name="robots" content="noindex, nofollow">` en el HTML de respuesta.

#### D. Verificación de Archivos Estáticos (HTTP 200 y Caché Inmutable):
```bash
curl -I https://ieesciudadano.vercel.app/assets/index-B0qwMUF4.css
```
*Salida esperada:*
- Código de estado `HTTP/1.1 200 OK` (o `HTTP/2 200`).
- Cabecera `Cache-Control: public, max-age=31536000, immutable`.

---

## Migración a Dominio Propio

Si estás migrando o configurando un dominio propio para tu despliegue en Vercel (por ejemplo, de `ieesciudadano.vercel.app` hacia `tu-dominio.com`):

1. **Añadir el Dominio en Vercel**:
   - Ve a la configuración de tu proyecto en el panel de Vercel (**Domains**).
   - Añade tu nuevo dominio personalizado (ej. `www.tu-dominio.com` o `tu-dominio.com`).
   - Configura los registros DNS (CNAME y/o registros A) según las instrucciones de Vercel.

2. **Actualizar Variables de Entorno**:
   - Actualiza `SITE_URL` y `VITE_SITE_URL` con el nuevo dominio (ej. `https://tu-dominio.com`), sin barra `/` al final.
   - El servidor Express redirigirá automáticamente mediante **301 Moved Permanently** cualquier petición que ingrese por el dominio anterior.

3. **Verificar en Google Search Console**:
   - Registra tu nuevo dominio en Google Search Console y completa la verificación de propiedad.
   - Ve a la propiedad anterior en Search Console y utiliza la herramienta **Cambio de Dirección** (*Change of Address*).
   - Envía el sitemap: `https://tu-dominio.com/sitemap.xml`.

4. **Conservar Redirecciones**:
   - Mantén el dominio anterior vinculado a Vercel con las redirecciones 301 activas por un mínimo de **12 meses**.
