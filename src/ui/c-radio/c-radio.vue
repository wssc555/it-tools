<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: string
  options?: { label: string; value: string }[]
  disabled?: boolean
  name?: string
  testId?: string
}>(), {
  value: '',
  options: () => [],
  disabled: false,
  name: undefined,
  testId: undefined,
});

const emit = defineEmits(['update:value']);
const selectedValue = useVModel(props, 'value', emit);
</script>

<template>
  <div class="c-radio-group flex flex-wrap gap-3" :data-test-id="testId">
    <label
      v-for="opt in options"
      :key="opt.value"
      class="c-radio inline-flex cursor-pointer items-center gap-2"
      :class="{ 'c-radio--disabled': disabled }"
    >
      <input
        v-model="selectedValue"
        type="radio"
        :value="opt.value"
        :disabled="disabled"
        :name="name"
        class="c-radio__input sr-only"
      >
      <span
        class="c-radio__dot flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-150"
        :class="{ 'c-radio__dot--selected': selectedValue === opt.value }"
      >
        <span class="c-radio__inner h-2 w-2 rounded-full" />
      </span>
      <span class="c-radio__label text-sm">{{ opt.label }}</span>
    </label>
  </div>
</template>

<style lang="less" scoped>
.c-radio {
  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  &__dot {
    border-color: var(--border-default);
    background: transparent;

    &--selected {
      border-color: var(--accent-primary);

      .c-radio__inner {
        background: var(--accent-primary);
        transform: scale(1);
      }
    }
  }

  .c-radio__inner {
    background: transparent;
    transform: scale(0);
    transition: all 0.2s ease;
  }

  &:hover .c-radio__dot:not(.c-radio__dot--selected) {
    border-color: var(--accent-primary);
  }

  .c-radio__input:focus-visible + .c-radio__dot {
    box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary);
  }

  &__label {
    color: var(--text-primary);
    user-select: none;
  }
}
</style>
