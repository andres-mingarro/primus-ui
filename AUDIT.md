# Primus UI — Audit Report

**Score: 12/20 — Acceptable (trabajo significativo necesario)**
**Fecha:** 2026-05-09

---

## Audit Health Score

| # | Dimensión | Score | Hallazgo clave |
|---|-----------|-------|----------------|
| 1 | Accessibility | **1/4** | Sin focus indicators; `brand-500` sobre blanco falla WCAG AA |
| 2 | Performance | **3/4** | FOUC flash por ThemeProvider; lo demás está bien |
| 3 | Responsive Design | **3/4** | Grid sólido; touch targets muy pequeños |
| 4 | Theming | **2/4** | Token `brand-100` no existe (bordes invisibles); `neutral-*` se filtra |
| 5 | Anti-Patterns | **3/4** | Sin AI slop; `bg-white` puro viola la regla de tinting |
| **Total** | | **12/20** | |

---

## Anti-Patterns Verdict

No parece AI-generated. La paleta es disciplinada, el color brand (rojo-marrón oscuro) es distintivo, no hay gradient text, glassmorphism ni hero metrics. Tells menores: `bg-white` puro sin tinte, colores `neutral-*` en ShowcaseFrame que no participan del sistema brand. Veredicto: no es slop, pero es algo genérico para una herramienta developer.

---

## Issues por Severidad

### P1 — Bloquean calidad de producción

#### [P1] Sin focus indicators en ningún elemento interactivo
- **Archivos:** `ui/ThemeToggle.tsx:9`, `ui/CodeTabs.tsx:22`, `app/page.tsx:54`, `ui/layout/Header.tsx:8-15`
- **Categoría:** Accessibility
- **Impacto:** Usuarios de teclado no pueden ver qué elemento tiene foco. El sitio es inutilizable sin mouse.
- **WCAG:** 2.4.7 Focus Visible (AA)
- **Fix:** Agregar `focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:outline-none` a todos los elementos interactivos. Buttons y tabs también necesitan `focus-visible:ring-offset-2`.
- **Comando:** `/impeccable harden`

---

#### [P1] Token `brand-100` no definido — bordes invisibles
- **Archivos:** `app/styles/tokens.css` (falta), `app/page.tsx:24`, `app/divider/page.tsx:54,97,127`
- **Categoría:** Theming
- **Impacto:** Todo elemento con `border-brand-100` tiene color transparente. El divisor de la sección hero en home, los bordes de las tablas de props y CSS vars son invisibles en light mode. Falla silenciosa.
- **Fix:** Agregar en `tokens.css`:
  ```css
  /* En :root */
  --brand-100: color-mix(in srgb, var(--brand) 20%, white);

  /* En @theme */
  --color-brand-100: var(--brand-100);
  ```
- **Comando:** `/impeccable harden`

---

### P2 — Significativos, fix antes de publicar

#### [P2] `brand-500` sobre blanco falla contraste
- **Archivos:** `app/page.tsx:26,34,64`, `app/divider/page.tsx` (múltiples líneas)
- **Categoría:** Accessibility
- **Impacto:** `text-brand-500` sobre `bg-white` da ~3:1 de contraste. WCAG requiere 4.5:1 para texto normal. Afecta descripciones, labels, números de versión.
- **WCAG:** 1.4.3 Contrast Minimum (AA)
- **Fix:** En light mode, usar `text-brand-700` para texto secundario. `brand-500` es aceptable solo para texto grande (≥18px) o en dark mode donde el contraste se invierte favorablemente.
- **Comando:** `/impeccable colorize`

---

#### [P2] CodeTabs sin ARIA tab pattern
- **Archivo:** `ui/CodeTabs.tsx:19-35`
- **Categoría:** Accessibility
- **Impacto:** Screen readers anuncian los tabs como botones normales. Usuarios no pueden navegar con flechas (comportamiento esperado en widgets de tabs). El estado activo solo se comunica visualmente.
- **WCAG:** 4.1.2 Name, Role, Value (AA)
- **Fix:** Agregar `role="tablist"` al div wrapper, `role="tab"` + `aria-selected={i === active}` + `aria-controls` a cada button, y `role="tabpanel"` + `id` al `<pre>`. Implementar navegación con teclas de flecha.
- **Comando:** `/impeccable harden`

---

#### [P2] ThemeProvider causa flash de tema incorrecto
- **Archivo:** `providers/ThemeProvider.tsx:21-27`
- **Categoría:** Performance
- **Impacto:** Usuarios en dark mode ven un flash blanco en cada navegación. El componente inicializa con `useState<Theme>('light')` y lee localStorage solo después de hidratación.
- **Fix:** Inyectar un `<script>` bloqueante en el `<head>` de `layout.tsx` que lea `localStorage.theme` y aplique la clase `dark` de forma sincrónica, antes del primer paint. Patrón estándar de Next.js para persistencia de tema.
- **Comando:** `/impeccable harden`

