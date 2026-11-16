# Reporte Automatizado de Datos Pendientes de Verificación (YMYL)

> **Documento generado automáticamente por `npm run data:report` (`scripts/verify-report.ts`).**
> Fecha de generación: 2026-11-16
>
> Este reporte consolida rigurosamente todas las cifras salariales, porcentajes de aportación y dependencias físicas locales que se encuentran marcadas con `verified: false` o `verifiedAt: null`. Ningún dato aquí listado se presenta al usuario como definitivo ni verificado hasta ser contrastado documentalmente con resoluciones oficiales del IESS o del Ministerio del Trabajo.

---

## 📊 1. Cifras y Datos Clave Pendientes de Verificación (`src/data/facts.ts`)

Total de variables no verificadas: **24**

| Identificador (ID) | Valor | Archivo y Línea | Fuente referencial | Artículos y Trámites que lo utilizan |
| :--- | :--- | :--- | :--- | :--- |
| `SBU_2024` | **460** | `src/data/facts.ts:12` | Ministerio del Trabajo, año 2024 | *Sin uso directo en plantillas* |
| `SBU_2025` | **470** | `src/data/facts.ts:20` | Ministerio del Trabajo de Ecuador | *Sin uso directo en plantillas* |
| `MATERNIDAD_DIAS_DESCANSO` | **84** | `src/data/facts.ts:80` | Código del Trabajo, Art. 152 (12 semanas) | Artículo: "Subsidio de maternidad IESS 2026: requisitos y cuánto pagan" (/blog/subsidio-maternidad-iess-requisitos-calculo-2026)<br/>Trámite: "Subsidio por Maternidad" (/procedimiento/subsidio-maternidad) |
| `MATERNIDAD_APORTES_REQ` | **12** | `src/data/facts.ts:88` | Reglamento General del Seguro de Salud del IESS | Artículo: "Subsidio de maternidad IESS 2026: requisitos y cuánto pagan" (/blog/subsidio-maternidad-iess-requisitos-calculo-2026)<br/>Trámite: "Subsidio por Maternidad" (/procedimiento/subsidio-maternidad) |
| `MONTEPIO_ORFANDAD_PCT` | **40** | `src/data/facts.ts:106` | Reglamento del Seguro de Invalidez, Vejez y Muerte del IESS | Artículo: "Pensión de viudez y orfandad IESS: requisitos y trámite" (/blog/pension-montepio-iess-requisitos-sobrevivientes-2026)<br/>Trámite: "Pensión de Montepío" (/procedimiento/montepio) |
| `TASA_HIPOTECARIO_MIN` | **6.8** | `src/data/facts.ts:116` | Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) | Artículo: "Préstamo Hipotecario BIESS 2026: Requisitos y Tasas de Interés" (/blog/prestamo-hipotecario-biess-requisitos-tasas-2026)<br/>Trámite: "Préstamo Hipotecario" (/procedimiento/prestamo-hipotecario) |
| `TASA_HIPOTECARIO_MAX` | **9.1** | `src/data/facts.ts:124` | Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) | Artículo: "Préstamo Hipotecario BIESS 2026: Requisitos y Tasas de Interés" (/blog/prestamo-hipotecario-biess-requisitos-tasas-2026)<br/>Trámite: "Préstamo Hipotecario" (/procedimiento/prestamo-hipotecario) |
| `HIPOTECARIO_PLAZO_MAX_ANOS` | **25** | `src/data/facts.ts:132` | Reglamento de Créditos Hipotecarios BIESS | Artículo: "Préstamo Hipotecario BIESS 2026: Requisitos y Tasas de Interés" (/blog/prestamo-hipotecario-biess-requisitos-tasas-2026)<br/>Trámite: "Préstamo Hipotecario" (/procedimiento/prestamo-hipotecario) |
| `CREDICASA_TASA` | **2.99** | `src/data/facts.ts:142` | Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa | Artículo: "Préstamo Hipotecario BIESS 2026: Requisitos y Tasas de Interés" (/blog/prestamo-hipotecario-biess-requisitos-tasas-2026)<br/>Trámite: "Préstamo Hipotecario" (/procedimiento/prestamo-hipotecario) |
| `CREDICASA_MONTO_MAX` | **65000** | `src/data/facts.ts:150` | Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa | Artículo: "Préstamo Hipotecario BIESS 2026: Requisitos y Tasas de Interés" (/blog/prestamo-hipotecario-biess-requisitos-tasas-2026)<br/>Trámite: "Préstamo Hipotecario" (/procedimiento/prestamo-hipotecario) |
| `CREDICASA_APORTES_REQ` | **36** | `src/data/facts.ts:158` | Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa | Artículo: "Préstamo Hipotecario BIESS 2026: Requisitos y Tasas de Interés" (/blog/prestamo-hipotecario-biess-requisitos-tasas-2026)<br/>Trámite: "Préstamo Hipotecario" (/procedimiento/prestamo-hipotecario) |
| `DENUNCIAS_WEB` | **denuncias.iess.gob.ec** | `src/data/facts.ts:168` | Comunicado de Prensa Oficial IESS / Secretaría de Transparencia de Ecuador | *Sin uso directo en plantillas* |
| `DENUNCIAS_WHATSAPP` | **0962532338** | `src/data/facts.ts:176` | Canales de denuncias habilitados en septiembre 2025 | *Sin uso directo en plantillas* |
| `DENUNCIAS_TELEFONO` | **1800-4377** | `src/data/facts.ts:184` | Línea gratuita de denuncias y soporte telefónico IESS | *Sin uso directo en plantillas* |
| `QUIROGRAFARIO_APORTES_REQ` | **12** | `src/data/facts.ts:194` | Manual del Usuario del Préstamo Quirografario BIESS / biess.fin.ec | Artículo: "Préstamo Quirografario BIESS 2026: Requisitos y Cómo Solicitarlo" (/blog/prestamo-quirografario-biess-requisitos-montos-2026)<br/>Trámite: "Préstamo Quirografario" (/procedimiento/prestamo-quirografario) |
| `QUIROGRAFARIO_MONTO_MAX` | **38560** | `src/data/facts.ts:202` | Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) / 80 Salarios Básicos Unificados | Artículo: "Préstamo Quirografario BIESS 2026: Requisitos y Cómo Solicitarlo" (/blog/prestamo-quirografario-biess-requisitos-montos-2026)<br/>Trámite: "Préstamo Quirografario" (/procedimiento/prestamo-quirografario) |
| `QUIROGRAFARIO_TASA_MIN` | **6.5** | `src/data/facts.ts:210` | Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) | Artículo: "Préstamo Quirografario BIESS 2026: Requisitos y Cómo Solicitarlo" (/blog/prestamo-quirografario-biess-requisitos-montos-2026)<br/>Trámite: "Préstamo Quirografario" (/procedimiento/prestamo-quirografario) |
| `QUIROGRAFARIO_PLAZO_MAX_MESES` | **60** | `src/data/facts.ts:218` | Reglamento de Créditos Quirografarios del BIESS | Artículo: "Préstamo Quirografario BIESS 2026: Requisitos y Cómo Solicitarlo" (/blog/prestamo-quirografario-biess-requisitos-montos-2026)<br/>Trámite: "Préstamo Quirografario" (/procedimiento/prestamo-quirografario) |
| `QUIROGRAFARIO_DISCAPACITADOS_REQ` | **18** | `src/data/facts.ts:226` | Políticas Diferenciales del BIESS para Personas con Discapacidad | *Sin uso directo en plantillas* |
| `QUIROGRAFARIO_NOVACION_PAGO_PCT` | **25** | `src/data/facts.ts:234` | Reglamento General de Crédito BIESS | *Sin uso directo en plantillas* |
| `AVISO_ENTRADA_DIAS` | **15** | `src/data/facts.ts:244` | Ley de Seguridad Social de Ecuador, Art. 73 | *Sin uso directo en plantillas* |
| `AVISO_SALIDA_DIAS` | **3** | `src/data/facts.ts:252` | Ley de Seguridad Social de Ecuador / Reglamento del IESS | *Sin uso directo en plantillas* |
| `URL_IESS_PORTAL` | **https://www.iess.gob.ec** | `src/data/facts.ts:262` | IESS Oficial | *Sin uso directo en plantillas* |
| `URL_BIESS_PORTAL` | **https://www.biess.fin.ec** | `src/data/facts.ts:269` | BIESS Oficial | *Sin uso directo en plantillas* |

