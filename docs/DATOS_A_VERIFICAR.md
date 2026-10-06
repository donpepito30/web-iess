# Reporte de Datos a Verificar (YMYL Compliance)

Este documento contiene un catálogo completo de todos los datos sensibles centralizados en `src/data/facts.ts` de acuerdo con la norma de cumplimiento YMYL (Your Money or Your Life). Al afectar el dinero y derechos de los ciudadanos ecuatorianos, estos datos han sido catalogados como `verified: false` y deben ser confirmados periódicamente contra los canales gubernamentales oficiales (IESS, BIESS, Registro Oficial).

---

## Catálogo de Datos Centralizados

### 1. Salario Básico Unificado (SBU)
* **Dato en código**: `SBU_2025`
  * **Valor actual**: `460` (USD)
  * **Fuente declarada**: Ministerio del Trabajo de Ecuador, Acuerdo Ministerial Nro. MDT-2024-175
  * **Acción**: Validar si existen nuevos salarios básicos fijados mediante Decreto Ejecutivo o Acuerdos Ministeriales vigentes.
* **Dato en código**: `SBU_2026`
  * **Valor actual**: `482` (USD)
  * **Fuente declarada**: Proyección estimada según inflación y canasta básica.
  * **Acción**: CONFIRMAR con el Registro Oficial o anuncio gubernamental al inicio del ejercicio fiscal 2026.

### 2. Porcentajes de Aportación al IESS
* **Dato en código**: `APORTE_VOLUNTARIO_PCT`
  * **Valor actual**: `17.60` (%)
  * **Fuente declarada**: Ley de Seguridad Social, Art. 152
  * **Acción**: Confirmar que no se hayan aprobado reformas a la Ley de Seguridad Social que alteren los aportes del afiliado voluntario.
* **Dato en código**: `APORTE_DEPENDIENTE_TOTAL_PCT`
  * **Valor actual**: `20.60` (%)
  * **Fuente declarada**: Resoluciones del Consejo Directivo del IESS
  * **Acción**: Validar que la sumatoria de aportaciones personales y patronales corresponda a la tasa vigente en el sector privado.
* **Dato en código**: `APORTE_PERSONAL_PCT`
  * **Valor actual**: `9.45` (%)
  * **Fuente de origen**: Ley de Seguridad Social, Art. 116
* **Dato en código**: `APORTE_PATRONAL_PCT`
  * **Valor actual**: `11.15` (%)
  * **Fuente de origen**: Ley de Seguridad Social, Art. 117

### 3. Tasas de Interés y Parámetros BIESS
* **Dato en código**: `TASA_HIPOTECARIO_MIN`
  * **Valor actual**: `5.0` (%)
  * **Fuente declarada**: Tarifario de Crédito Hipotecario BIESS
  * **Acción**: Cotejar con el simulador transaccional oficial en `biess.fin.ec` de acuerdo al valor catastral.
* **Dato en código**: `TASA_HIPOTECARIO_MAX`
  * **Valor actual**: `8.0` (%)
  * **Fuente de origen**: Tarifario de Crédito Hipotecario BIESS
* **Dato en código**: `HIPOTECARIO_PLAZO_MAX_ANOS`
  * **Valor actual**: `25` (Años)
  * **Fuente de origen**: Reglamento de Créditos Hipotecarios BIESS
* **Dato en código**: `HIPOTECARIO_MONTO_100_COBERTURA`
  * **Valor actual**: `100000` (USD)
  * **Fuente de origen**: Políticas de Crédito Hipotecario del BIESS
* **Dato en código**: `HIPOTECARIO_MONTO_MAX`
  * **Valor actual**: `300000` (USD)
  * **Fuente de origen**: Políticas de Crédito Hipotecario del BIESS

### 4. Canales de Quejas y Denuncias (Habilitados en Septiembre 2025)
* **Dato en código**: `DENUNCIAS_WEB`
  * **Valor actual**: `"denuncias.iess.gob.ec"`
  * **Fuente de origen**: Secretaría de Transparencia de Ecuador
  * **Acción**: Probar la accesibilidad de la URL gubernamental de denuncias.
* **Dato en código**: `DENUNCIAS_WHATSAPP`
  * **Valor actual**: `"0962532338"`
  * **Fuente declarada**: Canales habilitados en septiembre de 2025
  * **Acción**: Validar que el chatbot oficial de WhatsApp del IESS para quejas siga asignado a esta numeración.
* **Dato en código**: `DENUNCIAS_TELEFONO`
  * **Valor actual**: `"1800-4377"` (1800-IESS)
  * **Fuente de origen**: Línea gratuita nacional

### 5. Requisitos Mínimos de Préstamos Quirografarios
* **Dato en código**: `QUIROGRAFARIO_APORTES_REQ`
  * **Valor actual**: `36` (Aportes acumulados mínimos)
  * **Fuente de origen**: Manual de Préstamo Quirografario BIESS
* **Dato en código**: `QUIROGRAFARIO_CONSECUTIVOS_REQ`
  * **Valor actual**: `12` (Aportes consecutivos mínimos)
  * **Fuente de origen**: Manual de Préstamo Quirografario BIESS
* **Dato en código**: `QUIROGRAFARIO_DISCAPACITADOS_REQ`
  * **Valor actual**: `18` (Aportes reducidos para discapacidad)
  * **Fuente de origen**: Políticas Diferenciales del BIESS
* **Dato en código**: `QUIROGRAFARIO_NOVACION_PAGO_PCT`
  * **Valor actual**: `25` (%)
  * **Fuente de origen**: Reglamento de Crédito del BIESS

---

## Instrucciones para el Editor Jefe
Al verificar cualquiera de estos datos en fuentes oficiales de la seguridad social de Ecuador:
1. Abra `/src/data/facts.ts`.
2. Actualice el campo `value` de la clave correspondiente si el valor oficial ha cambiado.
3. Actualice el campo `verifiedAt` a la fecha actual de validación (formato `YYYY-MM-DD`).
4. Cambie `verified` a `true`.
5. Ejecute `npm run lint` para asegurarse de no romper la sintaxis del archivo.
