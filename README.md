# generaprompt

App para armar prompts de arranque de proyectos (pensados para pasarle a Claude Code u otro asistente). Completás un checklist genérico y la app te devuelve un prompt listo para copiar, con las aclaraciones que suelen quedar afuera cuando arrancás una app nueva.

## Uso

```bash
npm install
npm run dev
```

Elegís el tipo de aplicación, completás lo que sepas de cada sección y copiás el prompt generado. Las secciones vacías se omiten del resultado.

## Roadmap

- [ ] Checklists específicos por tipo de app (web, CLI, móvil, API, script, extensión), con preguntas propias de cada tipo en vez de un único set genérico.
- [x] Guardar y reusar prompts/respuestas (localStorage) para no perder lo completado al cerrar la pestaña.
- [ ] Historial de prompts generados: botón al lado de "Copiar" para guardar el prompt con un nombre, y una lista de los últimos N guardados para volver a uno sin rehacerlo.
- [ ] Exportar el prompt como archivo `.md` además de copiarlo.
- [ ] Sugerencias de combinaciones típicas: botones tipo "Stack típico Next.js + Postgres + Tailwind" que precarguen varios campos de una.
- [x] Contador de tokens aproximado: mostrar cuánto ocupa el prompt, para no pasarse de contexto.
- [x] Sección "preguntas para Claude": un campo donde listar dudas que Claude debe responder antes de arrancar, y se agregan al final del prompt.
- [x] Dos checkboxes para solicitar en el prompt la creación de un archivo `README.md` y de un `CLAUDE.md`.

## Stack

Vite + React + TypeScript, sin backend; el borrador se guarda en localStorage del navegador.
