## Notas de auditoría

Nota auditada: `content/blog/mejores-idiomas-para-empresas.md`, publicada 2026-06-16, categoría "Diagnóstico de necesidades". Nota: esta auditoría ocurre después de haber retirado `clases-ingles-empresas-niveles-puesto.md` e `ingles-de-negocios-ejecutivos.md` (fusionadas hacia `blog-nivel-ingles-empresas-areas.md`), lo que cambia la composición de la categoría — ver "Posicionamiento general" para el efecto concreto que esto tiene sobre esta nota en particular.

### Relación con contenido existente

**Sí hay solapamiento real con `aprender-idiomas-nearshoring-mexico.md`, aunque están en categorías distintas** ("Diagnóstico de necesidades" esta, "Nearshoring y expansión" la otra) y publicadas con 3 semanas de diferencia (esta el 2026-06-16, la otra el 2026-07-06). Comparando los idiomas y el encuadre industrial que cada una desarrolla:

| Idioma | `mejores-idiomas-para-empresas` (esta) | `aprender-idiomas-nearshoring-mexico` |
|---|---|---|
| Alemán | "Vital para el sector de la ingeniería automotriz y la manufactura pesada"; "abre las puertas a los consorcios europeos" | "Pilares automotrices y aeroespaciales"; clústeres industriales del Bajío y el norte |
| Portugués | "Clave para expandir operaciones... hacia Brasil"; "acelerador comercial indiscutible... Brasil concentra gran parte del movimiento económico latinoamericano" | "La llave del mercado latinoamericano"; "Brasil es el principal socio comercial de la región" |
| Francés | "Muy valorado en la industria aeronáutica, farmacéutica y en el mercado de lujo" | "Pilares automotrices y **aeroespaciales**" (mismo sector aeronáutico mencionado) |

3 de los 4 idiomas de esta nota (alemán, portugués, francés) reaparecen en la otra con el mismo sector industrial de referencia (automotriz/aeroespacial para alemán y francés, Brasil para portugués) y frases de idéntico registro ("Brasil es el principal socio comercial" / "Brasil concentra gran parte del movimiento económico"). La diferencia real: la otra nota añade el **mandarín** como idioma genuinamente distinto (esta nota solo lo menciona de pasada, "alemán o japonés", sin desarrollarlo), y encuadra todo explícitamente en el fenómeno del nearshoring, mientras esta nota lo plantea como un diagnóstico general (origen de inversionistas, clientes, sector) sin depender del nearshoring como causa única. No es un duplicado tan cerrado como el clúster de segmentación por nivel (ya resuelto), pero si alguien busca "qué idioma además del inglés necesita mi empresa en México", ambas notas de S-Peak compiten por esa misma pregunta con argumentos casi intercambiables en 3 de 4 idiomas.

**Enlazado interno: unidireccional y hacia la nota equivocada del clúster de nearshoring.** Esta nota sí enlaza al fenómeno de nearshoring (línea 31, "el fenómeno del **nearshoring**"), pero apunta a `nearshoring-mexico-ingles-empresas` (la nota que define qué es el nearshoring en general), no a `aprender-idiomas-nearshoring-mexico` (la que realmente comparte el argumento de "qué idiomas aprender por el nearshoring"). Es decir, el enlace existe, pero no conecta con la nota que de verdad se solapa. Y en la dirección contraria: `aprender-idiomas-nearshoring-mexico` tampoco enlaza hacia esta nota.
- **Hallazgo colateral, fuera de esta nota pero detectado al comparar:** `aprender-idiomas-nearshoring-mexico.md` (línea 66) tiene una oración que promete un enlace y no lo entrega: *"Lo invitamos a leer nuestro análisis técnico sobre cómo elegir el curso de idiomas ideal para su empresa..."* sin ningún `[texto](url)` real — es texto plano, no un link roto, simplemente nunca se escribió el markdown del enlace. Lo señalo porque lo detecté comparando ambas notas, aunque el archivo que habría que corregir es el otro, no el auditado aquí.

### AEO

- **2 de los 5 H2 sí están en forma de pregunta:** "¿Qué idiomas piden las empresas hoy en día?" y "¿Cuáles son los idiomas más utilizados en los negocios?" — mejor proporción que `blog-nivel-ingles-empresas-areas` (0 de 4) e `ingles-de-negocios-ejecutivos` (0 de 4), aunque no tan consistente como `clases-ingles-empresas-niveles-puesto` (2 de 3).
- **Sí hay una oración-resumen razonable cerca del inicio:** línea 19, en negritas — "Muchas compañías asumen que el inglés es la única opción universal. Sin embargo, esta idea puede limitar la expansión de su negocio en mercados de alta especialización técnica." Es autocontenida y aparece en el primer párrafo, mejor ubicación que en varias de las notas ya auditadas.
- **La lista de 4 idiomas con su sector (líneas 39-42) y el checklist de 3 pasos (líneas 58-72) son el contenido más extraíble de la nota** — formato bullet/numerado corto con una idea por línea, bien logrado para que un answer engine lo cite.

### GEO

