## Notas de auditoría

Nota auditada: `content/blog/blog-capacitacion-en-ingles-programa-fantasma.md`, publicada 2026-06-02, categoría "Resultados y ROI". Esta auditoría evalúa si es la pieza pilar correcta del clúster "causas de fracaso/abandono de programas de capacitación" (junto con `negocios-en-ingles-porque-fracasan-cursos.md`, misma categoría, y `blog-errores-cursos-idiomas-empresas.md`, categoría "Selección de proveedor").

### Relación con contenido existente

**Solapamiento confirmado, ahora desde el lado de la nota más desarrollada.** Sus 5 causas numeradas ("licencias masivas sin guía", "falta de alineación con el negocio", "cero personalización por áreas", "rigidez de horarios", "medir asistencia en vez de desempeño") cubren, con más profundidad, las mismas 3 ideas centrales que `negocios-en-ingles-porque-fracasan-cursos` comprime en sus 3 causas, y 2 de ellas ("rigidez de horarios" y "asistencia vs. desempeño") reaparecen también en `blog-errores-cursos-idiomas-empresas` (errores 3 y 4). La tabla completa ya quedó documentada en la auditoría de `negocios-en-ingles-porque-fracasan-cursos`; aquí solo se confirma que esta nota es, de las 3, la que desarrolla cada causa con más ejemplos concretos (cifras, escenarios, contraste "promesa vs. realidad").

**¿Es la candidata correcta a pieza pilar? Sí, con una salvedad real que hay que sopesar.**

A favor:
- **Es la más extensa y mejor desarrollada:** 1,022 palabras contra 577 de `negocios-en-ingles-porque-fracasan-cursos`; cada causa recibe una explicación de "la promesa" vs. "la realidad" (ver causa 1) en vez de 1-2 frases sueltas.
- **Es la única de las 3 con enlazado interno real y bien dirigido:** enlaza a `blog-nivel-ingles-empresas-areas` (verificado: el anchor "los niveles de inglés que requiere cada departamento de su empresa" describe con precisión el contenido real de esa nota) y a `blog-errores-cursos-idiomas-empresas` (anchor igual de preciso). Ninguna de las otras 2 notas del clúster tiene un enlace interno funcional hacia otra nota del mismo argumento.
- **Mejor apertura para AEO:** su primera oración ("Invertir un presupuesto importante en capacitación en inglés para descubrir, a los pocos meses, que la tasa de abandono roza el 80%...") es autocontenida, con cifra concreta, y funciona sola — mejor que la apertura fragmentada de `negocios-en-ingles-porque-fracasan-cursos` (ver AEO abajo).
- **H1 en forma de pregunta** ("¿Por qué su equipo abandonó el curso de idiomas de la empresa?") — ninguna de las otras 2 notas del clúster tiene esto.

En contra / a tener en cuenta antes de decidir:
- **Su cita externa (Gartner) es tan débil como las demás del blog — no destaca en GEO.** Ver el hallazgo completo abajo: el link apunta a una página de producto/rol de Gartner, no a un estudio específico, el mismo patrón ya visto con HBR y el WEF.
- **`blog-errores-cursos-idiomas-empresas` cita una fuente más sólida — verificado.** Cita un PDF descargable específico del IMCO ("2015_Documento_completo_Ingles_es_posible.pdf"). El fetch directo del PDF solo devolvió metadatos, pero la página oficial del estudio (`imco.org.mx/ingles-es-posible-propuesta-de-una-agenda-nacional/`) confirma que es un reporte real cuyo hallazgo central —el dominio del inglés se relaciona con la competitividad nacional, la productividad laboral y el salario individual— sí respalda la afirmación que se le atribuye. Es una fuente genuinamente mejor que la Gartner de esta nota.
- **Esta nota y `negocios-en-ingles-porque-fracasan-cursos` comparten categoría ("Resultados y ROI"), pero `blog-errores-cursos-idiomas-empresas` vive en "Selección de proveedor").** Igual que con `aprender-idiomas-nearshoring-mexico`, esto pesa en cómo se resuelve la fusión, no en si esta nota es o no la pilar — ver la recomendación completa más abajo.

