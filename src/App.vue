<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui';
import { darkThemeOverrides, lightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

const theme = computed(() => (styleStore.isDarkTheme ? darkTheme : null));
const themeOverrides = computed(() => (styleStore.isDarkTheme ? darkThemeOverrides : lightThemeOverrides));

const { locale } = useI18n();

syncRef(
  locale,
  useStorage('locale', locale),
);

// Sync data-theme attribute for CSS design tokens
watchEffect(() => {
  document.documentElement.setAttribute('data-theme', styleStore.isDarkTheme ? 'dark' : 'light');
});
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
@import './styles/design-tokens.css';

body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  background-color: var(--bg-app);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

/* ─── Global scrollbar styling ─── */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(125, 211, 252, 0.15);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(125, 211, 252, 0.25);
}

/* ─── Selection ─── */
::selection {
  background: rgba(34, 211, 238, 0.25);
  color: var(--text-primary);
}

/* ─── Focus visible ─── */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-cyan);
}
</style>