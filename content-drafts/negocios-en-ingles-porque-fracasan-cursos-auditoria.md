## Notas de auditoría

Nota auditada: `content/blog/negocios-en-ingles-porque-fracasan-cursos.md`, publicada 2026-06-24, categoría "Resultados y ROI".

### Relación con contenido existente

**Hallazgo principal: los 3 argumentos de esta nota tienen un gemelo casi literal en `blog-capacitacion-en-ingles-programa-fantasma.md`, y 2 de los 3 se repiten además en `blog-errores-cursos-idiomas-empresas.md`.** Es el mismo patrón de cannibalización ya documentado en el clúster de "nivel de inglés por área" (ya resuelto), pero aquí aparece sobre un argumento distinto: "por qué el programa/curso fracasa o se abandona".

| Argumento de esta nota | `blog-capacitacion-en-ingles-programa-fantasma` | `blog-errores-cursos-idiomas-empresas` |
|---|---|---|
| **1. "Métodos escolares que no sirven"** — gramática abstracta en vez de negocios reales | Razón 2, "Falta de alineación con los objetivos reales del negocio" — casi la misma idea ("exigirle a un gerente... resolver ejercicios sobre cómo ordenar comida en un restaurante") | Error 1, "Buscar clases genéricas en vez de inglés de negocios" — el mismo argumento, con el mismo ejemplo tipo ("aprender el verbo to be desde cero") |
| **2. "Falta de datos y métricas constantes"** — solo revisar asistencia, no desempeño | Razón 5, "Medir la asistencia en lugar de medir el desempeño" — es literalmente el mismo argumento, con la misma distinción (asistencia ≠ aprendizaje) | Error 4, "Confundir revisar la asistencia con medir el progreso real" — tercera vez que aparece la misma distinción, ahora con marco MCER explícito |
| **3. "Horarios rígidos"** — el colaborador debe elegir entre su trabajo y la clase, y el trabajo siempre gana | Razón 4, "La rigidez de horarios frente a la operación diaria" — mismo argumento, casi la misma frase ("en el 100% de los casos, la operación va a ganar" / "las tareas del día a día siempre ganarán la prioridad") | Error 3, "Obligar al equipo a adaptarse a un solo formato" — cuarta repetición del mismo argumento base (rigidez de modalidad/horario) |

Es decir: **el argumento "asistencia no es desempeño" aparece en las 3 notas**, y **el argumento "horarios rígidos hacen perder la clase frente al trabajo" también aparece en las 3**. No es un solapamiento parcial — son, en la práctica, 3 notas que reparten el mismo inventario de 3-4 causas de fracaso bajo 3 títulos distintos ("por qué fracasan los programas", "el programa fantasma", "errores al contratar"). `negocios-en-ingles-porque-fracasan-cursos` es la más corta y la que menos desarrolla cada punto (577 palabras contra ~950 de `blog-capacitacion-en-ingles-programa-fantasma` y ~1,100 de `blog-errores-cursos-idiomas-empresas`), por lo que de las 3 es la que aporta menos matiz nuevo.

**¿Hay algo genuinamente único en esta nota?** Poco: el dato "70% falla antes de los 6 meses" (frente al "80% de abandono" de `programa-fantasma`) y la cita de Forbes (ver GEO) son lo único que no se repite en las otras 2. El resto es el mismo inventario de causas, más comprimido.

