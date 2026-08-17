@AGENTS.md
# Reglas de trabajo

## Git
- No ejecutes `git add`, `git commit`, `git push` ni ningún comando de git.
- No despliegues a producción bajo ninguna circunstancia, ni con aprobación verbal.
- Al terminar una tarea, deja los cambios en el working directory y lista los archivos
  que tocaste. El commit y el push los hace el equipo manualmente desde terminal.

## Flujo de trabajo
- Antes de escribir código en tareas estructurales o no triviales, entrega un plan.
- Cuando entregues un plan, espera aprobación explícita antes de ejecutarlo.
  No asumas aprobación por silencio.
- Para cambios acotados (un valor, un texto, una clase), ejecuta directamente.
- Si durante la ejecución encuentras algo que el plan no contemplaba, detente
  y repórtalo antes de improvisar una solución.

## Fidelidad de diseño
- Fase actual: copia fiel. No refactorices, no optimices, no "limpies" markup.
- El proyecto NO usa Tailwind. Se evaluó y se descartó: sin clases de utilidad,
  lo único que aportaba era un reset que preferimos escribir nosotros. No lo
  reintroduzcas ni escribas clases de utilidad.
- Todo el estilo es CSS propio, organizado en capas:
    app/styles/tokens.css         los valores de diseño, única fuente de verdad
    app/styles/base.css           el reset y los estilos de elemento, únicos
    app/styles/interacciones.css  las clases que consulta el JavaScript
    app/styles/patrones.css       los patrones compartidos (fase 1a)
  Lo propio de una página va en su módulo CSS. Nada de hojas globales nuevas.
- No inventes valores fuera del sistema: usa los tokens de tokens.css. Si un
  valor no está, no lo escribas suelto: decide si toca añadirlo al sistema.
- Jerarquía de referencia cuando dos páginas resuelven lo mismo distinto:
  1. /equipo/ventas-y-marketing/  2. /idioma/ingles-para-empresas/  3. el resto.
- Si algo se ve duplicado, mal escrito o mejorable, repórtalo. No lo corrijas.

## Alcance
- Haz solo lo que se pide. No agregues elementos, secciones ni mejoras no solicitadas.
- No repitas contexto ya establecido en el proyecto.

## Verificación
- No hagas comprobaciones repetidas ni ciclos de validación por tu cuenta.
  Ejecuta la tarea una vez y reporta.
- La revisión visual la hace el equipo. No levantes el servidor ni abras
  el navegador para verificar cómo se ve algo.
- Si detectas un error real que impide que la tarea funcione, repórtalo.
  Esa es la única excepción.