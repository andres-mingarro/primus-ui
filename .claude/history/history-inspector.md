# Inspector

## 2026-05-13 16:30 - inspector

- Tarea: Pre/post audit para rediseño del demo de Button en ComponentDetailPage.
- Archivos: `ui/app/ComponentDetailPage.tsx`, `ui/app/ComponentDetailPage.scss`.
- Resultado: Pre-work sin duplicados ni componentes nuevos requeridos. Post-work: TypeScript limpio, 5 grupos visuales correctos (variantes, ghost-on-dark, tamaños, estados, iconos), todas las variantes visibles en light y dark. Sin overflow.
- Verificación: `bunx tsc --noEmit` limpio + screenshots light/dark leídos visualmente.
- Notas: `#35190f` hardcodeado en banda oscura del ghost — decisión justificada (token brown colapsa en dark mode). Registrado como intencional, no como must-fix.
