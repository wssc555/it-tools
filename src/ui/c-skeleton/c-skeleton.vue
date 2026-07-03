<script setup lang="ts">
withDefaults(defineProps<{
  width?: string
  height?: string
  round?: boolean
  repeat?: number
  testId?: string
}>(), {
  width: '100%',
  height: '20px',
  round: false,
  repeat: 1,
  testId: undefined,
});
</script>

<template>
  <div class="c-skeleton flex flex-col gap-2" :data-test-id="testId">
    <div
      v-for="i in repeat"
      :key="i"
      class="c-skeleton__block animate-pulse"
      :class="{ 'rounded-[var(--radius-sm)]': !round, 'rounded-full': round }"
      :style="{ width: width, height: height }"
    />
  </div>
</template>

<style lang="less" scoped>
.c-skeleton {
  &__block {
    background: linear-gradient(
      90deg,
      var(--bg-surface-2) 25%,
      var(--bg-surface-1) 50%,
      var(--bg-surface-2) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s ease-in-out infinite;
  }
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>