<script setup lang="ts">
const { availableLocales, locale } = useI18n();

const localesLong: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  no: 'Norwegian',
  pt: 'Português',
  ru: 'Русский',
  uk: 'Українська',
  zh: '中文',
  vi: 'Tiếng Việt',
};

const localeOptions = computed(() =>
  availableLocales.map(locale => ({
    label: localesLong[locale] ?? locale,
    value: locale,
  })),
);
</script>

<template>
  <select
    v-model="locale"
    class="locale-select"
    w-100px
  >
    <option v-for="opt in localeOptions" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>

<style scoped lang="less">
.locale-select {
  appearance: auto;
  background-color: var(--bg-surface-2);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 13px;
  padding: 4px 8px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease;
  text-overflow: ellipsis;

  &:focus-visible {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 1px var(--accent-primary);
  }

  &:hover {
    border-color: var(--accent-primary);
  }
}
</style>
