# it-tools — Agent Guide

Vue 3 SPA. Collection of ~90 online developer tools. TypeScript (5.2), Vite 4, PNPM 9.

## Project setup

```sh
pnpm install              # install dependencies
pnpm dev                  # vite dev server (localhost:5173)
pnpm build                # vue-tsc --noEmit && NODE_OPTIONS=--max_old_space_size=4096 vite build
pnpm preview              # vite preview --port 5050
pnpm test                 # vitest (unit tests, jsdom env)
pnpm test:e2e             # playwright (builds + starts preview server on :5050)
pnpm test:e2e:dev         # playwright against running dev server: BASE_URL=http://localhost:5173 NO_WEB_SERVER=true
pnpm typecheck            # vue-tsc --noEmit -p tsconfig.vitest.json
pnpm lint                 # eslint src/ --ext .vue,.js,.ts,... --ignore-path .gitignore
pnpm script:create:tool   # scaffold a new tool in src/tools/
pnpm release              # calver release + changelog (zx + consola interactive)
```

CI runs: `pnpm lint` → `pnpm test` → `pnpm typecheck` → `pnpm build`.

Node 18.18.2 (`.nvmrc`). Enable corepack (`corepack enable`) before `pnpm i` in CI.

## Architecture

```
src/
  main.ts                 # entry: createApp + Pinia + vue-router + i18n + plausible
  App.vue                 # root: theme, NotificationContainer, layout via route meta
  router.ts               # auto-generates tool routes from src/tools/index.ts
  config.ts               # env config via figue (BASE_URL, PACKAGE_VERSION, VITE_VERCEL_*, VITE_TRACKER_*, VITE_SHOW_BANNER, etc.)
  tools/                  # all tools, each as a subdirectory
    tool.ts               # defineTool() factory
    tools.types.ts        # Tool, ToolCategory, ToolWithCategory interfaces
    tools.store.ts        # Pinia store: favorites, i18n-wrapped tools
    index.ts              # ALL tool imports + toolsByCategory categorization
  composable/             # shared composables (copy.ts, validation.ts, computedRefreshable.ts, etc.)
  utils/                  # utility functions (base64, defaults, random, etc.)
  components/             # shared Vue components
  ui/                     # reusable UI primitives (c-button, c-input-text, c-card, etc.)
  layouts/                # base.layout.vue, tool.layout.vue
  modules/                # feature modules (command-palette, i18n, tracker)
  plugins/                # i18n.plugin.ts, naive.plugin.ts, plausible.plugin.ts
  stores/                 # style.store.ts (dark/light theme)
  themes.ts               # Naive UI theme overrides (light + dark)
  router.ts               # auto-routes all tools + redirectFrom support + catch-all 404
locales/                  # en.yml, de.yml, fr.yml, zh.yml, etc.
scripts/
  create-tool.mjs         # tool scaffold generator
  release.mjs             # CalVer release automation
```

## Tool pattern — each tool lives in `src/tools/<name>/`

Required:
```
<name>.vue       # component with <script setup lang="ts">
index.ts         # tool registration (defineTool with name/path/description/keywords/icon/component)
```

Optional (create-tool generates stubs):
```
<name>.service.ts      # logic extracted from component
<name>.service.test.ts # Vitest unit test
<name>.e2e.spec.ts     # Playwright e2e (data-test-id attr, en-GB locale, Europe/Paris tz)
```

### Tool registration

In `index.ts`:
```ts
import { Fingerprint } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'UUIDs generator',       // or translate('tools.uuid-generator.title')
  path: '/uuid-generator',
  description: 'A Universally Unique Identifier...',
  keywords: ['uuid', 'v4', 'random', 'id', ...],
  component: () => import('./uuid-generator.vue'),
  icon: Fingerprint,              // @vicons/tabler or @vicons/material
  redirectFrom?: ['/old-path'],   // optional redirect
});
```

Then add the import + category entry in `src/tools/index.ts`. The `defineTool()` wrapper also marks tools newer than 2 weeks as `isNew`.

