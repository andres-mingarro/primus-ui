# Inspector

## 2026-05-13 15:30 - inspector

- Tarea: audit pre/post para mejora de jerarquía de información en DocsPage.
- Archivos: ui/app/DocsPage.tsx, ui/app/DocsPage.scss, ui/components/segment/AppSidebar/AppSidebar.tsx.
- Resultado: pre-audit sin duplicados; post-audit encontró 2 must-fix (side-stripe border en refsList + focus-visible faltante en links externos) y 1 polish (reduced-motion en nextLink). Los 3 fueron corregidos.
- Verificación: screenshots desktop y mobile confirman layout correcto, 3 subitems en sidebar, sin overflow.
- Notas: ninguna.