### Detalle de Notas y Advertencias por Fact:

- **`SBU_2024`** (Línea 12):
  - **Valor**: `460`
  - **Fuente reportada**: Ministerio del Trabajo, año 2024
  - **Notas editoriales**: Salario Básico Unificado fijado para el año 2024.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 460 · Fuente: Ministerio del Trabajo, año 2024 · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`SBU_2025`** (Línea 20):
  - **Valor**: `470`
  - **Fuente reportada**: Ministerio del Trabajo de Ecuador
  - **Notas editoriales**: Salario Básico Unificado fijado para el año 2025.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 470 · Fuente: Ministerio del Trabajo de Ecuador · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`MATERNIDAD_DIAS_DESCANSO`** (Línea 80):
  - **Valor**: `84`
  - **Fuente reportada**: Código del Trabajo, Art. 152 (12 semanas)
  - **Notas editoriales**: Días calendario de descanso remunerado por maternidad.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 84 · Fuente: Código del Trabajo, Art. 152 (12 semanas) · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`MATERNIDAD_APORTES_REQ`** (Línea 88):
  - **Valor**: `12`
  - **Fuente reportada**: Reglamento General del Seguro de Salud del IESS
  - **Notas editoriales**: Aportaciones continuas requeridas en los 15 meses previos al parto.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 12 · Fuente: Reglamento General del Seguro de Salud del IESS · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`MONTEPIO_ORFANDAD_PCT`** (Línea 106):
  - **Valor**: `40`
  - **Fuente reportada**: Reglamento del Seguro de Invalidez, Vejez y Muerte del IESS
  - **Notas editoriales**: Conflicto de fuentes (40 % vs 20 % por hijo); confirmar en el Reglamento del IESS
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 40 · Fuente: Reglamento del Seguro de Invalidez, Vejez y Muerte del IESS · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`TASA_HIPOTECARIO_MIN`** (Línea 116):
  - **Valor**: `6.8`
  - **Fuente reportada**: Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)
  - **Notas editoriales**: Tasa nominal mínima para líneas de crédito hipotecario no preferenciales.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 6.8 · Fuente: Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`TASA_HIPOTECARIO_MAX`** (Línea 124):
  - **Valor**: `9.1`
  - **Fuente reportada**: Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)
  - **Notas editoriales**: Tasa nominal máxima para líneas de crédito hipotecario no preferenciales.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 9.1 · Fuente: Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`HIPOTECARIO_PLAZO_MAX_ANOS`** (Línea 132):
  - **Valor**: `25`
  - **Fuente reportada**: Reglamento de Créditos Hipotecarios BIESS
  - **Notas editoriales**: Plazo de amortización máximo para el seguro de desgravamen.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 25 · Fuente: Reglamento de Créditos Hipotecarios BIESS · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`CREDICASA_TASA`** (Línea 142):
  - **Valor**: `2.99`
  - **Fuente reportada**: Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa
  - **Notas editoriales**: Tasa de interés preferencial para primera vivienda del programa Credicasa BIESS.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 2.99 · Fuente: Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`CREDICASA_MONTO_MAX`** (Línea 150):
  - **Valor**: `65000`
  - **Fuente reportada**: Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa
  - **Notas editoriales**: Monto máximo de financiamiento para el programa preferencial Credicasa.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 65000 · Fuente: Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`CREDICASA_APORTES_REQ`** (Línea 158):
  - **Valor**: `36`
  - **Fuente reportada**: Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa
  - **Notas editoriales**: Requisito de 36 aportaciones acumuladas (últimas 13 consecutivas) para afiliados en relación de dependencia.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 36 · Fuente: Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`DENUNCIAS_WEB`** (Línea 168):
  - **Valor**: `denuncias.iess.gob.ec`
  - **Fuente reportada**: Comunicado de Prensa Oficial IESS / Secretaría de Transparencia de Ecuador
  - **Notas editoriales**: Canal web oficial para reporte de actos de corrupción, falta de medicamentos y baches de citas.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: denuncias.iess.gob.ec · Fuente: Comunicado de Prensa Oficial IESS / Secretaría de Transparencia de Ecuador · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`DENUNCIAS_WHATSAPP`** (Línea 176):
  - **Valor**: `0962532338`
  - **Fuente reportada**: Canales de denuncias habilitados en septiembre 2025
  - **Notas editoriales**: Número del chatbot oficial automatizado habilitado las 24/7 para quejas ciudadanas.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 0962532338 · Fuente: Canales de denuncias habilitados en septiembre 2025 · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`DENUNCIAS_TELEFONO`** (Línea 184):
  - **Valor**: `1800-4377`
  - **Fuente reportada**: Línea gratuita de denuncias y soporte telefónico IESS
  - **Notas editoriales**: Línea gratuita nacional 1800-IESS (1800-4377) para consultas generales y quejas.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 1800-4377 · Fuente: Línea gratuita de denuncias y soporte telefónico IESS · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`QUIROGRAFARIO_APORTES_REQ`** (Línea 194):
  - **Valor**: `12`
  - **Fuente reportada**: Manual del Usuario del Préstamo Quirografario BIESS / biess.fin.ec
  - **Notas editoriales**: Aportaciones acumuladas mínimas requeridas para solicitar el préstamo quirografario.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 12 · Fuente: Manual del Usuario del Préstamo Quirografario BIESS / biess.fin.ec · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`QUIROGRAFARIO_MONTO_MAX`** (Línea 202):
  - **Valor**: `38560`
  - **Fuente reportada**: Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) / 80 Salarios Básicos Unificados
  - **Notas editoriales**: Monto máximo legal para préstamos quirografarios equivalente a 80 SBU.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 38560 · Fuente: Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) / 80 Salarios Básicos Unificados · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`QUIROGRAFARIO_TASA_MIN`** (Línea 210):
  - **Valor**: `6.5`
  - **Fuente reportada**: Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)
  - **Notas editoriales**: Tasa de interés nominal mínima referencial para créditos quirografarios BIESS.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 6.5 · Fuente: Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`QUIROGRAFARIO_PLAZO_MAX_MESES`** (Línea 218):
  - **Valor**: `60`
  - **Fuente reportada**: Reglamento de Créditos Quirografarios del BIESS
  - **Notas editoriales**: Plazo máximo de amortización de hasta 60 meses (5 años).
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 60 · Fuente: Reglamento de Créditos Quirografarios del BIESS · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`QUIROGRAFARIO_DISCAPACITADOS_REQ`** (Línea 226):
  - **Valor**: `18`
  - **Fuente reportada**: Políticas Diferenciales del BIESS para Personas con Discapacidad
  - **Notas editoriales**: Aportes requeridos reducidos para personas con carné del CONADIS.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 18 · Fuente: Políticas Diferenciales del BIESS para Personas con Discapacidad · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`QUIROGRAFARIO_NOVACION_PAGO_PCT`** (Línea 234):
  - **Valor**: `25`
  - **Fuente reportada**: Reglamento General de Crédito BIESS
  - **Notas editoriales**: Porcentaje pagado del crédito vigente para calificar a una novación.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 25 · Fuente: Reglamento General de Crédito BIESS · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`AVISO_ENTRADA_DIAS`** (Línea 244):
  - **Valor**: `15`
  - **Fuente reportada**: Ley de Seguridad Social de Ecuador, Art. 73
  - **Notas editoriales**: Plazo máximo de 15 días posteriores al inicio de labores para registrar el aviso de entrada.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 15 · Fuente: Ley de Seguridad Social de Ecuador, Art. 73 · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`AVISO_SALIDA_DIAS`** (Línea 252):
  - **Valor**: `3`
  - **Fuente reportada**: Ley de Seguridad Social de Ecuador / Reglamento del IESS
  - **Notas editoriales**: Plazo legal de 3 días posteriores a la separación laboral para registrar el aviso de salida.
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: 3 · Fuente: Ley de Seguridad Social de Ecuador / Reglamento del IESS · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`URL_IESS_PORTAL`** (Línea 262):
  - **Valor**: `https://www.iess.gob.ec`
  - **Fuente reportada**: IESS Oficial
  - **Notas editoriales**: Pendiente de confirmación
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: https://www.iess.gob.ec · Fuente: IESS Oficial · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*