### Creating a new tool

```sh
pnpm script:create:tool my-tool-name
```

Generates `src/tools/<name>/` with component, service stub, test stubs, and registers the import in `src/tools/index.ts`. You must manually add the tool to a category in the `toolsByCategory` array.

## i18n

- Locale YAML in `locales/` (flat files per locale: `en.yml`, `fr.yml`, etc.)
- Tool-specific keys: `tools.<path-slug>.title`, `tools.<path-slug>.description`
- Category keys: `tools.categories.<lowercased-name>`
- Use `translate()` from `@/plugins/i18n.plugin` in tool `index.ts` for reactive i18n
- `useI18n()` from vue-i18n is auto-imported

## Conventions

- **Package manager**: pnpm only. Lockfile is `pnpm-lock.yaml`.
- **ESLint**: `@antfu` config, `curly: error`, `@typescript-eslint/semi: always`, `vue/no-empty-component-block: error`, no `@vueuse/core` `useClipboard` (use `src/composable/copy.ts` for clipboard with toast).
- **Prettier**: singleQuote, semi, trailingComma all, printWidth 120.
- **Auto-imports**: Vue APIs, vue-router, @vueuse/core, vue-i18n. All auto-imports are listed in `.eslintrc-auto-import.json` — do NOT import these manually.
- **Component auto-registration**: Any `.vue` file in `src/` is auto-registered globally with its filename as PascalCase.
- **Icons**: Prefer `@tabler/icons-vue` for tool icons. Also `@vicons/tabler` / `@vicons/material` available (legacy).
- **Styling**: Tailwind CSS utility classes, `<style lang="less" scoped>`, `::v-deep()` for deep selectors. Predefined utility classes via UnoCSS heritage: `pretty-scrollbar`, `divider`, `bg-surface`, `bg-background`.
- **Theme**: Dark/light mode via `src/stores/style.store.ts` and CSS custom properties in `src/styles/design-tokens.css`.
- **Custom UI components** in `src/ui/` (c-button, c-card, c-input-text, etc.) — all with design token support.
- **Path alias**: `@/` → `src/`.
- **SVG files**: Importable as Vue components via `vite-svg-loader`.
- **Markdown files** (`.md`): Importable as Vue components via `vite-plugin-vue-markdown`.
- **PWA**: Service worker auto-registered via `vite-plugin-pwa`. Build generates service worker with `generateSW` strategy.
- **Custom CI**: Plausible analytics (when `VITE_TRACKER_ENABLED=true`), Sentry tracking via a modules/ plugin.

## Tests

- Unit: Vitest, jsdom, `*.test.ts` or `*.service.test.ts`. Run: `pnpm test`.
- E2E: Playwright, `*.e2e.spec.ts`. `data-test-id` attribute for selectors.
- E2E uses `pnpm preview` (port 5050) with webServer by default. Use `test:e2e:dev` for dev server workflow.
- CI runs Playwright sharded (3 shards).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `BASE_URL` | App base URL (default `/`) |
| `VITE_VERCEL_GIT_COMMIT_SHA` | Last commit SHA |
| `VITE_VERCEL_ENV` | Env: production/development/preview/test |
| `VITE_TRACKER_ENABLED` | Enable Plausible analytics |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible domain |
| `VITE_PLAUSIBLE_API_HOST` | Plausible API host |
| `VITE_SHOW_BANNER` | Show banner |
| `VITE_SHOW_SPONSOR_BANNER` | Show sponsor banner |

## Release

CalVer format: `YYYY.MM.DD-<short-sha>`. Run `pnpm release` (interactive — confirms before tagging). Creates changelog entry, git commit, and npm version tag.

## Deployment

- Primary: Vercel (SPA fallback to `/index.html`)
- Also: Netlify, Docker (`nginx:stable-alpine` serving `/dist` on port 80)
- Docker: `docker run -d -p 8080:80 corentinth/it-tools:latest`
- Dockerfile builds with `pnpm i --frozen-lockfile && pnpm build`