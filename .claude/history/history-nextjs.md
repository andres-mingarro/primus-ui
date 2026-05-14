## 2026-05-13 — Next.js

- Tarea: crear componente Link en components-library con versiones SCSS y Tailwind, meta, README y registro en la app.
- Archivos:
  - `components-library/Link/Link.tsx` (creado)
  - `components-library/Link/Link.tailwind.tsx` (creado)
  - `components-library/Link/link.scss` (creado)
  - `components-library/Link/meta.ts` (creado)
  - `components-library/Link/README.md` (creado)
  - `lib/components-registry.ts` (modificado — entrada Link agregada)
  - `lib/component-docs.ts` (modificado — LinkMeta importado y agregado al array)
  - `ui/app/ComponentDetailPage.tsx` (modificado — import Link, caso renderDemo, formatDocsBySlug, drupalPropRowsBySlug, tailwindTokenRowsBySlug)
- Resultado: componente Link completo con addClassName, assistiveHidden, openInNewTab, supplementalText; supplementalText se autocompleta a "Opens in new tab" cuando openInNewTab=true; pu-visually-hidden definido en SCSS.
- Verificación: `bunx tsc --noEmit` pasa sin errores.
- Notas: ninguna.
