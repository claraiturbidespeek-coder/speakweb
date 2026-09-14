## Notas de auditoría

Nota auditada: `content/blog/blog-nearshoring-mexico-ingles-empresas.md`. No es una migración nueva: ya existía en el repo y recientemente se le fusionaron 2 bloques de contenido (3 escenarios cotidianos, 3 consecuencias de no capacitar) tomados de la nota equivalente de WordPress (`nearshoring-que-es`) que se decidió no migrar por ser casi duplicada.

### Relación con contenido existente

**Consistencia interna tras la fusión — hay redundancia real, no solo aparente:**

- El bloque de "3 escenarios cotidianos" (línea 45-49) se insertó justo antes de los H3 "La eliminación de fricciones operativas" y "Capacidad de negociación y cierre de contratos internacionales". Esos dos H3 ya existían y desarrollan casi los mismos conceptos con otras palabras: "videollamadas y reuniones de seguimiento" (escenario 1) es la misma idea que "juntas virtuales de seguimiento (daily standups)" del H3 siguiente; "correos y minutas ejecutivas... reportes de avance" (escenario 2) es la misma idea que "redacten reportes de incidencias" del mismo H3. El lector encuentra la idea, y dos párrafos después la vuelve a leer en otras palabras. El único escenario que sí aporta algo genuinamente nuevo es el 3 ("SLA" y "términos de pago" no se mencionan en el H3 de negociación que le sigue, que solo habla de licitaciones y objeciones legales).
- El bloque de "3 consecuencias de no capacitar" (línea 67-71) es más grave: la "consecuencia 1" ("Paros operativos por mala interpretación... retrabajos y mermas de producción") repite casi literalmente la línea 55, preexistente: "una barrera de idioma... se traduce directamente en retrasos de producción, malentendidos en las especificaciones de calidad y, eventualmente, en la rescisión de contratos millonarios." Es el mismo argumento (falla de idioma → falla de producción) declarado dos veces en la misma nota, a ~700 palabras de distancia.
- En ambos casos la fusión no rompe el tono ni el formato (bullets con negrita + explicación, igual que el resto de la nota), pero sí introduce repetición de idea que un lector atento notará. Recomendaría revisar si conviene recortar la línea 55 o ajustar la "consecuencia 1" para que no se solapen.

**Relación con las 3 notas hermanas de "Nearshoring y expansión":**

- `aprender-idiomas-nearshoring-mexico.md` — ángulo distinto y complementario: qué idiomas además del inglés (portugués, mandarín, alemán, francés) demanda el mercado. No compite por la misma intención de búsqueda.
- `errores-comunicacion-nearshoring-en-mexico.md` — ángulo distinto (5 errores de comunicación en el primer año), pero con un solapamiento definicional menor: esa nota también explica "¿Nearshoring que es y para qué sirve?" en su propio H2 antes de enlazar a esta nota como la explicación canónica ("*Si quiere saber más sobre nearshoring, puede visitar nuestro blog...*"). No es duplicado, pero si esta nota es el "pilar" oficial de la definición, la otra nota redefine el concepto en vez de solo enlazar y seguir. Es un patrón preexistente, no algo que cambió con la fusión — lo señalo porque la tarea pedía revisar solapamiento real.
- `expansion-global-empresas-claves.md` — tema tangencial (expansión internacional en general, no nearshoring específicamente). Sin solapamiento real.
- **Enlazado unidireccional:** esta nota no enlaza a ninguna de las 3 hermanas en el cuerpo (solo enlaza a `blog-nivel-ingles-empresas-areas` y `blog-clases-idiomas-empresas-proveedor`, de otro clúster temático). Solo `errores-comunicacion-nearshoring-en-mexico` enlaza hacia esta. Ver más detalle en "Posicionamiento general".

### AEO

- **Encabezados:** de 4 H2, solo 1 tiene forma de pregunta ("Entendiendo el fenómeno: ¿Qué es el nearshoring y por qué beneficia a México?"), y aun así viene precedido de un rótulo declarativo ("Entendiendo el fenómeno:") que diluye la pregunta. Los otros 3 H2 son declarativos o de llamado a la acción ("El idioma como infraestructura humana...", "Cómo preparar a su organización...", "Asegure su lugar en el mercado global con S-Peak"). Los H3 son igual de declarativos ("Paso 1...", "Paso 2...", "La eliminación de fricciones operativas"). Ninguno de los dos bloques fusionados agregó un encabezado propio — viven como bullets bajo H2/H3 ya existentes, así que un answer engine no tiene un título tipo "¿En qué situaciones el inglés es crítico en el nearshoring?" al que anclar esa respuesta.
- **Oración-resumen autocontenida:** la más citable está en la línea 27, dentro de un párrafo: "la relocalización que realizan las empresas de sus cadenas de producción y servicios hacia países cercanos a su mercado de consumo final." Es una definición limpia y extraíble, pero no está al inicio absoluto (aparece después de un párrafo de planteamiento del problema) ni está aislada como oración independiente — está incrustada a media frase ("Para definir el nearshoring que es una de las estrategias... debemos comprenderlo como...").
- **Keyword forzada donde debería ir la definición:** esa misma línea 27 es también donde se inserta literalmente el focusKeyword exacto ("el nearshoring que es una de las estrategias comerciales más adoptadas..."), y la construcción gramatical se nota forzada para calzar la keyword en ese orden — es menos natural que si la oración dijera simplemente "el nearshoring es una de las estrategias...". Esto perjudica la extractabilidad: un answer engine que copie el fragmento tal cual reproduciría una frase gramaticalmente rara.

