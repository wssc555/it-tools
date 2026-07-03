<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: boolean
  disabled?: boolean
  label?: string
  testId?: string
}>(), {
  value: false,
  disabled: false,
  label: undefined,
  testId: undefined,
});

const emit = defineEmits(['update:value']);
const checked = useVModel(props, 'value', emit);
</script>

<template>
  <label
    class="c-switch inline-flex cursor-pointer items-center gap-2"
    :class="{ 'c-switch--disabled': disabled }"
    :data-test-id="testId"
  >
    <button
      type="button"
      role="switch"
      :aria-checked="checked"
      :disabled="disabled"
      class="c-switch__track relative inline-flex h-5 w-9 shrink-0 rounded-full border-none outline-none transition-all duration-200"
      :class="{ 'c-switch__track--active': checked }"
      @click="checked = !checked"
      @keydown.enter.prevent="checked = !checked"
      @keydown.space.prevent="checked = !checked"
    >
      <span
        class="c-switch__thumb absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200"
        :class="{ 'translate-x-4': checked }"
      />
    </button>
    <span v-if="label" class="c-switch__label text-sm">{{ label }}</span>
  </label>
</template>

<style lang="less" scoped>
.c-switch {
  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  &__track {
    background: var(--bg-surface-2);
    border: 1px solid var(--border-subtle);

    &:focus-visible {
      box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary);
    }

    &--active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
    }
  }

  &__thumb {
    background: var(--text-on-accent);
  }

  &__label {
    color: var(--text-primary);
    user-select: none;
  }
}
</style>