**Conclusión de esta sección:** esta nota es la mejor construida internamente de las 3 (desarrollo, estructura, enlazado). Ver la recomendación final más abajo, con la verificación de la cita del IMCO ya resuelta.

### AEO

- **Ningún H2 está en forma de pregunta** (los 5 son títulos numerados declarativos: "1. El error de las licencias masivas...", etc.) — mismo patrón que sus 2 notas hermanas. La única pregunta real de la nota vive en el H1/`title`, no se repite en ningún subtítulo del cuerpo.
- **La apertura sí es una oración-resumen autocontenida y bien lograda** (línea 19, ya citada arriba) — es la mejor de las 3 notas del clúster en este punto específico.
- **Estructura de "la promesa" vs. "la realidad"** (causa 1, líneas 31-37) es un patrón de contraste muy extraíble — más logrado que el resto de la nota, que vuelve a un formato de párrafo corrido en las otras 4 causas.
- **La lista de 3 bullets por área** (finanzas / comercial / técnico, líneas 55-57) es el segundo fragmento más extraíble de la nota — formato corto, una idea por línea.

### GEO

Se intentó abrir la única fuente externa citada (línea 21):

- **Gartner — mismo patrón sistémico ya documentado varias veces: portada/página de producto en vez de estudio específico.** El link (`gartner.com/en/human-resources/role/learning-and-development`) devolvió 403 al intentar leerlo directamente, pero una búsqueda confirmó de qué se trata: es una página de rol/producto de Gartner dirigida a "L&D Leaders" (título real: "Empowering Learning and Development (L&D) Leaders for..."), con contenido genérico sobre tendencias de 2026, "aprendices conectados" y adopción de IA — **no un estudio o artículo con la afirmación específica que se le atribuye** ("El verdadero fallo radica en que los cursos tradicionales no logran integrarse de forma relevante en las actividades diarias del colaborador"). Es el mismo patrón que HBR (portada) y el WEF (2 portadas, ya corregido en `mejores-idiomas-para-empresas`): una organización real y prestigiosa, citada con un link genérico que no aloja la cita textual que se le atribuye.
- **Autoridad/contexto:** mismo patrón sistémico del resto del blog.
- **Contraste relevante para la decisión de pilar:** de las 3 notas del clúster, esta es la que peor fuente externa tiene en términos de especificidad (una página de producto, ni siquiera un artículo), mientras que `blog-errores-cursos-idiomas-empresas` cita un PDF de estudio específico del IMCO, ya verificado como una fuente real y relevante (ver recomendación final).

### SEO

- **Title vs. H1:** `title`/H1 = "Capacitación en inglés: ¿Por qué su equipo abandonó el curso de idiomas de la empresa?"; `seoTitle` = "Capacitación en inglés: Por qué fallan los cursos corporativos | %%sitename%%". Coherentes, comparten el mismo arranque de keyword sin conflicto.
- **Densidad del focusKeyword:** "capacitación en inglés" aparece 3 veces en ~1,022 palabras (~0.3%) — baja, no forzada, consistente con el patrón general del blog.
- **Estructura de encabezados:** 5 H2 numerados + 1 H2 de cierre + 1 H3 de CTA, para ~1,022 palabras — buena proporción, cada causa recibe espacio real (a diferencia de la nota hermana más corta).
- **Longitud coherente con `readingTime`:** ~1,022 palabras ÷ ~200 ppm ≈ 5.1 min, declarado `readingTime: 5`. Sin discrepancia.
- **Anchors internos: los mejores del clúster.** 2 enlaces internos, ambos verificados contra el título real de su destino y ambos precisos (ver "Relación con contenido existente"). Es la única de las 3 notas del clúster con enlazado interno funcional hacia otra nota.
- **`seoTitle` con sufijo correcto:** usa `| %%sitename%%`.
- **Tono "usted": consistente**, sin ninguna forma de tuteo en todo el cuerpo.

### SEO técnico

