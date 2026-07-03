import type { Plugin } from 'vue';
import { createI18n } from 'vue-i18n';

// Only import the default locale at build time (15.9 KB raw)
// Other locales are dynamically loaded on demand via localeLoaders.
import enMessages from '../../locales/en.yml';

const DEFAULT_LOCALE = 'en';

// Pre-register all locale keys so the dropdown shows all available languages,
// but only the default locale messages are bundled at build time.
const messages: Record<string, any> = {
  [DEFAULT_LOCALE]: enMessages,
  de: {},
  es: {},
  fr: {},
  no: {},
  pt: {},
  uk: {},
  vi: {},
  zh: {},
};

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
});

const loadedLocales: Record<string, boolean> = { [DEFAULT_LOCALE]: true };

const localeLoaders: Record<string, () => Promise<any>> = {
  de: () => import('../../locales/de.yml'),
  es: () => import('../../locales/es.yml'),
  fr: () => import('../../locales/fr.yml'),
  no: () => import('../../locales/no.yml'),
  pt: () => import('../../locales/pt.yml'),
  uk: () => import('../../locales/uk.yml'),
  vi: () => import('../../locales/vi.yml'),
  zh: () => import('../../locales/zh.yml'),
};

async function loadLocaleMessages(locale: string): Promise<void> {
  if (loadedLocales[locale]) return;
  const loader = localeLoaders[locale];
  if (!loader) {
    console.warn(`[i18n] No locale loader for: ${locale}`);
    return;
  }
  try {
    const mod = await loader();
    i18n.global.setLocaleMessage(locale, mod.default || mod);
    loadedLocales[locale] = true;
  }
  catch (e) {
    console.warn(`[i18n] Failed to load locale: ${locale}`, e);
  }
}

export const i18nPlugin: Plugin = {
  install: (app) => {
    app.use(i18n);

    // Load stored locale from localStorage if not default
    const storedLocale = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null;
    if (storedLocale && storedLocale !== DEFAULT_LOCALE) {
      loadLocaleMessages(storedLocale).then(() => {
        (i18n.global.locale as any) = storedLocale;
      });
    }

    // Watch for locale changes and lazy-load if needed
    watch(i18n.global.locale, (newLocale) => {
      if (typeof newLocale === 'string') {
        loadLocaleMessages(newLocale);
      }
    });
  },
};

export const translate = function (localeKey: string) {
  const global = i18n.global as any;
  const currentLocale = String(global.locale);
  const hasKey = global.te(localeKey, currentLocale);
  return hasKey ? global.t(localeKey) : localeKey;
};