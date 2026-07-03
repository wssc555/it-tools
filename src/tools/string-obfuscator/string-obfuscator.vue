<script setup lang="ts">
import { useObfuscateString } from './string-obfuscator.model';
import { useCopy } from '@/composable/copy';

const str = ref('Lorem ipsum dolor sit amet');
const keepFirst = ref(4);
const keepLast = ref(4);
const keepSpace = ref(true);

const obfuscatedString = useObfuscateString(str, { keepFirst, keepLast, keepSpace });
const { copy } = useCopy({ source: obfuscatedString });
</script>

<template>
  <div>
    <c-input-text v-model:value="str" raw-text placeholder="Enter string to obfuscate" label="String to obfuscate:" clearable multiline />

    <div class="mt-4 flex gap-2.5">
      <div>
        <div class="mb-1 text-sm text-[var(--text-secondary)]">Keep first:</div>
        <input
          v-model.number="keepFirst"
          type="number"
          min="0"
          class="h-10 w-24 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
        />
      </div>

      <div>
        <div class="mb-1 text-sm text-[var(--text-secondary)]">Keep last:</div>
        <input
          v-model.number="keepLast"
          type="number"
          min="0"
          class="h-10 w-24 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
        />
      </div>

      <div>
        <div class="mb-1 text-sm text-[var(--text-secondary)]">Keep spaces:</div>
        <label class="flex cursor-pointer items-center gap-2">
          <input
            v-model="keepSpace"
            type="checkbox"
            class="h-5 w-5 cursor-pointer accent-[var(--accent-primary)]"
          />
          <span class="text-sm text-[var(--text-primary)]">Enabled</span>
        </label>
      </div>
    </div>

    <c-card v-if="obfuscatedString" class="mt-15 max-w-[600px] flex items-center gap-1.5 font-mono">
      <div class="break-anywhere text-wrap">
        {{ obfuscatedString }}
      </div>

      <c-button @click="copy()">
        <icon-mdi:content-copy />
      </c-button>
    </c-card>
  </div>
</template>