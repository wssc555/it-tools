<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: boolean
  disabled?: boolean
  label?: string
  testId?: string
  indeterminate?: boolean
}>(), {
  value: false,
  disabled: false,
  label: undefined,
  testId: undefined,
  indeterminate: false,
});

const emit = defineEmits(['update:value']);
const checked = useVModel(props, 'value', emit);

const inputRef = ref<HTMLInputElement>();

watchEffect(() => {
  if (inputRef.value) {
    inputRef.value.indeterminate = props.indeterminate;
  }
});
</script>

<template>
  <label
    class="c-checkbox inline-flex cursor-pointer items-center gap-2"
    :class="{ 'c-checkbox--disabled': disabled }"
    :data-test-id="testId"
  >
    <input
      ref="inputRef"
      v-model="checked"
      type="checkbox"
      :disabled="disabled"
      class="c-checkbox__input sr-only"
    >
    <span
      class="c-checkbox__box flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-all duration-150"
      :class="{
        'c-checkbox__box--checked': checked,
        'c-checkbox__box--indeterminate': indeterminate && !checked,
      }"
    >
      <icon-mdi-check v-if="checked" class="h-3 w-3" />
      <icon-mdi-minus v-if="indeterminate && !checked" class="h-3 w-3" />
    </span>
    <span v-if="label" class="c-checkbox__label text-sm">{{ label }}</span>
  </label>
</template>

<style lang="less" scoped>
.c-checkbox {
  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  &__box {
    border-color: var(--border-default);
    background: transparent;
    color: var(--text-on-accent);

    &:focus-visible {
      box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary);
    }

    &--checked,
    &--indeterminate {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
    }
  }

  &:hover .c-checkbox__box:not(.c-checkbox__box--checked):not(.c-checkbox__box--indeterminate) {
    border-color: var(--accent-primary);
  }

  .c-checkbox__input:focus-visible + .c-checkbox__box {
    box-shadow: 0 0 0 2px var(--bg-app), 0 0 0 4px var(--accent-primary);
  }

  &__label {
    color: var(--text-primary);
    user-select: none;
  }
}
</style>