**Enlazado interno: cero, en las 3 direcciones, y con un enlace fantasma añadido.** Ninguna de las 3 notas se enlaza con las otras 2 (`blog-capacitacion-en-ingles-programa-fantasma` sí enlaza a `blog-errores-cursos-idiomas-empresas` y a `blog-nivel-ingles-empresas-areas`, pero ninguna de las 2 le devuelve el enlace, y ninguna de las 3 apunta a esta nota). Además, **esta nota tiene un enlace prometido que nunca se escribió**: línea 29, *"Recuerde que ya definimos esto en nuestra guía sobre qué es el inglés empresarial real. Un artículo clave para auditar el servicio de su proveedor actual."* — no hay ningún `[texto](url)` ahí, es texto plano que promete un enlace y no lo entrega. (Nota: encontré el mismo patrón exacto — una oración que promete "revisar" o "leer" algo sin el markdown del link — en `aprender-idiomas-nearshoring-mexico.md` línea 66, durante la auditoría de `mejores-idiomas-para-empresas`. Con este segundo caso, ya no parece un error aislado sino un patrón recurrente de redacción en el blog: vale la pena una revisión general de las 26 notas restantes buscando frases "revise/lea/conozca nuestra guía sobre X" sin el enlace real, no solo corregir estos 2 casos puntuales.)

### AEO

- **Ningún H2 está en forma de pregunta** — "1. Métodos escolares que no sirven...", "2. La falta de datos...", "3. Horarios rígidos..." son títulos numerados declarativos. El formato numerado sí ayuda a la extraibilidad (una causa por encabezado), pero ninguno calca la pregunta real que un lector haría ("¿por qué mi equipo abandona las clases de inglés?").
- **No hay una oración-resumen autocontenida y aislada cerca del inicio.** El primer párrafo (línea 19) encadena 6 oraciones cortas de tipo "Por lo tanto / Al contrario / Por esta razón" sin ninguna en negritas que funcione sola como respuesta — es de las aperturas menos citables de las notas auditadas hasta ahora (compárese con `blog-nivel-ingles-empresas-areas` o `mejores-idiomas-para-empresas`, que sí abren con una frase en negritas autocontenida).
- El dato "70% de los programas falla antes de los 6 meses" (en el `title`, no en el cuerpo) es, en cambio, un buen fragmento extraíble por sí solo — pero está en el frontmatter/H1, no repetido ni reforzado como oración independiente dentro del cuerpo.

### GEO

Se abrieron las 2 fuentes citadas en el único bloque de cita de la nota (línea 43):

- **Forbes — la más sólida de las citas verificadas en todas las auditorías de este blog hasta ahora, aunque con una salvedad de formato.** El link específico (`forbes.com/councils/.../four-reasons-why-business-training-fails-and-how-to-prevent-it/`) sí es un artículo real y accesible (a diferencia de HBR, Consejo de Europa y las 2 URLs del WEF, que fallaron o bloquearon el acceso). El artículo desarrolla 4 razones reales (expectativas irreales, falta de apoyo organizacional, falta de práctica, tecnología inadecuada) cuya conclusión general — la capacitación falla cuando no se diagnostica bien el problema ni se prepara el contexto de trabajo — respalda razonablemente el espíritu de la afirmación citada. **Pero la cita en bloque no es una frase textual del artículo**: es un resumen/paráfrasis de esa conclusión, presentado con formato de blockquote como si fuera una cita literal. Es un caso intermedio: mejor que las citas fabricadas de otras notas (aquí sí hay una fuente real y verificable detrás), pero el formato de "cita textual" sigue sin ser honesto sobre lo que realmente es (una paráfrasis editorial de la idea general del artículo).
- **Segundo link redundante a la portada de Forbes** (`https://www.forbes.com/`, misma línea 43, justo después del link al artículo específico) — no aporta nada que el primer link no cubra ya, y repite el mismo patrón de "doble link, uno específico y uno genérico" ya encontrado y corregido en la cita del WEF de `mejores-idiomas-para-empresas`. Aquí no es tan grave porque el link específico sí existe y es válido, pero el segundo link a la portada es superfluo.
- **Autoridad/contexto:** mismo patrón sistémico de las auditorías anteriores.

### SEO

