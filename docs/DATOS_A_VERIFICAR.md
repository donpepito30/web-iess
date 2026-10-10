# Datos de Seguridad Social a Verificar en Ecuador (YMYL)

Este archivo consolida todos los datos, oficinas locales, direcciones y cifras que requieren una validación humana rigurosa contra el Registro Oficial o visitas físicas antes de retirar el marcado `noindex` en producción.

---

## 📍 Datos de Oficinas y Direcciones Locales de IESS por Ciudad

Las direcciones marcadas a continuación corresponden a las 19 capitales de provincia restantes de Ecuador, que actualmente no cuentan con información mínima calificada o verificada de al menos 2 dependencias oficiales, y por lo tanto, se encuentran marcadas con `noindex, follow` y excluidas del sitemap automático.

### 🏢 Dependencias Locales Pendientes de Verificación Total:

1. **IESS Loja** (Capital de la Provincia de Loja)
   * Dirección del Centro de Atención Universal (CAU).
   * Teléfono de ventanilla provincial.
   *Unidades médicas y hospitales asignados.*
   
2. **IESS Portoviejo** (Capital de la Provincia de Manabí)
   * Dirección de la Dirección Provincial del IESS Manabí.
   * Teléfonos y horarios del CAU Portoviejo.

3. **IESS Esmeraldas** (Capital de la Provincia de Esmeraldas)
   * Oficinas de atención al usuario y dispensarios del IESS Esmeraldas.

4. **IESS Ibarra** (Capital de la Provincia de Imbabura)
   * Dirección oficial del CAU Ibarra y Hospital General IESS Ibarra.

5. **IESS Riobamba** (Capital de la Provincia de Chimborazo)
   * Dirección física del CAU Chimborazo e ingresos del Hospital del IESS de Riobamba.

6. **IESS Babahoyo** (Capital de la Provincia de Los Ríos)
   * CAU Babahoyo y Hospital del IESS Babahoyo.

7. **IESS Tulcán** (Capital de la Provincia de Carchi)
   * Oficinas administrativas del Carchi.

8. **IESS Latacunga** (Capital de la Provincia de Cotopaxi)
   * CAU Cotopaxi y unidades médicas de Latacunga.

9. **IESS Guaranda** (Capital de la Provincia de Bolívar)
   * Oficinas de atención universal de Bolívar.

10. **IESS Azogues** (Capital de la Provincia de Cañar)
    * CAU Cañar y hospitales asignados.

11. **IESS Tena** (Capital de la Provincia de Napo)
    * Oficinas de Napo.

12. **IESS Puyo** (Capital de la Provincia de Pastaza)
    * CAU Pastaza.

13. **IESS Macas** (Capital de la Provincia de Morona Santiago)
    * Oficinas operativas de Morona Santiago.

14. **IESS Zamora** (Capital de la Provincia de Zamora Chinchipe)
    * CAU Zamora Chinchipe.

15. **IESS Nueva Loja** (Capital de la Provincia de Sucumbíos)
    * Oficinas de Lago Agrio.

16. **IESS Francisco de Orellana** (Capital de la Provincia de Orellana)
    * CAU Coca.

17. **IESS Santa Elena** (Capital de la Provincia de Santa Elena)
    * Oficinas de la Península.

18. **IESS Santo Domingo** (Capital de la Provincia de Santo Domingo de los Tsáchilas)
    * CAU Santo Domingo.

19. **IESS Puerto Baquerizo Moreno** (Capital de la Provincia de Galápagos)
    * Punto de atención insular de Galápagos.

---

## 🏥 Antiguas preguntas frecuentes de "CIUDAD_FAQS" marcadas como NO VERIFICADAS:

Las siguientes preguntas y respuestas anteriormente hardcodeadas se consideran no verificadas por falta de geolocalización exacta de sus coordenadas y teléfonos locales correspondientes:
* *¿Cuál es el número de atención IESS Quito?* (Línea general es 1800-4377, se requiere verificar si hay anexos directos en el CAU Central de la 10 de Agosto).
* *¿Dónde queda la oficina principal del IESS en Guayaquil?* (Verificado el edificio de la Caja del Seguro en Olmedo y Boyacá, pero faltan números de extensiones telefónicas de ventanilla).
* *¿Dónde queda la oficina principal del IESS en Cuenca?* (Verificado que está en la Gran Colombia y Hermano Miguel, pero falta comprobar si el punto del Mall del Río sigue activo en 2026).
* *¿Dónde se ubica la oficina del IESS en Ambato?* (Dirección de Castillo y Olmedo frente al Parque Montalvo confirmada, pero falta verificar los números de atención directa).
* *¿Dónde quedan las oficinas del IESS en Machala?* (Bolívar y Ayacucho confirmado, pero falta auditar si existen agencias del BIESS independientes en El Oro).

---

## 📋 Cifras Salariales y Porcentajes de Afiliación Voluntaria (Normativa 2026)

Las siguientes cifras financieras utilizadas en los cálculos y tablas de aportación voluntaria deben ser corroboradas periódicamente contra el Registro Oficial:
* **Salario Básico Unificado (SBU 2026)**: Fijado referencialmente en el proyecto en **USD 482.00**. Verificar con el Acuerdo Ministerial correspondiente expedido por el Ministerio del Trabajo de Ecuador para el ejercicio fiscal 2026.
* **Porcentaje de Aportación Voluntaria (17.60%)**: Tasa oficial establecida en la Resolución C.D. 625 del IESS para afiliados independientes sin relación de dependencia en territorio ecuatoriano y residentes en el exterior.
* **Aporte mensual voluntario mínimo (USD 84.83)**: Obtenido del cálculo `USD 482.00 * 17.60%`. Confirmar la tabla sectorial si aplica a actividades económicas especializadas.

---

## 🏛️ Porcentajes de Reparto de Pensión de Montepío (Viudez y Orfandad)
* **Porcentajes de concurrencia de montepío**: // VERIFICAR: Distribución tradicional de hasta 60% para cónyuge/conviviente sin hijos, o 40% para cónyuge y 40% distribuido entre hijos huérfanos cuando concurren ambos. Verificar con la reglamentación vigente de la Dirección del Sistema de Pensiones del IESS para 2026 si existen techos modificados o reglas especiales para ascendientes huérfanos de pensión.

---

## 🤱 Subsidio de Maternidad IESS (Cálculo y Distribución de Pago)

* **Distribución de cobertura 75% IESS y 25% Empleador**: Conforme al Código del Trabajo (Art. 152) y la Ley de Seguridad Social, la trabajadora bajo relación de dependencia percibe el 100% de su sueldo durante los 84 días de licencia de maternidad. El IESS abona el 75% del promedio de los 12 meses anteriores al parto y el empleador completa el 25% restante en el rol de pagos mensual. // VERIFICAR: Confirmar si en afiliados voluntarios o sin relación de dependencia aplica subsidio directo exclusivamente del 75% o si se requiere un reglamento complementario para el ejercicio fiscal 2026.
* **Período de referencia de imposiciones (12 continuas en últimos 15 meses)**: Conforme al manual de procedimientos del IESS y Código del Trabajo. Verificar si existen excepciones reglamentarias para trabajadoras a tiempo parcial o jornadas reducidas.