### GEO

- **Cita de la Secretaría de Economía (línea 29) — verificada, no respalda lo citado.** Se abrió la URL (`gob.mx/se/acciones-y-programas/competitividad-y-normatividad-inversion-extranjera-directa`): es una página administrativa con definición genérica de IED y fichas de datos bilaterales descargables (2006-2026), sin ningún texto sobre "cifras récord" de nearshoring ni sobre México como "principal socio comercial" de EE. UU. Es el mismo patrón que el caso Deloitte de la auditoría anterior: cita decorativa a una página institucional que no contiene la afirmación específica que se le atribuye.
- **Cita del BID (línea 33) — el dato es correcto y verificable, aunque el link no pudo abrirse directo.** La URL devolvió 403 al intentar leerla (bloqueo de bot, no necesariamente link roto). Se verificó la cifra por otra vía (búsqueda web): el BID efectivamente calcula que el nearshoring podría añadir hasta US$78,000 millones anuales en exportaciones de América Latina y el Caribe (US$64,000M en bienes + US$14,000M en servicios), y México es el mayor beneficiario individual con US$35,728M, muy por encima de Brasil (US$7,844M) y Argentina (US$3,906M). Esto confirma textualmente lo que la nota afirma ("México el receptor del mayor porcentaje de este beneficio"). Es la cita más sólida de las dos.
- **Autoridad/contexto:** mismo patrón sistémico ya señalado en la auditoría anterior — autor "Andrea Ríos" sin credenciales ni bio enlazada, y `dateModified` = `datePublished` siempre por diseño de plantilla (no específico de esta nota).
- Los dos bloques fusionados (escenarios, consecuencias) son afirmaciones operativas razonables pero sin cita ni dato propio — consistente con el resto del cuerpo, que tampoco cita fuente para sus afirmaciones no atribuidas a SE/BID. No es un problema nuevo introducido por la fusión, solo continúa el patrón existente.

### SEO

- **Title vs. H1:** idénticos por diseño de plantilla (`app/[slug]/page.tsx` usa `post.title` directo como H1; `seoTitle` solo cambia el `<title>` de la pestaña/metadata). No hay conflicto.
- **Densidad del focusKeyword:** "nearshoring" aparece 22 veces en ~1,204 palabras de cuerpo (~1.8% de densidad) — razonable, no apilada. Pero la forma exacta del focusKeyword ("nearshoring que es") solo aparece una vez en el cuerpo (línea 27) y de forma gramaticalmente forzada, como se señaló en AEO.
- **Estructura de encabezados:** 4 H2 y 5 H3 para ~1,200 palabras — jerarquía razonable para la extensión actual.
- **Longitud desactualizada:** el cuerpo ahora tiene ~1,204 palabras tras sumar los dos bloques fusionados (antes de la fusión era sensiblemente menor). El frontmatter sigue declarando `readingTime: 5`; a ritmo de lectura estándar (~200 palabras/minuto) da ~6 minutos. Ver campo marcado para confirmación abajo.
- **Anchors internos:** los 2 enlaces existentes ("cómo determinar el nivel de inglés que requiere cada área de su empresa", "cómo elegir el proveedor ideal de clases de idiomas para empresas") son descriptivos, no genéricos, y llevan a piezas realmente complementarias. Ninguno enlaza al propio clúster de nearshoring (ver Posicionamiento).

### SEO técnico