- **Title vs. H1:** `title`/H1 = "Por qué el 70% de los programas de capacitación en idiomas fracasan antes de los 6 meses"; `seoTitle` = "Negocios en inglés: ¿Por qué fracasan los programas? | %%sitename%%". No compiten, pero el `focusKeyword` ("negocios en inglés") se siente forzado en el `seoTitle` — el tema real de la nota es "por qué se abandonan los programas de capacitación", no "cómo hacer negocios en inglés"; el keyword parece elegido para encajar con el clúster de otras notas de la categoría más que por ser la frase que un lector realmente buscaría para este contenido específico.
- **Densidad del focusKeyword:** "negocios en inglés" aparece 5 veces en ~577 palabras (~0.87%) — moderada, algo más alta que el promedio del resto de notas auditadas, aunque no llega a sentirse repetitiva en la lectura.
- **Estructura de encabezados:** 3 H2 numerados + 1 H2 de cierre + 1 H3 de CTA, para solo ~577 palabras — es la nota más corta de las 3 del clúster de "fracaso/abandono", con la menor profundidad por causa (cada una recibe 1-2 párrafos cortos).
- **Longitud coherente con `readingTime`:** ~577 palabras ÷ ~200 ppm ≈ 2.9 min, declarado `readingTime: 3`. Sin discrepancia.
- **Anchors internos: cero enlaces internos reales** (el único intento, línea 29, es el enlace fantasma ya señalado). Es la nota con el enlazado interno más pobre de las auditadas hasta ahora — ni siquiera un enlace roto, directamente ausente.
- **`seoTitle` con sufijo correcto:** usa `| %%sitename%%`.
- **Tono "usted": consistente**, sin tuteo en todo el cuerpo.

### SEO técnico

- **`featuredImageAlt` no describe la imagen real — verificado abriendo el archivo, y aquí el desajuste es más notorio que en casos anteriores.** El alt dice: *"Grupo de profesionales en una oficina moderna colaborando y preparándose para hacer negocios en inglés con éxito."* La imagen real muestra a dos mujeres en un escritorio con un mapa mundial y banderas de Reino Unido, Canadá y Estados Unidos, en el acto específico de **entregar un pasaporte** de una persona a otra — es una escena que se lee como una agencia de viajes o una gestoría de visas/migración, no una sesión de colaboración de "hacer negocios en inglés". No hay ninguna acción de "colaborar" visible, y el objeto central (un pasaporte) no tiene relación evidente con capacitación corporativa.
- **La imagen inline tiene el mismo problema, con la misma escena repetida.** Alt: *"Cursos de inglés para empresas con S-Peak."* (genérico, patrón ya señalado en notas anteriores) — pero además la foto (3 personas, mapa mundial, mismas 3 banderas, una entregando un documento doblado a otra) es prácticamente la misma composición que la portada: de nuevo parece un intercambio de documento de viaje/trámite, no una clase o sesión de capacitación en inglés. Las 2 imágenes de esta nota parecen ser material de stock para un tema de viajes/trámites migratorios, reutilizado para un artículo sobre capacitación corporativa.
- **Sin el bug de "Extracto:" en `excerpt`** — es un texto propio y limpio.
- **Sin el error de acento "ingles/inglés" en texto visible** — las 3 apariciones de "ingles" sin tilde están en el slug y la ruta de imagen (donde no llevan tilde por convención), no en prosa. Segunda nota consecutiva que pasa limpia este chequeo.
- **JSON-LD:** completo y coherente con el frontmatter.
- Sin colisión de rutas; ambos archivos de imagen existen en disco.
- **Reglas de marca: sin violaciones.** Tono "usted" consistente y enfoque B2B sin excepciones — todo el texto se dirige a "su organización", "su equipo", "sus colaboradores", sin ningún ejemplo de consumo individual.

### Posicionamiento general / arquitectura de la web

