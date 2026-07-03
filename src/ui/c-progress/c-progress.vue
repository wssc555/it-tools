<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: number
  max?: number
  showLabel?: boolean
  type?: 'default' | 'success' | 'warning' | 'error'
  size?: 'small' | 'medium'
  testId?: string
}>(), {
  value: 0,
  max: 100,
  showLabel: true,
  type: 'default',
  size: 'medium',
  testId: undefined,
});

const percent = computed(() => {
  const p = (props.value / props.max) * 100;
  return Math.min(100, Math.max(0, p));
});
</script>

<template>
  <div class="c-progress flex flex-col gap-1" :data-test-id="testId">
    <div
      class="c-progress__track w-full overflow-hidden rounded-full bg-[var(--bg-surface-2)]"
      :class="`c-progress__track--${size}`"
    >
      <div
        class="c-progress__fill h-full rounded-full transition-all duration-300 ease-out"
        :class="[`c-progress__fill--${type}`, `c-progress__fill--${size}`]"
        :style="{ width: `${percent}%` }"
      />
    </div>
    <span v-if="showLabel" class="c-progress__label text-xs text-[var(--text-muted)]">
      {{ Math.round(percent) }}%
    </span>
  </div>
</template>

<style lang="less" scoped>
.c-progress {
  &__track {
    &--small { height: 4px; }
    &--medium { height: 8px; }
  }

  &__fill {
    &--default { background: var(--accent-primary); }
    &--success { background: var(--state-success); }
    &--warning { background: var(--state-warning); }
    &--error { background: var(--state-danger); }
  }
}
</style>