<script setup lang="ts">
import InputCopyable from '../../components/InputCopyable.vue';
import { convertBase } from './integer-base-converter.model';
import { getErrorMessageIfThrows } from '@/utils/error';

const inputProps = {
  'labelPosition': 'left',
  'labelWidth': '170px',
  'labelAlign': 'right',
  'readonly': true,
  'mb-2': '',
} as const;

const input = ref('42');
const inputBase = ref(10);
const outputBase = ref(42);

function errorlessConvert(...args: Parameters<typeof convertBase>) {
  try {
    return convertBase(...args);
  }
  catch (err) {
    return '';
  }
}

const error = computed(() =>
  getErrorMessageIfThrows(() =>
    convertBase({ value: input.value, fromBase: inputBase.value, toBase: outputBase.value }),
  ),
);
</script>

<template>
  <div>
    <c-card>
      <c-input-text v-model:value="input" label="Input number" placeholder="Put your number here (ex: 42)" label-position="left" label-width="110px" mb-2 label-align="right" />

      <label class="flex items-center gap-2 text-sm mb-2" style="padding-left: 110px">
        <span class="shrink-0">Input base</span>
        <input
          v-model.number="inputBase"
          type="number"
          max="64"
          min="2"
          placeholder="Put your input base here (ex: 10)"
          class="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]"
        />
      </label>

      <c-alert v-if="error" type="error" class="mt-6">
        {{ error }}
      </c-alert>
      <hr class="my-3 border-0 h-px bg-[var(--border-subtle)]" />

      <InputCopyable
        label="Binary (2)"
        v-bind="inputProps"
        :value="errorlessConvert({ value: input, fromBase: inputBase, toBase: 2 })"
        placeholder="Binary version will be here..."
      />

      <InputCopyable
        label="Octal (8)"
        v-bind="inputProps"
        :value="errorlessConvert({ value: input, fromBase: inputBase, toBase: 8 })"
        placeholder="Octal version will be here..."
      />

      <InputCopyable
        label="Decimal (10)"
        v-bind="inputProps"
        :value="errorlessConvert({ value: input, fromBase: inputBase, toBase: 10 })"
        placeholder="Decimal version will be here..."
      />

      <InputCopyable
        label="Hexadecimal (16)"
        v-bind="inputProps"
        :value="errorlessConvert({ value: input, fromBase: inputBase, toBase: 16 })"
        placeholder="Hexadecimal version will be here..."
      />

      <InputCopyable
        label="Base64 (64)"
        v-bind="inputProps"
        :value="errorlessConvert({ value: input, fromBase: inputBase, toBase: 64 })"
        placeholder="Base64 version will be here..."
      />

      <div flex items-baseline>
        <div class="flex items-center gap-0 mr-10 shrink-0" style="width: 160px">
          <span class="flex items-center px-2 py-1 text-sm bg-[var(--bg-surface)] border border-[var(--border-default)] border-r-0 rounded-l-[var(--radius-sm)] text-[var(--text-secondary)]">Custom:</span>
          <input
            v-model.number="outputBase"
            type="number"
            max="64"
            min="2"
            class="flex-1 rounded-none rounded-r-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)] min-w-0"
          />
        </div>

        <InputCopyable
          flex-1
          v-bind="inputProps"
          :value="errorlessConvert({ value: input, fromBase: inputBase, toBase: outputBase })"
          :placeholder="`Base ${outputBase} will be here...`"
        />
      </div>
    </c-card>
  </div>
</template>


