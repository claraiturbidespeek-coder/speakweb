## Notas de auditoría

Nota auditada: `content/blog/ingles-de-negocios-ejecutivos.md`, publicada 2026-06-16, categoría "Diagnóstico de necesidades". Es la más reciente y la más corta de las 3 notas del clúster (`readingTime: 3`, ~592 palabras de cuerpo — casi la mitad que `blog-nivel-ingles-empresas-areas` y `clases-ingles-empresas-niveles-puesto`). Esta auditoría da por establecido que `blog-nivel-ingles-empresas-areas.md` será la pieza pilar y que esta nota se retira con redirect 301; el objetivo aquí es identificar con precisión qué migrar.

### Relación con contenido existente

**Confirmado: mismo argumento de fondo, mismos 3 bloques, con el guion más comprimido de las 3 notas.** "Área de ventas: el inglés de negocios comercial" / "Área de operaciones: el inglés de negocios técnico" / "Dirección General: inglés para negocios estratégicos" es la misma segmentación (comercial → técnico-operativo → dirección) que en `blog-nivel-ingles-empresas-areas` y `clases-ingles-empresas-niveles-puesto`, con casi los mismos ejemplos: "gestión de crisis" y "reportes de métricas/incidencias" aparecen en el bloque técnico de las 3 notas; "juntas de consejo" y "presentar resultados ante inversionistas" aparecen en el bloque de dirección de esta nota y en el de `blog-nivel-ingles-empresas-areas` casi palabra por palabra.

**Contenido genuinamente único — inventario completo, no solo los 3 ejemplos ya mencionados de pasada:**

1. **La sección "Ejemplos prácticos" completa (líneas 59-67) — es el hallazgo más valioso de esta nota.** Los 3 pares de frases "antes/después" (*"Let's meet later" → "Let's circle back this afternoon"*; *"I will think about it" → "I need to evaluate the leverage of this deal"*; *"We have a big problem" → "We face a bottleneck in our workflow"*) son el único contenido de las 3 notas que da un ejemplo concreto y accionable de vocabulario real, con traducción. Ninguna de las otras 2 notas tiene nada parecido — ambas se quedan en la descripción abstracta de habilidades ("debe dominar negociaciones complejas") sin bajar nunca a una frase real. Este es exactamente el tipo de contenido extraíble y demostrable que vale la pena conservar.
2. **Los paréntesis bilingües de vocabulario dentro de los bullets** ("ROI (Retorno de inversión)", "Value Proposition (Propuesta de valor)", línea 33) — un formato de mini-glosario que tampoco aparece en las otras 2 notas.
3. **El enlace interno a `capacitacion-idiomas-retencion-desempeno-talento`** (línea 49, "la capacitación en idiomas potencia la retención y desempeño del talento en empresas globales") — es un enlace que ninguna de las otras 2 notas del clúster tiene, y conecta con una nota fuera del clúster (categoría "Resultados y ROI"), lo cual amplía el enlazado interno del futuro artículo pilar si se conserva.
4. **La cita al Consejo de Europa como fuente primaria del marco (línea 23), en vez de Cambridge English (una entidad certificadora que lo adopta).** Es una variación de fuente, no de argumento — el contenido de fondo (el MCER/CEFR como escala de niveles) es el mismo que ya citan las otras 2 notas. Ver GEO abajo antes de decidir si vale la pena migrar esta cita en particular.

**Todo lo demás — la segmentación en 3 bloques con sus bullets de "habilidades clave"** (pitches de venta, negociación de contratos, gestión de crisis, licitaciones, juntas de consejo, comunicación interna, negociaciones complejas) **es redundante con el contenido que ya existe, y en más detalle, en `blog-nivel-ingles-empresas-areas`.** No hay nada en esos bullets que la pilar no cubra ya con al menos la misma profundidad.

**Enlazado con las otras 2 notas del clúster: cero**, confirmando el patrón ya documentado — esta nota no enlaza a `blog-nivel-ingles-empresas-areas` ni a `clases-ingles-empresas-niveles-puesto`, y ninguna de las 2 enlaza hacia esta.

### AEO

- **Ningún H2 está en forma de pregunta** ("Área de ventas...", "Área de operaciones...", "Dirección General...", "Ejemplos prácticos", "Potencie sus roles clave...") — en esto se parece más a `blog-nivel-ingles-empresas-areas` (que tampoco tenía H2 en forma de pregunta) que a `clases-ingles-empresas-niveles-puesto` (que sí tenía 2). **Pero sí hay una pregunta real escondida como texto de cuerpo, no como encabezado:** línea 61, "¿Qué es un ejemplo real de inglés de negocios en la oficina?", que introduce justo la sección más extraíble de la nota (los 3 ejemplos). Es una oportunidad perdida de AEO: esa pregunta debería ser el H2, no una oración bajo el H2 genérico "Ejemplos prácticos".
- **No hay una oración-resumen autocontenida cerca del inicio.** El primer párrafo (línea 19) encadena 5 oraciones cortas de planteamiento ("El desarrollo del talento global requiere alta precisión... Por lo tanto... Por esta razón...") sin una sola frase que funcione sola como respuesta. Es el arranque menos citable de las 3 notas del clúster.
- **La sección de ejemplos (líneas 61-66) es, con diferencia, el contenido más extraíble de toda la nota** — pares cortos de "evite/use" con traducción, formato ideal para que un answer engine lo cite tal cual. Vale la pena preservar este formato en la migración, no solo el contenido.

