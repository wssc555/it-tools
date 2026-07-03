<script setup lang="ts">
import {
  MAX_ARABIC_TO_ROMAN,
  MIN_ARABIC_TO_ROMAN,
  arabicToRoman,
  isValidRomanNumber,
  romanToArabic,
} from './roman-numeral-converter.service';
import { useCopy } from '@/composable/copy';
import { useValidation } from '@/composable/validation';

const inputNumeral = ref(42);
const outputRoman = computed(() => arabicToRoman(inputNumeral.value));

const { attrs: validationNumeral } = useValidation({
  source: inputNumeral,
  rules: [
    {
      validator: value => value >= MIN_ARABIC_TO_ROMAN && value <= MAX_ARABIC_TO_ROMAN,
      message: `We can only convert numbers between ${MIN_ARABIC_TO_ROMAN.toLocaleString()} and ${MAX_ARABIC_TO_ROMAN.toLocaleString()}`,
    },
  ],
});

const inputRoman = ref('XLII');
const outputNumeral = computed(() => romanToArabic(inputRoman.value));

const validationRoman = useValidation({
  source: inputRoman,
  rules: [
    {
      validator: value => isValidRomanNumber(value),
      message: 'The input you entered is not a valid roman number',
    },
  ],
});

const { copy: copyRoman } = useCopy({ source: outputRoman, text: 'Roman number copied to the clipboard' });
const { copy: copyArabic } = useCopy({ source: () => String(outputNumeral), text: 'Arabic number copied to the clipboard' });
</script>

<template>
  <div>
    <c-card title="Arabic to roman">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <label class="text-sm text-[var(--text-secondary)]">Number:</label>
          <input
            v-model.number="inputNumeral"
            type="number"
            :min="1"
            class="h-10 w-[200px] rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
          />
          <span v-if="validationNumeral.validationStatus === 'error'" class="text-xs text-[var(--state-danger)]">{{ validationNumeral.validationErrorMessage }}</span>
        </div>
        <div class="text-[22px] font-mono text-[var(--text-primary)]">
          {{ outputRoman }}
        </div>
        <c-button :disabled="validationNumeral.validationStatus === 'error'" @click="copyRoman()">
          Copy
        </c-button>
      </div>
    </c-card>
    <c-card title="Roman to arabic" class="mt-5">
      <div class="flex items-center justify-between gap-4">
        <c-input-text v-model:value="inputRoman" style="width: 200px" :validation="validationRoman" />

        <div class="text-[22px] font-mono text-[var(--text-primary)]">
          {{ outputNumeral }}
        </div>
        <c-button :disabled="!validationRoman.isValid" @click="copyArabic()">
          Copy
        </c-button>
      </div>
    </c-card>
  </div>
</template>