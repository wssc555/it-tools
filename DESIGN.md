# IT-Tools Design System

## Philosophy

A quiet, fast, professional developer tools workbench — not a marketing site, not a consumer product, not a heavy dashboard.

## Visual Principles

1. **Card = borderless by default.** Use subtle background shifts (`--bg-surface-1` / `--bg-surface-2`), spacing, typography hierarchy, and content density to create structure. Reserve 1px borders for interactive states (hover, focus, error) and essential separators only.

2. **Minimal, clean, editor-like.** No neon, no glassmorphism (keep backdrop blur for overlays only), no heavy shadows, no thick borders, no strong gradients.

3. **Color discipline.** Accent (cyan) used only for focus rings, links, key CTAs, selected state, and status feedback. Large areas use neutral colors and low-contrast surfaces.

4. **Typography.** Body: `IBM Plex Sans` / `Inter` / system-ui sans-serif. Code, hashes, JSON, regex output: `JetBrains Mono` / `Fira Code` / monospace.

5. **Motion.** GPU-friendly properties only: `transform`, `opacity`, `filter`. Short durations, clear feedback. Respect `prefers-reduced-motion`.

6. **Icons.** SVG icon set (`@tabler/icons-vue`). No emoji as functional icons.

7. **Accessibility.** Focus rings must be visible (2px cyan). All custom components support keyboard, ARIA, error states, disabled/loading states.

## State Matrix

| Component | default | hover | focus | active | disabled | error | loading | selected |
|-----------|---------|-------|-------|--------|----------|-------|---------|----------|
| Button | surface bg | brighter bg | focus ring | pressed bg | 40% opacity | — | spinner | — |
| Input | surface bg | border hover | focus ring | — | 40% opacity | red border | — | — |
| Card | flat bg | subtle border | — | — | — | — | — | accent border |
| Table | alternating rows | row highlight | — | — | 40% opacity | — | — | accent bg |
| Modal | centered overlay | — | — | — | — | — | — | — |
| Alert | color-coded bg | — | — | — | — | — | — | — |

## Design Tokens

All tokens defined in `src/styles/design-tokens.css` as CSS custom properties. Mapped to Tailwind 4 `@theme` in `src/styles/tailwind.css`.

### Token Categories

| Category | Prefix | Example Variables |
|----------|--------|-------------------|
| Backgrounds | `--bg-` | `--bg-app`, `--bg-surface-1`, `--bg-surface-2`, `--bg-elevated` |
| Surfaces | `--surface-` | `--surface-card`, `--surface-input`, `--surface-output` |
| Borders | `--border-` | `--border-subtle`, `--border-default`, `--border-cyan` |
| Accent | `--accent-` | `--accent-cyan`, `--accent-cyan-hover`, `--accent-lime` |
| Text | `--text-` | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-on-accent` |
| Shadows | `--shadow-` | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Radii | `--radius-` | `--radius-sm`, `--radius-md`, `--radius-lg` |
| Spacing | `--space-` | `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl` |
| Typography | `--font-` | `--font-body`, `--font-heading`, `--font-mono` |
| Transitions | `--transition-` | `--transition-fast`, `--transition-base` |

### Theme Mode

- `data-theme="light"` on `<html>` for light mode
- `data-theme="dark"` on `<html>` for dark mode
- All tokens switch via `:root, [data-theme="light"]` and `[data-theme="dark"]` selectors

## Tailwind 4 @theme Mapping

In `src/styles/tailwind.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: "IBM Plex Sans", "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  --color-background: var(--bg-app);
  --color-surface: var(--bg-surface-1);
  --color-surface-muted: var(--bg-surface-2);
  --color-text: var(--text-primary);
  --color-text-muted: var(--text-secondary);
  --color-text-dim: var(--text-muted);
  --color-accent: var(--accent-cyan);
  --color-accent-hover: var(--accent-cyan-hover);
  --color-danger: #ef4444;
  --color-success: var(--accent-lime);
  --color-warning: #f59e0b;

  --radius-card: var(--radius-md);
  --radius-button: var(--radius-sm);
  --radius-input: var(--radius-sm);
}
```

## Naive UI Replacement Map

| Naive UI Component | Custom Replacement | Status |
|--------------------|--------------------|--------|
| NButton | c-button | ✅ Done |
| NInput | c-input-text | ✅ Done |
| NSelect | c-select | ✅ Done |
| NCard | c-card | ✅ Done |
| NModal | c-modal | ✅ Done |
| NAlert | c-alert | ✅ Done |
| NTable | c-table | ✅ Done |
| NTooltip | c-tooltip | ✅ Done |
| NIcon | @tabler/icons-vue | ✅ Done |
| NLayout / NLayoutSider | MenuLayout.vue | ✅ Done |
| NMenu | CollapsibleToolMenu.vue | ✅ Done |
| NCollapseTransition | Native transition | ✅ Done |
| NMessageProvider | composable/notification | ✅ Done |
| NNotificationProvider | composable/notification | ✅ Done |
| NConfigProvider | DESIGN.md tokens | ✅ Done |
| NGlobalStyle | design-tokens.css | ✅ Done |
| NDialogProvider | c-modal + composable | ✅ Done |
| NLoadingBarProvider | Top progress bar | ✅ Done |
| NH1 / NH2 / NH3 | Plain `<h1>` etc. | ✅ Done |
| NSwitch | c-switch | ✅ Done |
| NCheckbox | c-checkbox | ✅ Done |
| NRadio | c-radio | ✅ Done |
| NTag | c-badge | ✅ Done |
| NProgress | c-progress | ✅ Done |
| NEmpty | c-empty | ✅ Done |
| NSkeleton | c-skeleton | ✅ Done |
| NSpin | c-spinner | ✅ Done |
| NPagination | c-pagination | ✅ Done |

## Component Requirements

Every component in `src/ui/` must:
1. Accept `data-test-id` attribute for e2e testing
2. Support `disabled` state with reduced opacity and no pointer events
3. Support `loading` state with inline spinner
4. Show visible focus ring in `:focus-visible`
5. Use design tokens via CSS variables (never hardcode colors)
6. Work in both light and dark mode
7. Be keyboard-accessible (Enter/Space for buttons, Tab for inputs, Esc for modals)
8. Use scoped `<style lang="less">` or Tailwind utility classes