## 2026-05-12 14:30 - ui-designer

- Tarea: reorganizar HomePage para separar instalación/uso en 3 tabs por stack con AppTabs.
- Archivos: `ui/app/HomePage.tsx`, `ui/app/HomePage.scss`.
- Resultado: las secciones "How to use", "Quick start" y "Stacks" colapsaron en una sola sección con AppTabs de 3 paneles (Next.js, Next.js + Tailwind, Drupal); cada panel muestra su FlavorCard con acento de color propio más 3 pasos de instalación específicos del stack; en large el panel usa grid de 2 columnas (FlavorCard + pasos en paralelo); la sección de Components quedó fuera de los tabs, siempre visible.
- Verificación: `pnpm dev` y revisar `/en` — verificar que los 3 tabs funcionen, que keyboard navigation (ArrowLeft/ArrowRight) opere correctamente y que en mobile los tabs se apilen verticalmente.
- Notas: ninguna.
