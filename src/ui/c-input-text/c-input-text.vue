<script lang="ts" setup>
import { generateRandomId } from '@/utils/random';
import { type UseValidationRule, useValidation } from '@/composable/validation';

const props = withDefaults(
  defineProps<{
    value?: string
    id?: string
    placeholder?: string
    label?: string
    readonly?: boolean
    disabled?: boolean
    validationRules?: UseValidationRule<string>[]
    validationWatch?: Ref<unknown>[]
    validation?: ReturnType<typeof useValidation>
    labelPosition?: 'top' | 'left'
    labelWidth?: string
    labelAlign?: 'left' | 'right'
    clearable?: boolean
    testId?: string
    autocapitalize?: 'none' | 'sentences' | 'words' | 'characters' | 'on' | 'off' | string
    autocomplete?: 'on' | 'off' | string
    autocorrect?: 'on' | 'off' | string
    spellcheck?: 'true' | 'false' | boolean
    rawText?: boolean
    type?: 'text' | 'password'
    multiline?: boolean
    rows?: number | string
    autosize?: boolean
    autofocus?: boolean
    monospace?: boolean
  }>(),
  {
    value: '',
    id: generateRandomId,
    placeholder: 'Input text',
    label: undefined,
    readonly: false,
    disabled: false,
    validationRules: () => [],
    validationWatch: undefined,
    validation: undefined,
    labelPosition: 'top',
    labelWidth: 'auto',
    labelAlign: 'left',
    clearable: false,
    testId: undefined,
    autocapitalize: undefined,
    autocomplete: undefined,
    autocorrect: undefined,
    spellcheck: undefined,
    rawText: false,
    type: 'text',
    multiline: false,
    rows: 3,
    autosize: false,
    autofocus: false,
    monospace: false,
  },
);
const emit = defineEmits(['update:value']);
const value = useVModel(props, 'value', emit);
const showPassword = ref(false);

const { id, placeholder, label, validationRules, labelPosition, labelWidth, labelAlign, autosize, readonly, disabled, clearable, type, multiline, rows, rawText, autofocus, monospace } = toRefs(props);

const validation
  = props.validation
  ?? useValidation({
    rules: validationRules,
    source: value,
    watch: props.validationWatch,
  });

const textareaRef = ref<HTMLTextAreaElement>();
const inputRef = ref<HTMLInputElement>();
const inputWrapperRef = ref<HTMLElement>();

watch(
  [value, autosize, multiline, inputWrapperRef, textareaRef],
  () => nextTick(() => {
    if (props.multiline && autosize.value) {
      resizeTextarea();
    }
  }),
  { immediate: true },
);

function resizeTextarea() {
  if (!textareaRef.value || !inputWrapperRef.value) {
    return;
  }

  const scrollHeight = textareaRef.value.scrollHeight + 2;

  inputWrapperRef.value.style.height = `${scrollHeight}px`;
}

const htmlInputType = computed(() => {
  if (props.type === 'password' && !showPassword.value) {
    return 'password';
  }

  return 'text';
});

function focus() {
  if (textareaRef.value) {
    textareaRef.value.focus();
  }

  if (inputRef.value) {
    inputRef.value.focus();
  }
}

function blur() {
  if (textareaRef.value) {
    textareaRef.value.blur?.();
  }

  if (inputRef.value) {
    inputRef.value.blur?.();
  }
}

onMounted(() => {
  if (autofocus.value) {
    focus();
  }
});

defineExpose({
  inputWrapperRef,
  focus,
  blur,
});
</script>

<template>
  <div
    class="c-input-text flex w-full flex-col"
    :class="{
      'flex-row items-baseline': labelPosition === 'left',
      'c-input-text--error': !validation.isValid,
      'c-input-text--disabled': disabled,
      'c-input-text--multiline': multiline,
    }"
  >
    <label v-if="label" :for="id" class="c-input-text__label mb-1 shrink-0 pe-3" :style="{ flexBasis: labelWidth, textAlign: labelAlign }">
      {{ label }}
    </label>

    <div class="c-input-text__feedback-wrapper min-w-0 flex-1">
      <div ref="inputWrapperRef" class="c-input-text__wrapper flex flex-row items-center overflow-hidden rounded-[var(--radius-sm)] border px-3 transition-[border-color] duration-200"
        :class="{
          'resize-y': multiline,
        }"
      >
        <slot name="prefix" />

        <textarea
          v-if="multiline"
          :id="id"
          ref="textareaRef"
          v-model="value"
          class="c-input-text__input h-full w-full resize-none border-none bg-transparent py-2 outline-none [word-break:break-word] [white-space:pre-wrap] [overflow-wrap:break-word]"
          :class="{ 'font-mono !important': monospace }"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="disabled"
          :data-test-id="testId"
          :autocapitalize="autocapitalize ?? (rawText ? 'off' : undefined)"
          :autocomplete="autocomplete ?? (rawText ? 'off' : undefined)"
          :autocorrect="autocorrect ?? (rawText ? 'off' : undefined)"
          :spellcheck="spellcheck ?? (rawText ? false : undefined)"
          :rows="rows"
        />

        <input
          v-else
          :id="id"
          ref="inputRef"
          v-model="value"
          :type="htmlInputType"
          class="c-input-text__input min-w-0 flex-1 border-none bg-transparent py-2 outline-none"
          :class="{ 'font-mono !important': monospace }"
          size="1"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="disabled"
          :data-test-id="testId"
          :autocapitalize="autocapitalize ?? (rawText ? 'off' : undefined)"
          :autocomplete="autocomplete ?? (rawText ? 'off' : undefined)"
          :autocorrect="autocorrect ?? (rawText ? 'off' : undefined)"
          :spellcheck="spellcheck ?? (rawText ? false : undefined)"
        >

        <c-button v-if="clearable && value" variant="text" circle size="small" @click="value = ''">
          <icon-mdi-close />
        </c-button>

        <c-button v-if="type === 'password'" variant="text" circle size="small" @click="showPassword = !showPassword">
          <icon-mdi-eye v-if="!showPassword" />
          <icon-mdi-eye-off v-if="showPassword" />
        </c-button>
        <slot name="suffix" />
      </div>
      <span v-if="!validation.isValid" class="c-input-text__feedback mt-1 block text-sm">
        {{ validation.message }}
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.c-input-text {
  &__label {
    color: var(--text-primary);
    font-size: 14px;
    line-height: 1.5;
  }

  &__wrapper {
    background: var(--surface-input);
    border-color: var(--border-subtle);
    color: var(--text-primary);
    min-height: 40px;

    &:hover {
      border-color: var(--accent-primary);
    }

    &:focus-within {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px var(--accent-primary-glow);
    }
  }

  &__input {
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 15px;
    line-height: 1.5;

    &::placeholder {
      color: var(--text-muted);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__feedback {
    color: var(--state-danger);
  }

  /* ─── Error state ─── */
  &--error &__wrapper {
    border-color: var(--state-danger);
    &:hover, &:focus-within {
      border-color: var(--state-danger);
    }
    &:focus-within {
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--state-danger), transparent 80%);
    }
  }

  /* ─── Disabled state ─── */
  &--disabled {
    opacity: 0.5;
    pointer-events: none;

    .c-input-text__wrapper {
      &:hover, &:focus-within {
        border-color: var(--border-subtle);
      }
    }
  }
}
</style>