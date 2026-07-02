<script setup lang="ts">
import { IconBrandGithub, IconBrandX, IconInfoCircle, IconMoon, IconSun } from '@tabler/icons-vue';
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isDarkTheme } = toRefs(styleStore);
</script>

<template>
  <div class="navbar-btn-wrapper">
    <c-tooltip :tooltip="$t('home.nav.github')" position="bottom">
      <c-button
        circle
        variant="text"
        href="https://github.com/CorentinTh/it-tools"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="$t('home.nav.githubRepository')"
      >
        <n-icon size="22" :component="IconBrandGithub" />
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
        <n-icon size="22" :component="IconBrandX" />
      </c-button>
    </c-tooltip>

    <c-tooltip :tooltip="$t('home.nav.about')" position="bottom">
      <c-button circle variant="text" to="/about" :aria-label="$t('home.nav.aboutLabel')">
        <n-icon size="22" :component="IconInfoCircle" />
      </c-button>
    </c-tooltip>
    <c-tooltip :tooltip="isDarkTheme ? $t('home.nav.lightMode') : $t('home.nav.darkMode')" position="bottom">
      <c-button circle variant="text" :aria-label="$t('home.nav.mode')" @click="() => styleStore.toggleDark()">
        <n-icon v-if="isDarkTheme" size="22" :component="IconSun" />
        <n-icon v-else size="22" :component="IconMoon" />
      </c-button>
    </c-tooltip>
  </div>
</template>

<style lang="less" scoped>
.navbar-btn-wrapper {
  display: flex;
  align-items: center;
  gap: 2px;
}

::v-deep(.c-button) {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  transition: all var(--transition-fast);
  position: relative;

  &:hover {
    background: rgba(34, 211, 238, 0.1) !important;
  }

  &:active {
    background: rgba(34, 211, 238, 0.18) !important;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-cyan) !important;
  }
}
</style>
