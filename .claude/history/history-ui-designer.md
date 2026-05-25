## 2026-05-14 11:45 - ui-designer

- Tarea: agregar CSS del demo matrix de Badge en ComponentDetailPage.scss.
- Archivos: `/home/andres/proyectos/primus-ui/ui/app/ComponentDetailPage.scss`
- Resultado: el bloque `renderDemo('badge')` y las constantes `badgeMatrixRows`/`badgeMatrixCols` ya existían en el `.tsx`; solo faltaban las clases `.ComponentDetailPage__badge-matrix`, `.ComponentDetailPage__badge-row`, `.ComponentDetailPage__badge-row-label` y `.ComponentDetailPage__badge-cells` en el SCSS.
- Verificación: screenshot `/en/components/badge` — matriz de 4 filas (filled, tint, outline, ghost) × 5 columnas (informative, success, warning, danger, brand) correcta en light y dark mode.
- Notas: ninguna.
