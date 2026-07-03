<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'warning' | 'error'
    variant?: 'basic' | 'text'
    disabled?: boolean
    round?: boolean
    circle?: boolean
    href?: string
    to?: RouteLocationRaw
    size?: 'small' | 'medium' | 'large'
    bordered?: boolean
  }>(),
  {
    type: 'default',
    variant: 'basic',
    disabled: false,
    round: false,
    circle: false,
    href: undefined,
    to: undefined,
    size: 'medium',
    bordered: false,
  },
);
const emits = defineEmits(['click']);

const { variant, disabled, round, circle, href, type, to, size: sizeName, bordered } = toRefs(props);

function handleClick(event: MouseEvent) {
  if (!disabled.value) {
    emits('click', event);
  }
}

const tag = computed(() => {
  if (href.value) return 'a';
  if (to.value) return 'router-link';
  return 'button';
});
</script>

<template>
  <component
    :is="tag"
    :href="href ?? to"
    class="c-button"
    :class="[
      variant === 'text' ? 'c-button--text' : 'c-button--basic',
      `c-button--${type}`,
      `c-button--${sizeName}`,
      {
        'c-button--disabled': disabled,
        'c-button--round': round,
        'c-button--circle': circle,
        'c-button--bordered': bordered,
      },
    ]"
    :to="to"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<style lang="less" scoped>
.c-button {
  line-height: 1;
  font-family: var(--font-body);
  border: none;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  padding: 0 14px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  outline: none;
  white-space: nowrap;
  gap: 4px;

  /* ─── Sizes ─── */
  &--small { height: 28px; font-size: 12px; border-radius: var(--radius-sm); }
  &--medium { height: 34px; font-size: 14px; border-radius: var(--radius-sm); }
  &--large { height: 40px; font-size: 16px; border-radius: var(--radius-sm); }

  &--round { border-radius: 100px; }
  &--circle { border-radius: 50%; width: var(--btn-size, 34px); padding: 0; }

  /* ─── Basic variant ─── */
  &--basic {
    &.c-button--default {
      color: var(--text-primary);
      background: var(--bg-surface-1);
      border: 1px solid var(--border-subtle);
      &:hover { background: var(--bg-surface-2); border-color: var(--border-default); }
      &:active { background: color-mix(in srgb, var(--bg-surface-2), var(--accent-primary) 8%); }
      &:focus-visible { box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary); }
    }
    &.c-button--primary {
      color: var(--accent-primary);
      background: color-mix(in srgb, var(--accent-primary), transparent 88%);
      &:hover { background: color-mix(in srgb, var(--accent-primary), transparent 78%); }
      &:active { background: color-mix(in srgb, var(--accent-primary), transparent 92%); }
      &:focus-visible { box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary); }
    }
    &.c-button--warning {
      color: var(--state-warning);
      background: color-mix(in srgb, var(--state-warning), transparent 88%);
      &:hover { background: color-mix(in srgb, var(--state-warning), transparent 78%); }
      &:active { background: color-mix(in srgb, var(--state-warning), transparent 92%); }
      &:focus-visible { box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--state-warning); }
    }
    &.c-button--error {
      color: var(--state-danger);
      background: color-mix(in srgb, var(--state-danger), transparent 88%);
      &:hover { background: color-mix(in srgb, var(--state-danger), transparent 78%); }
      &:active { background: color-mix(in srgb, var(--state-danger), transparent 92%); }
      &:focus-visible { box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--state-danger); }
    }
    &.c-button--bordered {
      border: 1px solid color-mix(in srgb, var(--accent-primary), transparent 60%);
    }
  }

  /* ─── Text variant ─── */
  &--text {
    background: transparent;
    &.c-button--default { color: var(--text-secondary); &:hover { background: var(--bg-surface-2); } }
    &.c-button--primary { color: var(--accent-primary); &:hover { background: color-mix(in srgb, var(--accent-primary), transparent 88%); } }
    &.c-button--warning { color: var(--state-warning); &:hover { background: color-mix(in srgb, var(--state-warning), transparent 88%); } }
    &.c-button--error { color: var(--state-danger); &:hover { background: color-mix(in srgb, var(--state-danger), transparent 88%); } }
    &:focus-visible { box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary); }
  }

  /* ─── Disabled ─── */
  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>