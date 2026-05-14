## 2026-05-13 15:30 - ui-designer

- Tarea: mejorar jerarquía de información de DocsPage (sidebar subitems + sección Usage + sección What's next).
- Archivos: ui/app/DocsPage.tsx, ui/app/DocsPage.scss, ui/components/segment/AppSidebar/AppSidebar.tsx, messages/en.json, messages/es.json.
- Resultado: sidebar con 3 subitems (Installation, Usage, Theming/Tokens); nueva sección Usage con grid 2col de addClassName y CSS vars; nueva sección What's next con PathCards; 12 claves nuevas en mensajes.
- Verificación: screenshots desktop y mobile sin regresiones.
- Notas: PathCard no acepta href — envuelto en `<a class="DocsPage__nextLink">`.
