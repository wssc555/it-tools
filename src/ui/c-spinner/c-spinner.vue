<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'small' | 'medium' | 'large'
  testId?: string
}>(), {
  size: 'medium',
  testId: undefined,
});
</script>

<template>
  <span
    class="c-spinner inline-block animate-spin rounded-full border-current"
    :class="[`c-spinner--${size}`]"
    style="border-style: solid; border-bottom-color: transparent !important;"
    :data-test-id="testId"
  >
    <span class="sr-only">Loading...</span>
  </span>
</template>

<style lang="less" scoped>
.c-spinner {
  color: var(--accent-primary);

  &--small { width: 16px; height: 16px; border-width: 2px; }
  &--medium { width: 24px; height: 24px; border-width: 2.5px; }
  &--large { width: 36px; height: 36px; border-width: 3px; }
}
</style>