## 2026-05-25 - Drupal

- Task: Remove `danger` variant from Button component SDC definition.
- Files: `components-library/Button/drupal/button.component.yml`
- Result: Removed `danger` from the `variant` prop `description` string and from the `enum` array. The `enum` now reads `[primary, secondary, ghost, outline, link]`. No changes to `button.twig` or `button.scss` were needed.
- Verification: Read the file and confirmed both occurrences of `danger` were removed successfully.
- Notes: none.