---

#### [P2] ShowcaseFrame usa `neutral-*` fuera del sistema brand
- **Archivo:** `ui/ShowcaseFrame.tsx:13-20`
- **Categoría:** Theming
- **Impacto:** El showcase frame (usado en cada página de componente) usa `neutral-300/100/700/900/400/500` que no responden a cambios en el token brand. Si el color brand cambia, ShowcaseFrame queda gris.
- **Fix:** Reemplazar `neutral-*` con equivalentes brand: `border-brand-200`, `bg-brand-50`, `dark:border-brand-700`, `dark:bg-brand-900`, `text-brand-500` para el label.
- **Comando:** `/impeccable colorize`

---

#### [P2] Table headers sin atributo `scope`
- **Archivo:** `app/divider/page.tsx:101,130`
- **Categoría:** Accessibility
- **Impacto:** Screen readers pueden no asociar correctamente las celdas de encabezado con las celdas de datos.
- **WCAG:** 1.3.1 Info and Relationships (A)
- **Fix:** Agregar `scope="col"` a todos los `<th>`.
- **Comando:** `/impeccable harden`

---

### P3 — Polish, sin urgencia

#### [P3] ThemeToggle touch target de 32px
- **Archivo:** `ui/ThemeToggle.tsx:11` (`h-8 w-8`)
- **Categoría:** Responsive Design
- **Impacto:** Por debajo del mínimo recomendado de 44×44px. Difícil de tocar con precisión en mobile.
- **Fix:** Aumentar a `h-11 w-11` o mantener tamaño visual 32px pero agregar `p-[6px]` para expandir el área táctil.
- **Comando:** `/impeccable adapt`

---

#### [P3] Body usa `bg-white` puro sin tinte de brand
- **Archivo:** `app/layout.tsx:22`
- **Categoría:** Anti-Pattern / Theming
- **Impacto:** `#ffffff` puro se siente clínico. Las design laws requieren tintar todos los neutrales hacia el hue del brand.
- **Fix:** Definir `--color-surface: color-mix(in srgb, var(--brand) 2%, white)` en tokens.css y usarlo como fondo base. Incluso 2% de tinte es perceptible y agrega calidez.
- **Comando:** `/impeccable colorize`

---

#### [P3] Demo text en divider page usa `text-neutral-500`
- **Archivo:** `app/divider/page.tsx:84-86`
- **Categoría:** Theming
- **Impacto:** Inconsistencia menor; el copy de demo ("Item A", "Item B") renderiza en gris sin tinte.
- **Fix:** Reemplazar `text-neutral-500` con `text-brand-500`.
- **Comando:** `/impeccable polish`

---

## Problemas Sistémicos

1. **Sin patrón de focus.** Los focus styles nunca se establecieron como baseline. Cada componente futuro también saldrá sin indicadores de foco hasta que esto se corrija en la raíz.
2. **Cobertura incompleta de tokens.** La escala brand salta de `brand-50` a `brand-200` sin `brand-100`. Los tokens faltantes fallan silenciosamente con color transparente — no hay error de compilación.
3. **Filtración de `neutral-*`.** Dos UI components (`ShowcaseFrame`, `Divider.tailwind.tsx`) usan Tailwind neutrals crudos en lugar de tokens brand. Este patrón se va a propagar si no se corrige.

---

## Lo que está bien

- **HTML semántico sólido.** `<main>`, `<header>`, `<nav>`, jerarquía `<h1>`/`<h2>`, `lang="en"` — todo correcto.
- **ARIA label del ThemeToggle es ejemplar.** Se actualiza dinámicamente según el estado actual.
- **Divider a11y correcto.** `aria-hidden={assistiveHidden || undefined}` pasa `undefined` (no `false`) cuando no aplica.
- **`next/font/google` optimizado.** Fuentes cargadas por el sistema de Next.js — sin layout shift.
- **Arquitectura de tokens sólida.** El sistema `color-mix()` hace que un solo `--brand` controle toda la paleta.
- **Independencia de componentes respetada.** Sin imports cruzados, sin SCSS partials compartidos.

---

## Acciones Recomendadas (en orden)

1. **[P1] `/impeccable harden`** — Focus indicators globales, token `brand-100`, ARIA tabs, `scope` en tablas, fix ThemeProvider FOUC
2. **[P2] `/impeccable colorize`** — Contraste `brand-500` en blanco, reemplazar `neutral-*` en ShowcaseFrame, agregar tinte a fondo body
3. **[P3] `/impeccable adapt`** — Touch target ThemeToggle a 44px
4. **[P3] `/impeccable polish`** — Fix `text-neutral-500` en demo copy del divider

Terminar siempre con **`/impeccable polish`** como paso final.
