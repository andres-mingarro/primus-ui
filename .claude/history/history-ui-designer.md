## 2026-05-13 16:00 - ui-designer

- Tarea: Rediseñar el demo del componente Button en la página de documentación.
- Archivos: `ui/app/ComponentDetailPage.tsx`, `ui/app/ComponentDetailPage.scss`
- Resultado: El bloque `if (slug === 'button')` fue reemplazado por un layout de cinco grupos visuales claramente separados: Variantes (5 variantes en flex-wrap), Ghost on Dark (banda fija #35190f con override de tokens pu-button para legibilidad), Sizes (sm/md/lg alineados por baseline), States (enabled/disabled/danger disabled) e Icons (icon izquierda, icon derecha, icon+outline). Se eliminó `buttonDemoItems` y se introdujo `buttonVariantItems`. Las clases .ComponentDetailPage__button-demo* fueron reemplazadas por el nuevo sistema de grupos con SCSS correcto.
- Verificación: Screenshots capturados en light y dark mode. Todas las variantes son visibles, el ghost tiene contraste en ambos modos, sin overflow horizontal.
- Notas: El ghost variant en la librería tiene colores hardcodeados (#1c1917, #f5f5f4) invisibles sobre fondos oscuros. Se resolvió con override de CSS variables desde el contexto de la banda oscura del demo (.ComponentDetailPage__button-group--dark), sin tocar components-library.