- **`featuredImageAlt` no coincide con la imagen real — verificado abriendo el archivo.** El alt dice: *"Una profesionista en su oficina revisando el progreso de un programa de capacitación en inglés en su computadora, representando la gestión del talento corporativo."* — describe a **una sola persona en una computadora**. La imagen real muestra un **grupo de 5 personas** sentadas en una mesa de trabajo, con lápiz y papel (ejercicios de verbos irregulares — un pizarrón al fondo dice "go — gone", "begin — began"), banderas de Reino Unido/EE. UU. sobre la mesa y una instructora de pie supervisando: es una clase grupal de inglés con ejercicios en papel, no una persona revisando reportes en una computadora. El alt describe una escena distinta a la que muestra el archivo.
- **Alt de la imagen inline es genérico y, además, el tono visual de la foto se aleja del enfoque B2B.** El alt (*"Cursos de idiomas para empresas con S-Peak."*, línea 61) no describe la imagen real, que muestra a una sola persona con audífonos, sonriendo y haciendo un gesto de aprobación, con notas adhesivas de vocabulario y un ambiente de sala de estar (sofá, cojines) de fondo — se lee como una escena de estudio individual en casa, más cercana al material de una app de idiomas para consumidor final que a una capacitación corporativa grupal. No es una violación textual de la regla B2B (el cuerpo de la nota nunca cambia de registro), pero si se va a reforzar consistencia de marca en las imágenes del clúster, esta es la más alejada del tono corporativo de las 3 notas auditadas en esta ronda.
- **Sin el bug de "Extracto:" en `excerpt`** — es un texto propio y limpio.
- **Sin el error de acento "ingles/inglés" en texto visible** — las 4 apariciones de "ingles" sin tilde en el archivo están todas en el slug o en rutas de imagen. Tercera nota consecutiva que pasa limpia este chequeo.
- **Sin el patrón de "enlace fantasma"** (una frase que promete un link sin el markdown real, ya encontrado 2 veces en otras notas del blog). Se revisaron todas las frases del tipo "revise/lea/conozca..." del archivo: la única que no lleva link (línea 25, "conozca las 5 causas reales detrás de este ausentismo") no es una promesa de enlace externo — se refiere a las 5 causas que la misma nota desarrolla a continuación, así que no aplica. Esta nota pasa limpia este chequeo.
- **JSON-LD:** completo y coherente con el frontmatter.
- Sin colisión de rutas; ambos archivos de imagen existen en disco.
- **Reglas de marca: sin violaciones textuales.** Tono "usted" consistente y enfoque B2B en todo el cuerpo — el único matiz a señalar es el de la imagen inline ya descrito, que es un asunto visual, no de redacción.

### Posicionamiento general / arquitectura de la web

- **La categoría "Resultados y ROI" es consistente** con su nota hermana `negocios-en-ingles-porque-fracasan-cursos` (misma categoría), aunque, igual que se señaló en esa auditoría, el contenido (causas de abandono) encajaría igual de bien bajo un eje de "implementación".
- **Relacionados automáticos: sí conectan con la nota más solapada, en ambas direcciones.** Confirmado con las fechas reales de las 6 notas de "Resultados y ROI": el widget de esta nota mostrará `precio-curso-ingles-empresas`, `negocios-en-ingles-porque-fracasan-cursos` y `roi-capacitacion-idiomas` — es decir, el widget conecta automáticamente a esta nota con su hermana más solapada (y, según ya se documentó, el widget de esa hermana también muestra a esta). Es el mismo comportamiento sano ya visto en la auditoría anterior: dentro de una misma categoría con 6 miembros, el algoritmo sí cubre el solapamiento real. Lo que sigue sin cubrir es a `blog-errores-cursos-idiomas-empresas`, que por vivir en otra categoría nunca aparecerá en este widget pese a compartir 2 de las 5 causas.

---

## Recomendación final sobre la pieza pilar (verificación adicional hecha para poder responder ahora)