- **`featuredImageAlt` e imagen inline: están intercambiados entre sí.** Se abrieron ambos archivos de imagen:
  - `featuredImage` (portada) muestra a una profesionista sonriente sosteniendo varias banderas nacionales (Canadá, Italia, Estados Unidos, Reino Unido, Alemania, Francia). El `featuredImageAlt` actual dice: *"Mapa conceptual o entorno industrial que ilustra de forma clara el nearshoring qué es y cómo impacta a las empresas en México."* — no describe esta imagen en absoluto.
  - La imagen inline (`...-01.webp`, línea 39) muestra dos personas señalando un mapa mundial impreso en un póster/infografía de negocios. Su alt actual dice: *"Una profesionista corporativa en un entorno multicultural rodeada de banderas de diferentes países..."* — eso es justo lo que muestra la portada, no esta imagen.
  - Conclusión: no es que falte un alt (la nota confirma que "ya sabemos de una pendiente en este archivo" — pero el problema real no es un alt vacío, es que los dos alt están cruzados entre las dos imágenes). Afecta accesibilidad y SEO de imagen, y el `featuredImageAlt` además se reutiliza como alt del `og:image` en redes sociales (`app/[slug]/page.tsx`), así que el desajuste también llega a las previews sociales.
- **`seoTitle` consistente con la convención vigente:** usa el patrón `... | %%sitename%%` (token de Yoast que `lib/posts.ts` expande a "S-Peak"), igual que la mayoría de las notas migradas después del commit que estandarizó los sufijos. No hay inconsistencia aquí.
- **JSON-LD:** el bloque `BlogPosting` que genera la plantilla toma `headline`, `description`, fechas, autor, `publisher` por `@id`, `articleSection` e imagen directamente del frontmatter actual; no encontré campos vacíos ni inconsistentes.
- Sin colisión de rutas (`blog-nearshoring-mexico-ingles-empresas` no coincide con ninguna carpeta de `app/`), y ambos archivos de imagen (`-portada.webp`, `-01.webp`) existen en disco.

### Posicionamiento general / arquitectura de la web

- **Categoría "Nearshoring y expansión" es correcta** — coincide con las 3 notas hermanas y con el tema real de la nota.
- **Relacionados automáticos: funcionan bien en este caso.** `obtenerRelacionados()` (`lib/posts.ts`) filtra por `categorySlug` y toma hasta 3; como existen exactamente 4 notas en esta categoría (esta + las 3 hermanas), el widget siempre mostrará las 3 hermanas completas como relacionadas — es el caso ideal, sin relleno de otra categoría (contraste con el caso de la auditoría anterior, donde una categorización cruzada rompía el widget).
- **Pero el enlazado manual no aprovecha ese clúster:** siendo esta la nota "pilar" (la que define qué es el nearshoring), no enlaza en el cuerpo a ninguna de las 3 hermanas — solo `errores-comunicacion-nearshoring-en-mexico` enlaza hacia ella. El widget automático cubre la navegación, pero el enlazado editorial (anchors con contexto, no solo una tarjeta al final) sigue siendo unidireccional. Si el objetivo es reforzar el clúster para SEO/GEO, valdría la pena añadir 1 enlace interno desde esta nota hacia alguna de las hermanas (p. ej. desde la sección de consecuencias hacia "errores-comunicacion-nearshoring-en-mexico", que profundiza justo en eso).

---

## Campos y hallazgos marcados para tu confirmación (nada aplicado todavía)

**1. `featuredImageAlt` y el alt de la imagen inline — propuesta de corrección (están cruzados):**

- `featuredImageAlt` (portada, mujer con banderas) → propongo: `"Profesionista sonriente sosteniendo banderas de distintos países —Canadá, Italia, Estados Unidos, Reino Unido, Alemania y Francia— que representa la diversidad de mercados que exige el nearshoring."`
- Alt de la imagen inline (`...-01.webp`, mapa mundial señalado) → propongo: `"Dos personas señalando un mapa mundial en una infografía de negocios, representando la relocalización de cadenas de producción propia del nearshoring."`

**2. `readingTime: 5`** probablemente desactualizado tras sumar ~500 palabras en la fusión (cuerpo actual ~1,204 palabras ≈ 6 min). Propongo actualizar a `6`, si confirmas que el criterio de cálculo del sitio es ~200 palabras/minuto.

**3. Redundancia de contenido tras la fusión** (línea 55 vs. bloque de "consecuencia 1", línea 69): mismo argumento repetido con palabras distintas. Recomendaría decidir si se recorta la línea 55 o se ajusta la consecuencia 1 para diferenciarla, no aplicarlo sin tu visto bueno porque toca texto que ya existía antes de esta ronda de cambios.

**4. Cita de la Secretaría de Economía (línea 29)** no respaldada por el contenido real de la URL enlazada (verificado). Recomendaría buscar una fuente SE más específica o retirar la afirmación puntual que se le atribuye, igual que se resolvió el caso Deloitte en la nota anterior.

**5. (Menor, opcional) Enlace interno faltante hacia el clúster de nearshoring** — ninguna de las 3 notas hermanas está enlazada desde el cuerpo de esta. No es un error, es una oportunidad de arquitectura que señalo para que decidas si aplicarla.

Quedo a la espera de tu confirmación antes de tocar el frontmatter o el cuerpo de la nota.