- **`URL_BIESS_PORTAL`** (Línea 269):
  - **Valor**: `https://www.biess.fin.ec`
  - **Fuente reportada**: BIESS Oficial
  - **Notas editoriales**: Pendiente de confirmación
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: https://www.biess.fin.ec · Fuente: BIESS Oficial · Consultado: 2026-11-16 · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*


---

## 🏢 2. Dependencias Locales y Puntos de Atención Pendientes de Verificación (`src/data/cities.ts`)

Total de dependencias con `verifiedAt: null`: **12**

Todas las páginas de ciudades permanecen con directiva **`noindex, follow`** y excluidas del sitemap XML hasta que al menos 2 dependencias por ciudad cuenten con verificación humana presencial documentada (`verifiedAt !== null`).

| Ciudad / Provincia | Tipo | Nombre de la Dependencia | Archivo y Línea | Dirección Referencial | Teléfono | Horario |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Quito** (Pichincha) | CAU | Dirección Provincial Pichincha - CAU Central (Edificio Matriz) | `src/data/cities.ts:31` | Av. 10 de Agosto N21-120 y Bogotá, Quito | 1800-4377 | Lunes a viernes de 08:00 a 17:00 |
| **Quito** (Pichincha) | CAU | Centro de Atención Universal Sur (Quitumbe) | `src/data/cities.ts:41` | Plaza Santa María, calle Quitumbe y Av. Huayanay Ñan, sector Quitumbe, Quito | 1800-4377 | Lunes a viernes de 08:00 a 17:00 |
| **Quito** (Pichincha) | Hospital | Hospital Carlos Andrade Marín (HCAM) | `src/data/cities.ts:51` | Av. Ayacucho y Portoviejo, Quito | 02-294-4200 | Emergencias 24 horas. Consulta externa de lunes a viernes de 07:00 a 19:00 |
| **Guayaquil** (Guayas) | CAU | Centro de Atención Universal Caja del Seguro Guayaquil | `src/data/cities.ts:124` | Av. Olmedo Nro. 411 y Boyacá, Guayaquil | 1800-4377 | Lunes a viernes de 08:00 a 17:00 |
| **Guayaquil** (Guayas) | CAU | Centro de Atención Universal El Fortín | `src/data/cities.ts:134` | Kilómetro 25 de la vía Perimetral, entre la avenida Modesto Luque y Casuarina, Guayaquil | 1800-4377 | Lunes a viernes de 08:00 a 17:00 |
| **Guayaquil** (Guayas) | Hospital | Hospital de Especialidades Teodoro Maldonado Carbo (HTMC) | `src/data/cities.ts:144` | Av. 25 de Julio y Pío Jaramillo Alvarado, Guayaquil | 04-243-9100 | Emergencias 24/7. Consulta externa: Lunes a viernes de 07:00 a 19:00 |
| **Cuenca** (Azuay) | CAU | Centro de Atención Universal Cuenca (Dirección Provincial Azuay) | `src/data/cities.ts:216` | Calle Gran Colombia y Hermano Miguel, Cuenca | 1800-4377 | Lunes a viernes de 08:00 a 17:00 |
| **Cuenca** (Azuay) | Hospital | Hospital General del IESS José Carrasco Arteaga | `src/data/cities.ts:226` | Av. José Carrasco Arteaga y Popayán, Cuenca | 07-286-1500 | Emergencias 24/7. Consulta externa: Lunes a viernes de 07:00 a 18:00 |
| **Ambato** (Tungurahua) | CAU | Centro de Atención Universal Ambato (Dirección Provincial Tungurahua) | `src/data/cities.ts:293` | Calle Castillo y Olmedo (Frente al Parque Montalvo), Ambato | 1800-4377 | Lunes a viernes de 08:00 a 17:00 |
| **Ambato** (Tungurahua) | Hospital | Hospital General del IESS Ambato | `src/data/cities.ts:303` | Av. Los Capulíes y Calle Lirios (Sector Atocha), Ambato | 03-242-1800 | Emergencias 24/7. Consulta externa: Lunes a viernes de 07:00 a 18:00 |
| **Machala** (El Oro) | CAU | Centro de Atención Universal Machala (Antiguo Hospital) | `src/data/cities.ts:370` | Calle Bolívar y Ayacucho (Sector Centro), Machala | 1800-4377 | Lunes a viernes de 08:00 a 17:00 |
| **Machala** (El Oro) | Hospital | Hospital General Machala | `src/data/cities.ts:380` | Av. Alejandro Castro Benítez y Vía Pajonal, Machala | 07-370-1300 | Emergencias 24/7. Consulta externa: Lunes a viernes de 07:00 a 18:00 |

---

## 📋 3. Reglas de Publicación y Criterios de Aprobación

1. **Datos Financieros y Porcentajes**:
   - Todo dato con `verified: false` debe ir acompañado en UI y SSR de la advertencia:
     > *"Confirma este valor en iess.gob.ec antes de realizar tu trámite"*
   - Ningún dato pasa a `verified: true` sin comprobación con el Acuerdo Ministerial o Resolución del Consejo Directivo.

2. **Indexación de Ciudades**:
   - Para que una ciudad sea indexable (`index, follow`) y se incluya en el sitemap:
     - Debe superar 600 palabras de contenido original y riguroso.
     - Debe contar con un mínimo de **2 dependencias físicas verificadas** con `verifiedAt !== null` y `source !== null`.
   - Mientras tanto, todas las URLs locales responden `noindex, follow` para proteger el SEO y evitar falsedad de información presencial.
