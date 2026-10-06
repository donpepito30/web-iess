# Guía IESS Ecuador - Documentación de Producción y Migración de Dominio

Este proyecto es una plataforma interactiva y profesional para trámites, requisitos y consultas de la seguridad social en Ecuador con el IESS Asistente integrado.

## Migración a Dominio Propio

Si estás migrando o configurando un dominio propio para tu despliegue en Vercel (por ejemplo, `ieesciudadano.vercel.app` hacia `tu-dominio.com`), sigue estos pasos clave para transferir todo el Link Equity acumulado y asegurar una correcta indexación en los motores de búsqueda:

1. **Añadir el Dominio en Vercel**:
   - Ve a la configuración de tu proyecto en el panel de Vercel.
   - Selecciona **Domains** (Dominios) y añade tu nuevo dominio personalizado (ej. `www.tu-dominio.com` o `tu-dominio.com`).
   - Configura los registros DNS (CNAME y/o registros A) según las instrucciones provistas por Vercel.

2. **Definir la Variable de Entorno `SITE_URL`**:
   - Agrega la variable de entorno `SITE_URL` en tu panel de Vercel con el valor del nuevo dominio (por ejemplo, `https://tu-dominio.com`), sin barra diagonal `/` al final.
   - Una vez definida, el servidor Express redirigirá automáticamente todas las peticiones que ingresen por otros hosts (como `ieesciudadano.vercel.app`) hacia tu dominio principal mediante respuestas HTTP de redirección **301 Moved Permanently**.

3. **Activación Automática de Redirecciones 301**:
   - El sistema de redirección del servidor está diseñado de tal manera que si detecta que la petición llega con un Host diferente a tu `SITE_URL` (y está en producción), redirigirá automáticamente manteniendo la misma ruta y parámetros de búsqueda de consulta (`query string`), excepto para `/api/health`.

4. **Verificar el Nuevo Dominio en Google Search Console**:
   - Registra tu nuevo dominio en Google Search Console y completa la verificación de propiedad (por ejemplo, mediante registro de DNS TXT o archivo HTML).
   - Ve a la propiedad del dominio viejo en Search Console y utiliza la herramienta **Cambio de Dirección** (*Change of Address*) para notificar a Google sobre la migración oficial de tu sitio.

5. **Reenviar el Sitemap**:
   - Ve a la sección de sitemaps del Search Console en tu nueva propiedad y envía la ruta del sitemap: `https://tu-dominio.com/sitemap.xml`.

6. **Mantener las Redirecciones 301 Activas**:
   - Conserva la configuración de redirección 301 y el dominio anterior vinculados en tu proyecto por un mínimo de **12 meses** para garantizar que Google y otros buscadores traspasen toda la autoridad de los enlaces viejos al nuevo dominio.