- **La categoría "Resultados y ROI" es consistente con su nota hermana más cercana** (`blog-capacitacion-en-ingles-programa-fantasma`, misma categoría), aunque el contenido real (causas de abandono/fracaso de un programa) encaja igual de bien en un eje de "implementación" que en uno de "resultados" — es una categorización defendible, no incorrecta.
- **Relacionados automáticos: sí conectan con la nota más solapada, a diferencia del clúster anterior.** La categoría tiene 6 notas; excluyendo esta, el widget mostrará (por fecha) `precio-curso-ingles-empresas`, `blog-capacitacion-en-ingles-programa-fantasma` y `roi-capacitacion-idiomas`. A diferencia del clúster de "nivel de inglés" (donde el algoritmo excluía sistemáticamente a la nota más relevante por ser la más antigua), aquí sí muestra a `blog-capacitacion-en-ingles-programa-fantasma` — el widget cubre lo que el enlazado editorial no cubre. Sigue siendo cierto que el enlazado manual (dentro del cuerpo del texto) es inexistente entre las 2, y que `blog-errores-cursos-idiomas-empresas` (la tercera nota del mismo argumento, en otra categoría) nunca aparecerá en este widget por estar en "Selección de proveedor".

---

## Hallazgos marcados para tu confirmación (nada aplicado todavía)

**1. (Estratégico) Solapamiento de fondo entre esta nota, `blog-capacitacion-en-ingles-programa-fantasma` y, parcialmente, `blog-errores-cursos-idiomas-empresas`.**

Mismo patrón que el clúster de "nivel de inglés por área" ya resuelto: 3 notas repartiendo el mismo inventario de causas (horarios rígidos, asistencia vs. desempeño, contenido genérico vs. de negocios). No propongo una ruta de fusión todavía — señalo el hallazgo para que decidas si aplica el mismo tratamiento (pilar + redirect, o diferenciar ángulos) que se usó con el clúster anterior. Dado que esta nota es la más corta y la que menos aporta de las 3, sería la candidata más obvia a fusionarse hacia `blog-capacitacion-en-ingles-programa-fantasma` si se opta por consolidar, pero es tu decisión editorial, no la tomo por mi cuenta.

**2. Enlace interno fantasma (línea 29) — sin destino real.**

Recomendaría decidir qué nota se pretendía enlazar ahí ("nuestra guía sobre qué es el inglés empresarial real, un artículo clave para auditar el servicio de su proveedor actual" describe bastante bien a `blog-errores-cursos-idiomas-empresas`, que sí trata sobre auditar proveedores) y completar el enlace con el markdown correcto, en vez de dejarlo como texto suelto. No lo apliqué porque depende de la decisión del punto 1 (si esta nota se fusiona, el enlace ya no aplicaría).

**3. `featuredImageAlt` e imagen inline no coinciden con lo que muestran los archivos reales — ambas imágenes parecen ser material de stock de viajes/trámites migratorios, no de capacitación corporativa.**

Recomendaría reemplazar ambas imágenes por material que sí muestre una sesión de capacitación o una situación de negocios en inglés (no un intercambio de pasaporte), o, si se deciden mantener, ajustar el alt para describir lo que realmente aparece. No propongo un texto de alt de reemplazo porque en este caso el problema no es solo de redacción del alt — es que las imágenes mismas no ilustran el tema del artículo.

**4. Segundo link redundante a la portada de Forbes (línea 43).**

Recomendaría quitar el link genérico a `https://www.forbes.com/` y dejar solo el link al artículo específico, que ya cumple la función de la cita.

**5. (Menor) La cita en bloque de Forbes es una paráfrasis, no una frase textual del artículo.**

Si se quiere mantener el formato de blockquote como cita literal, valdría la pena ajustar la frase a algo más cercano a lo que el artículo dice textualmente, o cambiar el formato de blockquote por una atribución narrativa ("según Forbes, la capacitación falla cuando...") que no implique una cita palabra por palabra.

**6. (Transversal, no de esta nota) Patrón recurrente de enlaces internos prometidos sin escribir.**

Van 2 casos encontrados en 2 auditorías distintas (este y el de `aprender-idiomas-nearshoring-mexico`). Recomendaría una revisión puntual de las 26 notas restantes buscando frases del tipo "revise/lea/conozca nuestra guía sobre X" sin el markdown de enlace real, en vez de esperar a encontrarlas una por una en auditorías futuras.

Quedo a la espera de tu confirmación antes de tocar cualquier archivo.
