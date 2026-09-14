## Notas de auditoría

### Relación con contenido existente

Comparado contra `content/blog/blog-ingles-corporativo-mexico-precio.md` (mismo tema de fondo: costo del inglés corporativo), hay solapamiento real pero no cannibalización de keyword exacta:

- **Keywords:** `precio-curso-ingles-empresas` usa `focusKeyword: "cursos de inglés precios"`; el otro usa `focusKeyword: "Inglés corporativo"`. Son términos distintos, así que no compiten por el mismo match exacto. Pero ambos H1/seoTitle apuntan a la misma intención de búsqueda ("cuánto cuesta un curso de inglés para mi empresa"), por lo que en la práctica sí compiten por el mismo clúster de consultas ambiguas tipo "precio curso inglés corporativo México".
- **Cifras inconsistentes entre ambas notas:** las dos dan rangos de precio para los mismos tres segmentos de mercado, pero no coinciden:
  - Apps/autoaprendizaje: $300–$1,500 MXN/mes (esta nota) vs. $300–$800 MXN/mes (la otra).
  - Academias tradicionales: $2,000–$5,000 MXN/mes por colaborador (esta nota) vs. $450–$850 MXN/**hora** (la otra).
  - B2B corporativo: $15,000–$45,000 MXN/mes por grupo (esta nota) vs. $1,200+/hora o iguala mensual sin cifra (la otra).
  Las unidades no siempre son comparables (mes vs. hora), pero un lector — o un motor de respuesta — que cruce ambas notas de S-Peak encuentra números distintos para la misma pregunta. Esto pesa más en GEO/AEO que en SEO clásico: dos piezas del mismo sitio afirmando cosas distintas sobre el mismo dato es exactamente el tipo de inconsistencia que hace que un LLM desconfíe de citar cualquiera de las dos.
- **Enlazado interno: es unidireccional.** Esta nota enlaza a `blog-ingles-corporativo-mexico-precio` (línea 45), pero esa nota no enlaza de vuelta a esta. Como están en categorías distintas ("Resultados y ROI" vs. "Selección de proveedor"), el widget automático de "Artículos Relacionados" (`obtenerRelacionados` en `lib/posts.ts`, que solo cruza por `categorySlug`) nunca las va a conectar entre sí. El único puente hoy es ese enlace de ida. Vale la pena reportar que la nota más antigua debería enlazar de vuelta, por ejemplo desde su H2 "Rangos de precios del inglés corporativo en México".

### AEO

- La nota sí tiene estructura extraíble: tres modalidades con rango de precio en bullets, tres ventajas del B2B, tres riesgos de elegir la opción barata. Ese formato de lista corta con cifras es justo lo que un answer engine puede citar sin reescribir.
- Los H2 están redactados como afirmaciones o frases compuestas con la keyword forzada al final ("¿Cuánto cuesta la formación?: factores y cursos de inglés precios", "Por qué evaluar los cursos de inglés: precios vs. ROI real"), no como preguntas naturales que calquen una consulta real. Solo el primero trae un signo de interrogación, y aun así queda enmascarado por el segundo tramo del título.
- Falta una respuesta directa y autocontenida cerca del inicio. El primer párrafo abre citando a Deloitte antes de dar cualquier cifra; el dato concreto (los tres rangos de precio) aparece hasta el primer H2, en bullets, sin una oración-resumen tipo "un curso de inglés para empresas en México cuesta entre $300 y $45,000 MXN mensuales según la modalidad". Esa oración-resumen es la que un answer engine preferiría extraer como snippet.
- Comparado con la nota hermana, esta última sí abre con una oración directa de disparidad de precios ("desde licencias digitales de $300 pesos hasta consultorías de decenas de miles de pesos") antes de entrar en cualquier cita — un patrón más amigable para AEO que el de esta nota.

### GEO

- La cita de Deloitte (línea 19) enlaza a `deloitte.com/latam/es/about/story/nuestros-marketplaces/deloitte-mexico.html`, que es la página "Acerca de Deloitte México" — institucional, sin datos ni el "análisis sobre desarrollo de talento y presupuestos de capacitación corporativa" que el texto le atribuye. No hay forma de verificar la afirmación ("retención de personal significativamente mayor") contra lo que hay en esa URL. Es una cita decorativa, no una fuente real.
- Contraste directo: la nota hermana cita a El Economista con blockquote textual y atribución a un artículo específico y verificable sobre presupuestos de capacitación. Esa es la barra a la que esta nota debería llegar.
- Si el objetivo es que un LLM cite esta nota como fuente de cifras, las cifras que sí trae ($300–$1,500 / $2,000–$5,000 / $15,000–$45,000 MXN) son un buen "chunk" autocontenido — pero no llevan fecha ni fuente propia (no dice "según cotizaciones de N proveedores en 2026" ni similar), así que se leen como estimaciones internas de S-Peak, no como dato de mercado auditable.
- Autoría: solo aparece "Andrea Ríos" como nombre, sin credenciales visibles ni bio enlazada en la nota (esto es igual en las 26 notas del blog, no es un problema exclusivo de esta pieza — lo menciono como contexto, no como hallazgo nuevo). `dateModified` es igual a `datePublished` por diseño del template (ver comentario en `app/[slug]/page.tsx`), así que tampoco hay señal de "actualizado el [fecha]" — también sistémico.

### SEO

- **Title vs. H1:** coherentes, no compiten. `seoTitle` = "Cursos de inglés precios: cuánto cuesta capacitar a tu equipo"; H1 = "Precio de un curso de inglés: cuánto cuesta capacitar a tu equipo". Comparten el segundo tramo tal cual; el primero solo cambia el orden de palabras de la keyword.
- **Meta description duplicada del excerpt:** `seoDescription` y `excerpt` son idénticos, carácter por carácter. No hay una meta description propia con CTA distinto al excerpt editorial. 126 caracteres — hay margen (Google trunca cerca de 155–160) para una versión con llamada a la acción más directa.
- **Densidad de la keyword:** la frase "cursos/curso de inglés precios" aparece 11 veces en un cuerpo de ~750-800 palabras (~5% de densidad solo de esa frase). Se nota forzada — varias oraciones están construidas para encajar la keyword en ese orden inusual ("Analizar en cursos de inglés precios e inversión...", "buscar en cursos de inglés precios transparentes...") en vez de una redacción natural.
- **Estructura de encabezados:** 4 H2, cero H3. Las tres modalidades de precio viven como bullets bajo un solo H2, sin subtítulo propio por modalidad. La nota hermana, sobre el mismo contenido (tres modalidades de precio), sí les da un H3 a cada una ("1. Plataformas de Autoaprendizaje", "2. Academias Tradicionales", "3. Consultoría Lingüística B2B"). Esa jerarquía más profunda facilita que Google/IA extraigan cada modalidad como unidad independiente.
- **Longitud:** ~750-800 palabras de cuerpo (readingTime: 5) vs. ~950-1,000 palabras de la nota hermana (readingTime: 6) sobre el mismo tema. Es la pieza más corta de las dos que compiten por esta intención de búsqueda.
- **Anchors internos:** buenos — "presupuesto de capacitación de inglés empresarial" y "el retorno de inversión en la capacitación de idiomas" son descriptivos y no genéricos.

### SEO técnico

- **featuredImageAlt actual no describe la imagen.** El texto ("Guía comparativa de cursos de inglés precios y ROI para la capacitación corporativa en empresas.") es un resumen del artículo, no un alt de imagen. Abrí el archivo real (`public/images/blog/precio-curso-ingles-empresas-portada.webp`): muestra a un hombre grabándose con el celular en un tripié, sonriendo, sosteniendo una bandera del Reino Unido, con un pizarrón de gramática de fondo ("I/you/they/we → work", "he/she/it → works") y libretas/carpetas sobre un escritorio. Nada en la imagen es "guía", "comparativa" ni "ROI". Este alt falla tanto accesibilidad (no describe lo que hay) como SEO de imagen (Google Images indexa contra el contenido visual real). Además este mismo texto se reutiliza tal cual como `alt` del `og:image` (`app/[slug]/page.tsx` línea ~108), así que el desajuste también llega a las previews de redes sociales.
- **Alt faltante en la nota hermana, no en esta:** `content/blog/blog-ingles-corporativo-mexico-precio.md` línea 67 tiene una imagen inline con alt vacío: `![](/images/blog/blog-ingles-corporativo-mexico-precio-01.webp)`. Es un hallazgo real pero fuera del archivo que se está auditando — lo reporto porque la tarea pedía revisar "si faltan atributos alt en alguna otra imagen".
- **JSON-LD:** el bloque `BlogPosting` que genera la plantilla es completo y coherente con el frontmatter de esta nota (headline, description, fechas, autor, `publisher` por `@id`, `articleSection`, imagen). No encontré inconsistencias.
- **seoTitle sin sufijo de sitio:** esta es la única nota del blog cuyo `seoTitle` no trae ningún sufijo de marca. El commit `fcb6c52` ("Corrige separadores y sufijos de los titles del blog") estandarizó 16 notas al patrón `... | %%sitename%%` (token de Yoast que `lib/posts.ts` expande a "S-Peak" en render). Otras 8 notas más antiguas quedaron con el patrón legado `... | S-Peak` literal. Esta nota, migrada después de ese commit, no tiene ninguno de los dos — el `seoTitle` termina en "...capacitar a tu equipo" sin sufijo. Es una inconsistencia real con la convención vigente del sitio.
- No encontré problemas de ruta: el slug `precio-curso-ingles-empresas` no colisiona con ninguna carpeta de `app/` (la propia guarda de colisión de `lib/posts.ts` lo habría reventado en build), y el archivo de imagen destacada existe en disco.

### Posicionamiento general / arquitectura de la web

- La categoría "Resultados y ROI" es defendible — la nota cierra argumentando que la opción barata no tiene ROI — pero el núcleo real del contenido (comparar precios/modalidades) es tan de "Resultados y ROI" como de "Selección de proveedor", que es donde vive su nota hermana sobre el mismo tema. Esa categorización cruzada es la causa raíz de que el widget de relacionados nunca las conecte (ver arriba).
- Por el mismo motivo, los "Artículos Relacionados" automáticos de esta nota serán 3 de: `roi-capacitacion-idiomas`, `blog-capacitacion-en-ingles-programa-fantasma`, `capacitacion-idiomas-retencion-desempeno-talento`, `capacitacion-idiomas-cultura-corporativa`, `negocios-en-ingles-porque-fracasan-cursos` — ninguno es la pieza temáticamente más cercana (`blog-ingles-corporativo-mexico-precio`), que queda fuera del widget por estar en otra categoría.
- Ambas notas forman de facto el clúster de "precio/costo de inglés corporativo", pero no hay nada estructural que las marque como clúster: categorías distintas, `tags: []` en las dos, y un solo enlace manual unidireccional. Si la intención es que este clúster funcione como tal para SEO/GEO, no basta con la categoría — hace falta el enlace de vuelta (ya señalado) y, opcionalmente, una etiqueta compartida.

---

## Recomendaciones para los campos `# REVISAR` (no aplicadas, pendientes de tu confirmación)

**focusKeyword** — propongo cambiar de `"cursos de inglés precios"` a **`"cuánto cuesta un curso de inglés para empresas"`**.

Por qué: la keyword actual tiene orden de palabras poco natural en español (calca el orden inglés "courses prices"), aparece forzada 11 veces en el cuerpo, y no se diferencia claramente de la intención que ya cubre `blog-ingles-corporativo-mexico-precio` (focusKeyword "Inglés corporativo"). La propuesta:
- Es la forma en que alguien de RH realmente buscaría esto.
- Ya coincide casi literalmente con encabezados existentes en el artículo (el H2 "¿Cuánto cuesta la formación?..." y el H1 mismo).
- Es una frase-pregunta, lo cual ayuda directamente al hallazgo de AEO sobre falta de preguntas reales en los encabezados.
- Se distingue de "Inglés corporativo" de la nota hermana, reduciendo el riesgo de que Google trate ambas piezas como si compitieran por la misma consulta.

Alternativa más cercana a la keyword actual si prefieres cambiar menos: `"precio de un curso de inglés para empresas"` (misma idea, sin forma de pregunta).

**featuredImageAlt** — propongo cambiar de la caption reciclada del JSON-LD a algo que describa lo que la imagen realmente muestra:

`"Profesor de inglés grabando una clase virtual con una bandera del Reino Unido, frente a un pizarrón con conjugaciones verbales."`

Por qué: describe el contenido visual real (verificado abriendo el archivo de imagen) en vez del tema del artículo, cumple con el propósito de accesibilidad de un alt (qué hay en la imagen, no de qué trata la página), y evita que la misma inconsistencia se propague al `og:image` de redes sociales, que reutiliza este mismo campo.

Quedo a la espera de tu confirmación antes de tocar el frontmatter de la nota publicada.