Se intentó abrir las 2 fuentes externas citadas — **ambas bloquearon el acceso (403), pero el problema de fondo no depende de poder leerlas:**

- **Foro Económico Mundial — citado con 2 URLs distintas, ninguna a un artículo específico.** La nota enlaza primero a `https://es.weforum.org/` (línea 21) y luego, en la atribución del mismo blockquote (línea 25), a `https://www.weforum.org/` — dos dominios distintos de la misma organización, ambos apuntando a la portada general, no a un reporte o artículo puntual. Las dos solicitudes devolvieron 403 (bloqueo de bot), el mismo tipo de bloqueo ya visto con el Consejo de Europa. Pero incluso sin poder leer el contenido, el problema estructural ya es visible: **una portada de sitio, por definición, no puede respaldar una cita textual fija** — cambia constantemente y no aloja un texto pinneado como "Las habilidades lingüísticas son esenciales para el comercio global...". Es el mismo patrón, y en un sentido más descuidado, que la cita a HBR de `clases-ingles-empresas-niveles-puesto` (que al menos usaba un solo dominio consistente): aquí ni siquiera hay consistencia entre los 2 links de la misma cita.
- **Autoridad/contexto:** mismo patrón sistémico de las auditorías anteriores.
- **Nota metodológica para las próximas auditorías:** de las citas verificadas hasta ahora en las 5 notas de este clúster/categoría, ninguna ha resultado ser una cita textual respaldada por un artículo específico y accesible — todas caen en alguno de 3 patrones: (a) página real pero que no dice lo que se le atribuye (Cambridge English antes de corregir, EF EPI suavizado), (b) bloqueo de bot que impide verificar (Consejo de Europa, y ahora WEF), o (c) link a una portada genérica sin artículo real (HBR, y ahora WEF con el agravante de los 2 dominios). Vale la pena señalarlo como una práctica editorial a corregir de raíz (exigir siempre la URL del artículo/reporte específico, nunca la portada de la organización), no solo caso por caso.

### SEO

- **Title vs. H1:** `title`/H1 = "¿Alemán, francés o inglés? Cómo identificar qué idiomas para empresas necesita su equipo"; `seoTitle` = "Los mejores idiomas para empresas: Guía de elección | %%sitename%%". Coherentes, sin conflicto ni canibalización de metadatos.
- **Densidad del focusKeyword:** "idiomas para empresas" aparece 3 veces en ~809 palabras de cuerpo (~0.37%) — baja pero no forzada, similar al patrón de `blog-nivel-ingles-empresas-areas` (evita la repetición mecánica que sí se vio en `clases-ingles-empresas-niveles-puesto`).
- **Estructura de encabezados:** 5 H2 y 3 H3 para ~809 palabras — proporción razonable.
- **Longitud coherente con `readingTime`:** ~809 palabras ÷ ~200 ppm ≈ 4 min, declarado `readingTime: 4`. Sin discrepancia.
- **Anchors internos:** 3 enlaces internos, los 3 descriptivos y verificados contra el título real de su destino (`capacitacion-idiomas-personalizada`, `nearshoring-mexico-ingles-empresas`, `como-implementar-capacitacion-en-ingles-empresas` — los 3 coinciden con el tema real de la nota enlazada). Es, de las notas auditadas hasta ahora, la que mejor cuida este punto — ninguna de las 3 anteriores tenía más de 1-2 anchors, y aquí los 3 son precisos.
- **`seoTitle` con sufijo correcto:** usa `| %%sitename%%`.
- **Tono "usted": consistente en todo el cuerpo**, sin ninguna forma de tuteo.

### SEO técnico

- **`featuredImageAlt` tiene un error de tecleo real, no de contenido: le falta la primera letra.** El valor actual es *"os ejecutivos corporativos analizando la estrategia de idiomas para empresas frente a un mapa mundial."* — le falta la "D" inicial ("**D**os ejecutivos..."). Se confirma que es un error de tecleo y no una descripción distinta porque `app/components/CentroDeRecursos.tsx` (línea 74) usa exactamente el mismo texto para esta misma nota, pero ahí sí está completo: *"Dos ejecutivos corporativos analizando la estrategia de idiomas para empresas frente a un mapa mundial."* — dos copias del mismo alt, una perdió la primera letra. En cuanto al contenido: se abrió el archivo real y sí coincide razonablemente con la descripción (dos personas con laptops, headsets y objetos que evocan distintos países —un avión de juguete, un globo terráqueo, la Torre Eiffel— frente a un mapa mundial de fondo), aparte del error tipográfico.
- **Alt de la imagen inline es genérico, no incorrecto.** *"Idiomas para negocios en S-Peak"* (línea 44) no describe lo que la foto realmente muestra (una persona escribiendo en su laptop junto a un portalápices con banderas de Alemania, Italia, Francia, España y Reino Unido) — mismo patrón de "resumen del tema, no descripción de la imagen" ya señalado en notas anteriores, sin llegar a ser una descripción falsa.
- **Sin el bug de "Extracto:" en `excerpt`** — es un texto propio y limpio.
- **Sin el error de acento "ingles/inglés" en texto visible.** Las 2 apariciones de "ingles" sin tilde en el archivo (líneas 31 y 48) están dentro de URLs/slugs (`nearshoring-mexico-ingles-empresas`, `como-implementar-capacitacion-en-ingles-empresas`), donde no llevan tilde por convención de slugs — no es el error tipográfico encontrado en `clases-ingles-empresas-niveles-puesto`. Es la primera nota del clúster que pasa limpia este chequeo.
- **JSON-LD:** completo y coherente con el frontmatter.
- Sin colisión de rutas; ambos archivos de imagen existen en disco.
- **Reglas de marca: sin violaciones.** Tono "usted" consistente (confirmado arriba) y enfoque B2B sin excepciones — todos los escenarios están planteados desde la perspectiva de la organización ("su equipo", "su plantilla", "sus inversionistas", "su nómina"), sin ningún ejemplo dirigido a un consumidor individual.

