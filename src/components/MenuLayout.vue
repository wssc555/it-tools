<script setup lang="ts">
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isMenuCollapsed, isSmallScreen } = toRefs(styleStore);
const siderPosition = computed(() => (isSmallScreen.value ? 'absolute' : 'static'));
</script>

<template>
  <n-layout has-sider :sider-border-color="'transparent'">
    <n-layout-sider
      class="glass-sider"
      collapse-mode="width"
      :collapsed-width="0"
      :width="260"
      :collapsed="isMenuCollapsed"
      :show-trigger="false"
      :native-scrollbar="false"
      :position="siderPosition"
    >
      <slot name="sider" />
    </n-layout-sider>
    <n-layout class="content">
      <slot name="content" />
      <div v-show="isSmallScreen && !isMenuCollapsed" class="overlay" @click="isMenuCollapsed = true" />
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.glass-sider {
  background: var(--bg-glass);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  ::v-deep(.n-layout-sider-scroll-container) {
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--border-subtle);
      border-radius: 3px;
    }
  }
}

.content {
  background: var(--bg-app);

  ::v-deep(.n-layout-scroll-container) {
    padding: 24px 32px;

    @media (max-width: 700px) {
      padding: 16px;
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 10;
}

.n-layout {
  height: 100vh;
}
</style>