<script setup lang="ts">
import type { Component } from 'vue';

const props = defineProps<{ icon: Component; title: string }>();
const { icon, title } = toRefs(props);
</script>

<template>
  <div class="bento-card">
    <n-icon class="bento-icon" size="36" :component="icon" />
    <div class="bento-title">
      <n-ellipsis>{{ title }}</n-ellipsis>
    </div>
    <div class="bento-desc">
      <n-ellipsis :line-clamp="2" :tooltip="false">
        <slot />
      </n-ellipsis>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bento-card {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(163, 230, 53, 0.05) 100%);
  border: 1px solid rgba(34, 211, 238, 0.12);
  border-radius: var(--radius-lg, 24px);
  padding: 24px;
  color: var(--text-primary);
  transition: border-color var(--transition-base);

  &:hover {
    border-color: rgba(34, 211, 238, 0.25);
  }

  .bento-icon {
    color: var(--accent-cyan);
    opacity: 0.8;
    margin-bottom: 12px;
  }

  .bento-title {
    font-family: var(--font-heading);
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  .bento-desc {
    font-size: 14px;
    line-height: 1.55;
    color: var(--text-secondary);
    opacity: 0.9;

    ::v-deep(a) {
      color: var(--accent-cyan);
      text-decoration: underline;
      font-weight: 500;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--accent-cyan-hover);
      }
    }
  }
}
</style>
