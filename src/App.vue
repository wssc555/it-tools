<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';
import NotificationContainer from './components/NotificationContainer.vue';
import DialogContainer from './components/DialogContainer.vue';
import LoadingBarContainer from './components/LoadingBarContainer.vue';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

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
  <component :is="layout">
    <RouterView />
  </component>
  <NotificationContainer />
  <DialogContainer />
  <LoadingBarContainer />
</template>

<style>
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
  box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary);
}
</style>