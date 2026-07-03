<script setup lang="ts">
withDefaults(defineProps<{
  value?: string | number
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
  testId?: string
}>(), {
  value: '',
  type: 'default',
  size: 'medium',
  closable: false,
  testId: undefined,
});

const emit = defineEmits(['close']);

function handleClose() {
  emit('close');
}
</script>

<template>
  <span
    class="c-badge inline-flex items-center gap-1 rounded-full font-medium leading-none"
    :class="[`c-badge--${type}`, `c-badge--${size}`]"
    :data-test-id="testId"
  >
    <slot>
      {{ value }}
    </slot>
    <button
      v-if="closable"
      class="c-badge__close -mr-0.5 inline-flex items-center justify-center rounded-full border-none bg-transparent p-0 outline-none"
      @click.stop="handleClose"
    >
      <icon-mdi-close class="h-3 w-3" />
    </button>
  </span>
</template>

<style lang="less" scoped>
.c-badge {
  vertical-align: middle;

  &--small { font-size: 11px; padding: 3px 8px; }
  &--medium { font-size: 12px; padding: 4px 10px; }
  &--large { font-size: 14px; padding: 6px 14px; }

  &--default {
    background: var(--bg-surface-2);
    color: var(--text-secondary);
    border: 1px solid var(--border-subtle);
  }
  &--primary {
    background: color-mix(in srgb, var(--accent-primary), transparent 88%);
    color: var(--accent-primary);
  }
  &--success {
    background: color-mix(in srgb, var(--state-success), transparent 88%);
    color: var(--state-success);
  }
  &--warning {
    background: color-mix(in srgb, var(--state-warning), transparent 88%);
    color: var(--state-warning);
  }
  &--error {
    background: color-mix(in srgb, var(--state-danger), transparent 88%);
    color: var(--state-danger);
  }
  &--info {
    background: color-mix(in srgb, var(--state-info), transparent 88%);
    color: var(--state-info);
  }

  &__close {
    color: inherit;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.15s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