### Posicionamiento general / arquitectura de la web

- **La categoría "Diagnóstico de necesidades" es defendible** — el checklist de 3 pasos y el enfoque en "auditar antes de elegir" encajan con el resto de la categoría, aunque el tema de fondo (qué idioma, no qué nivel) es un eje distinto al que comparten las otras notas de esa categoría.
- **Hallazgo nuevo, consecuencia directa de la fusión reciente: el widget de relacionados ahora rellena con contenido de otra categoría.** Tras retirar `clases-ingles-empresas-niveles-puesto` e `ingles-de-negocios-ejecutivos`, la categoría "Diagnóstico de necesidades" quedó con solo 3 notas: esta, `blog-nivel-ingles-empresas-areas` y `evaluacion-de-ingles-ejecutivos`. Como `obtenerRelacionados()` solo activa el filtro estricto por categoría cuando hay 3 o más pares disponibles (y aquí, excluyendo esta nota, solo quedan 2), el widget de esta nota necesariamente rellena con el post más reciente de todo el blog sin importar su tema: mostrará `evaluacion-de-ingles-ejecutivos`, `blog-nivel-ingles-empresas-areas` y, de relleno, **`precio-curso-ingles-empresas`** (el post más reciente del blog completo en este momento) — una nota sobre precios, sin relación temática con "qué idioma elegir". No es un error de esta nota ni de la fusión en sí (la fusión era la decisión correcta para el clúster de nivel/segmentación), pero es un efecto secundario real y verificable que vale la pena que sepas: la categoría "Diagnóstico de necesidades" quedó pequeña, y mientras no sume una cuarta nota, sus 3 miembros mostrarán relleno de otras categorías en su widget de relacionados.

---

## Campos y hallazgos marcados para tu confirmación (nada aplicado todavía)

**1. `featuredImageAlt` — falta la letra inicial "D" (hallazgo más concreto de esta auditoría).**

Propongo corregir de:
> "os ejecutivos corporativos analizando la estrategia de idiomas para empresas frente a un mapa mundial."

A:
> "Dos ejecutivos corporativos analizando la estrategia de idiomas para empresas frente a un mapa mundial."

Por qué: es un error de tecleo verificable (la versión completa y correcta ya existe, textualmente, en `app/components/CentroDeRecursos.tsx`), no una descripción a rediscutir — y afecta accesibilidad y el `alt` del `og:image` en redes sociales, que reutiliza este mismo campo.

**2. Citas al Foro Económico Mundial — ambas apuntan a portadas genéricas, no a un artículo o reporte específico.**

Recomendaría reemplazar los 2 links por uno solo hacia un reporte específico del WEF sobre habilidades lingüísticas/comercio global (si existe uno que respalde la afirmación), o retirar la cita en bloque si no se encuentra una fuente puntual verificable. No propongo una URL de reemplazo porque no pude verificar el contenido real por el bloqueo de acceso (403) en ambos dominios — dejo la decisión y la búsqueda de la fuente correcta para ti.

**3. (Menor) El enlace a "nearshoring" (línea 31) apunta a la nota que define el fenómeno en general, no a la que realmente comparte el argumento de idiomas.**

Si se quiere reforzar el puente con `aprender-idiomas-nearshoring-mexico` (con quien esta nota sí se solapa en contenido, ver "Relación con contenido existente"), valdría la pena añadir un segundo enlace interno hacia esa nota específicamente, en vez de —o además de— el que ya existe hacia `nearshoring-mexico-ingles-empresas`. No lo apliqué porque implica decidir si se quiere señalar el solapamiento con un enlace o resolverlo de otra forma (diferenciar ángulos, fusionar); lo dejo para tu confirmación, igual que se hizo con el clúster de nivel.

**4. (Fuera de esta nota, detectado de paso) `aprender-idiomas-nearshoring-mexico.md` línea 66 promete un enlace que nunca se escribió** ("...nuestro análisis técnico sobre cómo elegir el curso de idiomas ideal para su empresa..." sin `[texto](url)`). Lo señalo aquí porque lo encontré comparando ambas notas, pero la corrección le corresponde a ese archivo, no a este.

Quedo a la espera de tu confirmación antes de tocar cualquier archivo.
