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
- [ ] Guardar y reusar prompts/respuestas (localStorage) para no perder lo completado al cerrar la pestaña.
- [ ] Historial de prompts generados: botón al lado de "Copiar" para guardar el prompt con un nombre, y una lista de los últimos N guardados para volver a uno sin rehacerlo.
- [ ] Exportar el prompt como archivo `.md` además de copiarlo.

## Stack

Vite + React + TypeScript, sin backend ni persistencia (por ahora).
