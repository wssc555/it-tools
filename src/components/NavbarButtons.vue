<script setup lang="ts">
import { IconBrandGithub, IconBrandX, IconInfoCircle, IconMoon, IconSun } from '@tabler/icons-vue';
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isDarkTheme } = toRefs(styleStore);
</script>

<template>
  <div class="flex items-center gap-0.5">
    <c-tooltip :tooltip="$t('home.nav.github')" position="bottom">
      <c-button
        circle
        variant="text"
        href="https://github.com/CorentinTh/it-tools"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="$t('home.nav.githubRepository')"
      >
        <IconBrandGithub size="22" />
      </c-button>
    </c-tooltip>

    <c-tooltip :tooltip="$t('home.nav.twitterX')" position="bottom">
      <c-button
        circle
        variant="text"
        href="https://x.com/ittoolsdottech"
        rel="noopener"
        target="_blank"
        :aria-label="$t('home.nav.twitterXAccount')"
      >
        <IconBrandX size="22" />
      </c-button>
    </c-tooltip>

    <c-tooltip :tooltip="$t('home.nav.about')" position="bottom">
      <c-button circle variant="text" to="/about" :aria-label="$t('home.nav.aboutLabel')">
        <IconInfoCircle size="22" />
      </c-button>
    </c-tooltip>
    <c-tooltip :tooltip="isDarkTheme ? $t('home.nav.lightMode') : $t('home.nav.darkMode')" position="bottom">
      <c-button circle variant="text" :aria-label="$t('home.nav.mode')" @click="() => styleStore.toggleDark()">
        <IconSun v-if="isDarkTheme" size="22" />
        <IconMoon v-else size="22" />
      </c-button>
    </c-tooltip>
  </div>
</template>

<style lang="less" scoped>
::v-deep(.c-button) {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  transition: all var(--transition-fast);
  position: relative;

  &:hover {
    background: color-mix(in srgb, var(--accent-primary), transparent 88%) !important;
  }

  &:active {
    background: color-mix(in srgb, var(--accent-primary), transparent 80%) !important;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary) !important;
  }
}
</style>