### GEO

- **Consejo de Europa (línea 23) — no se pudo verificar directamente: la URL devolvió 403 (bloqueo de bot) en dos intentos**, el mismo tipo de bloqueo ya encontrado con el link del BID en la auditoría de nearshoring. No pude confirmar con el contenido real de la página si dice literalmente que "las empresas globales utilizan los criterios oficiales del Consejo de Europa" y que el marco "define los niveles de comunicación necesarios para el entorno laboral". Lo que sí es de dominio público y verificable indirectamente: el Consejo de Europa es efectivamente el creador original del MCER/CEFR (Cambridge English, citado en las otras 2 notas, es una entidad certificadora que lo adopta, no su creador) — en ese sentido citar directamente al Consejo de Europa es, en principio, una fuente más autorizada que citar a Cambridge. Pero la afirmación específica de que el marco fue diseñado pensando en "el entorno laboral" es una extensión no verificada: el MCER es un marco educativo general (describe destrezas de comprensión, producción e interacción en cualquier contexto), no uno diseñado específicamente para el ámbito corporativo — esa idea es una interpretación de la nota, no un hecho confirmado en la fuente. Recomendaría verificar este link por otra vía (búsqueda web o acceso sin bloqueo de bot) antes de decidir si se conserva la cita en la migración.
- **Autoridad/contexto:** mismo patrón sistémico de las 3 auditorías anteriores.

### SEO

- **Title vs. H1:** `seoTitle` = "Inglés de negocios para ejecutivos: Habilidades clave | %%sitename%%"; `title`/H1 = "Inglés de negocios: habilidades clave según su rol ejecutivo". Coherentes, comparten los mismos términos clave sin conflicto.
- **Densidad del focusKeyword:** "inglés de negocios" aparece 4 veces en ~592 palabras de cuerpo (~0.7% de densidad) — moderada, no forzada.
- **Estructura de encabezados:** 4 H2 y 3 H3 para solo ~592 palabras — proporcionalmente es la nota con más encabezados por palabra de las 3, lo cual la hace sentir fragmentada/superficial en cada bloque (cada H2 de segmentación tiene apenas 2-3 líneas de desarrollo antes de sus bullets).
- **Longitud:** ~592 palabras, declarado `readingTime: 3` (592 ÷ ~200 ppm ≈ 3 min) — consistente, sin discrepancia, pero es notablemente más corta que las otras 2 notas del mismo argumento (941 y 1,106 palabras) — la pieza menos desarrollada de las 3.
- **Anchors internos:** 1 solo enlace interno (línea 49), descriptivo y bien dirigido (a una nota fuera del clúster, sobre retención de talento). Igual de escaso que en las otras 2.
- **`seoTitle` con sufijo correcto:** usa `| %%sitename%%`.
- **Tono "usted": consistente, sin tuteo.** Se revisó el cuerpo completo — no aparece ninguna forma de "tú".

### SEO técnico

- **`featuredImageAlt` sí describe razonablemente la imagen real — el mejor caso de las 3 notas del clúster en este punto.** El alt actual ("Ejecutiva participando en una videollamada internacional y aplicando su inglés de negocios con un equipo de trabajo") coincide con lo que muestra la foto real: una persona de espaldas frente a una laptop en una videollamada con 4 personas, con una bandera de Reino Unido en el escritorio. No es un hallazgo — se reporta como comparación positiva frente a los 2 casos anteriores, donde el alt no coincidía con la imagen.
- **El alt de la imagen inline sí tiene un problema, doble:** el texto es *"Clases de ingles para empresas s-peak"* (línea 57) — (a) es genérico, no describe la imagen real (una sala de juntas con varias personas sentadas viendo a alguien presentar/explicar frente a un rotafolio, una escena de capacitación grupal) y (b) **repite el mismo error de acento "ingles" sin tilde** encontrado en `clases-ingles-empresas-niveles-puesto`, aquí en un solo lugar. Además, la frase ni siquiera coincide con el tema de esta nota específica (que es "inglés de negocios por rol ejecutivo", no "clases de inglés para empresas" en general) — parece un alt genérico reutilizado de otra plantilla, sin adaptar.
- **Campo `excerpt`: sin el bug de "Extracto:"** — es un texto propio y limpio.
- **Sin el error de acento "ingles/inglés" en el frontmatter** (a diferencia de `clases-ingles-empresas-niveles-puesto`, donde aparecía en 4 campos): `excerpt`, `featuredImageAlt`, `seoTitle`, `seoDescription` y `focusKeyword` de esta nota usan "inglés" con tilde correctamente. El único lugar donde falta la tilde en todo el archivo es el alt de la imagen inline ya señalado.
- **JSON-LD:** completo y coherente con el frontmatter.
- Sin colisión de rutas; ambos archivos de imagen existen en disco.
- **Regla de marca — tono B2B: mayormente respetado, con un matiz a señalar.** El cuerpo mantiene el marco corporativo ("su plantilla", "cada rol", "sus vendedores", "sus ingenieros"), pero la sección "Ejemplos prácticos" (líneas 61-66) cambia de registro: es una lista de consejos de vocabulario en formato "evite decir X, use Y" sin ningún sujeto corporativo explícito en esas 3 líneas — es el mismo formato que usan apps de aprendizaje de idiomas orientadas a consumidor individual (tips genéricos de vocabulario). No llega a ser una violación clara de la regla B2B (la oración de cierre, línea 67, sí ata el ejemplo de vuelta a "sus líderes"), pero es el punto del cuerpo donde el tono corporativo se diluye más. Vale la pena mantenerlo en mente si se migra esta sección a la pilar: conviene reforzar el marco corporativo alrededor de los 3 ejemplos al integrarlos (p. ej., encabezarlos con "así suena un director cuando negocia en inglés de negocios" en vez de dejarlos como consejos sueltos).