Para poder dar una recomendación firme en esta misma auditoría, se verificó el dato pendiente: se intentó abrir el PDF del IMCO citado en `blog-errores-cursos-idiomas-empresas` (`2015_Documento_completo_Ingles_es_posible.pdf`). El fetch directo solo devolvió metadatos del archivo, pero una búsqueda de la página oficial del estudio (`imco.org.mx/ingles-es-posible-propuesta-de-una-agenda-nacional/`) confirmó que es un reporte real y específico —no una portada genérica— cuyo hallazgo central es, efectivamente, que el dominio del inglés tiene una relación medida con la competitividad nacional, la productividad laboral y el salario individual. **Es una fuente genuinamente más sólida que la de esta nota (Gartner, página de producto) y que la de `negocios-en-ingles-porque-fracasan-cursos` (ya corregida hacia Forbes, un artículo específico pero con una cita parafraseada).**

**Sí, recomiendo que `blog-capacitacion-en-ingles-programa-fantasma` sea la pieza pilar del clúster**, por su desarrollo, estructura y enlazado interno superiores (ver "Relación con contenido existente"). Pero recomiendo estas 2 rutas distintas para las otras 2 notas, porque no son simétricas:

- **`negocios-en-ingles-porque-fracasan-cursos`: fusionar completa y retirar con redirect 301.** Es la nota más corta y la que menos aporta de las 3; sus 3 causas ya están cubiertas, con más profundidad, en esta nota. Su único contenido no redundante es la cita de Forbes ya corregida (4 razones: expectativas irreales, falta de apoyo organizacional, falta de práctica, tecnología inadecuada) — vale la pena migrarla porque es una fuente más específica que la Gartner de esta nota.
- **`blog-errores-cursos-idiomas-empresas`: NO fusionar completa — es un ángulo genuinamente distinto (auditoría de proveedor antes de firmar contrato, no diagnóstico de por qué un programa ya en marcha fracasa) y vive en otra categoría por una razón real, no por accidente.** Solo migrar su contenido único:
  1. **El "Error 5" (elegir un proveedor de contenido en vez de un aliado estratégico)** — no tiene equivalente en ninguna de las otras 2 notas del clúster; es un ángulo nuevo, no una repetición.
  2. **La cita del IMCO** (ahora verificada) — reemplazar o complementar la cita débil de Gartner de esta nota con esta fuente, más específica y ya confirmada.
  3. **La referencia al MCER como marco de evaluación** (dentro de su "Error 4") — le da a la causa 5 de esta nota ("medir asistencia en lugar de desempeño") un marco concreto y verificable que hoy no tiene.
  4. **(Opcional) El escenario narrativo de apertura** ("Imagine este escenario: contrata a un proveedor... para el tercer mes, el nivel de abandono supera el 60%...") — es un recurso de apertura más vívido que el de esta nota; podría reforzar el primer párrafo si se quiere.
  El resto de `blog-errores-cursos-idiomas-empresas` (errores 1-4, la introducción, el cierre) es redundante con esta nota o con `negocios-en-ingles-porque-fracasan-cursos` y no aporta nada nuevo que migrar.

No apliqué ningún cambio de contenido, frontmatter ni redirects — esto es una recomendación para tu confirmación, igual que se hizo con el clúster de "nivel de inglés".

## Otros hallazgos marcados para tu confirmación (nada aplicado todavía)

**1. `featuredImageAlt` no describe la imagen real (una persona en computadora vs. un grupo de 5 en clase presencial con papel y lápiz).**

Recomendaría corregirlo para describir la escena real (una clase grupal de inglés con ejercicios de verbos, banderas de Reino Unido y Estados Unidos sobre la mesa). No propongo el texto exacto porque conviene resolverlo junto con la fusión recomendada arriba, no antes.

**2. Cita de Gartner — página de producto, no fuente verificable de la afirmación atribuida.**

Dado que ya se verificó que la cita del IMCO en `blog-errores-cursos-idiomas-empresas` es sólida, la recomendación concreta es reemplazar esta cita de Gartner por esa (ver la lista de migración arriba), en vez de buscar una tercera fuente. No lo apliqué todavía — depende de que confirmes la fusión.

**3. (Menor) Imagen inline con tono visual más cercano a consumo individual que a capacitación corporativa grupal.**

Si se decide conservar esta nota como pilar (como se recomienda), valdría la pena reemplazar esa imagen por una que muestre un contexto de equipo/empresa, para mantener consistencia visual con la regla de marca B2B.

Quedo a la espera de tu confirmación antes de tocar cualquier archivo.
