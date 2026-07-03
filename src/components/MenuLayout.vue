<script setup lang="ts">
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isMenuCollapsed, isSmallScreen } = toRefs(styleStore);
</script>

<template>
  <div class="menu-layout-root">
    <!-- Sider / Sidebar -->
    <aside
      class="menu-layout-sider"
      :class="{
        'menu-layout-sider--collapsed': isMenuCollapsed,
        'menu-layout-sider--overlay': isSmallScreen,
      }"
    >
      <div class="menu-layout-sider-scroll">
        <slot name="sider" />
      </div>
    </aside>

    <!-- Main Content -->
    <main class="menu-layout-content">
      <div class="menu-layout-content-inner">
        <slot name="content" />
      </div>
    </main>

    <!-- Overlay for mobile when menu is open -->
    <div
      v-show="isSmallScreen && !isMenuCollapsed"
      class="menu-layout-overlay"
      @click="isMenuCollapsed = true"
    />
  </div>
</template>

<style lang="less" scoped>
.menu-layout-root {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.menu-layout-sider {
  width: 260px;
  flex-shrink: 0;
  background: var(--bg-glass);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  overflow-y: auto;
  transition: margin-left 0.3s ease, width 0.3s ease;
  position: relative;
  z-index: 20;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--border-subtle); border-radius: 3px; }

  &--collapsed {
    margin-left: -260px;
  }

  &--overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
}

.menu-layout-sider-scroll {
  min-height: 100%;
}

.menu-layout-content {
  flex: 1;
  overflow-y: auto;
  background: var(--bg-app);
  min-width: 0;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
}

.menu-layout-content-inner {
  padding: 24px 32px;

  @media (max-width: 700px) {
    padding: 16px;
  }
}

.menu-layout-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 15;
}
</style>