### Posicionamiento general / arquitectura de la web

- **Categoría "Diagnóstico de necesidades": correcta** para el tema.
- **Relacionados automáticos:** para esta nota, el widget mostrará (por fecha descendente entre las 4 restantes) `evaluacion-de-ingles-ejecutivos`, `mejores-idiomas-para-empresas` y `clases-ingles-empresas-niveles-puesto` — es decir, **sí conecta al lector con la otra nota duplicada del clúster** (`clases-ingles-empresas-niveles-puesto`), pero, una vez más, **nunca con `blog-nivel-ingles-empresas-areas`**, que al ser la más antigua de las 5 queda excluida del widget de cualquiera de las otras 4 notas de la categoría. Confirma, por tercera vez consecutiva en este clúster, que la nota elegida como pilar no recibe ningún enlace automático desde sus hermanas — el enlazado hacia ella tendrá que ser manual sí o sí, no algo que el widget resuelva solo.

---

## Qué migrar a `blog-nivel-ingles-empresas-areas.md` y qué descartar (Ruta A ya decidida)

**Migrar:**

1. **La sección completa "Ejemplos prácticos"** (líneas 59-67): los 3 pares de frases "evite decir / use" con traducción, más la pregunta que los introduce ("¿Qué es un ejemplo real de inglés de negocios en la oficina?" — recomendaría subirla a H2 propio en la pilar, no dejarla como texto de cuerpo, para ganar el punto de AEO que aquí se pierde) y la línea de cierre ("el vocabulario correcto transforma la percepción profesional de sus líderes"). Es, de las 3 notas, el único contenido que aporta algo que la pilar hoy no tiene: ejemplos concretos y accionables en vez de descripciones abstractas de habilidades.
2. **El enlace interno a `capacitacion-idiomas-retencion-desempeno-talento`** (línea 49) — trasladarlo a la pilar como un enlace nuevo, dado que hoy la pilar solo tiene un enlace interno en todo el cuerpo.
3. **(Opcional, de menor prioridad) Los paréntesis bilingües de vocabulario** ("ROI / Value Proposition") — solo si al integrar el bloque de Ventas de la pilar se quiere enriquecerlo con 1-2 términos bilingües; no es indispensable, es un detalle de formato más que de contenido nuevo.

**Descartar por ser redundante con el contenido que ya existe en la pilar (o en `clases-ingles-empresas-niveles-puesto`, si esa fusión se hace en paralelo):**

- Toda la segmentación en 3 bloques (Ventas/Operaciones/Dirección) con sus bullets de "habilidades clave" — la pilar ya cubre el mismo argumento con el mismo nivel de detalle o más.
- La cita al Consejo de Europa (línea 23) — mismo argumento de fondo que la cita a Cambridge English que ya tiene la pilar (post-corrección de la auditoría anterior); no aporta un hecho nuevo, solo una fuente alternativa para el mismo dato, y esta en particular no se pudo verificar por el bloqueo de bot. No recomendaría sustituir la cita ya corregida de la pilar por esta sin poder confirmarla primero.
- El párrafo introductorio (líneas 19-21) — es planteamiento genérico ya cubierto por la apertura de la pilar.

Con esto, una vez migrado el punto 1 (y su equivalente en `clases-ingles-empresas-niveles-puesto`, ya identificado en su propia auditoría: la traducción A1-C2 a impacto operativo y el argumento "el B2 es una trampa"), el archivo `ingles-de-negocios-ejecutivos.md` puede darse de baja y redirigirse 301 a `blog-nivel-ingles-empresas-areas` sin perder ningún contenido genuinamente útil para el lector.

No apliqué ningún cambio de contenido, frontmatter ni enlazado. Quedo a la espera de tu confirmación antes de tocar cualquier archivo.
