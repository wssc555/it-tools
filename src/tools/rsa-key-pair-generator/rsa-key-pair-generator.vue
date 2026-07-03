<script setup lang="ts">
import { generateKeyPair } from './rsa-key-pair-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { withDefaultOnErrorAsync } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import { computedRefreshableAsync } from '@/composable/computedRefreshable';

const bits = ref(2048);
const emptyCerts = { publicKeyPem: '', privateKeyPem: '' };

const { attrs: bitsValidationAttrs } = useValidation({
  source: bits,
  rules: [
    {
      message: 'Bits should be 256 <= bits <= 16384 and be a multiple of 8',
      validator: value => value >= 256 && value <= 16384 && value % 8 === 0,
    },
  ],
});

const [certs, refreshCerts] = computedRefreshableAsync(
  () => withDefaultOnErrorAsync(() => generateKeyPair({ bits: bits.value }), emptyCerts),
  emptyCerts,
);
</script>

<template>
  <div style="flex: 0 0 100%">
    <div class="mx-auto flex max-w-[600px] items-end gap-3" style="flex: 1 1 0">
      <div class="flex flex-col gap-1">
        <label class="text-sm text-[var(--text-secondary)]" style="min-width: 100px;">Bits:</label>
        <input
          v-model.number="bits"
          type="number"
          min="256"
          max="16384"
          step="8"
          class="h-10 w-32 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
        />
        <span v-if="bitsValidationAttrs.validationStatus === 'error'" class="text-xs text-[var(--state-danger)]">{{ bitsValidationAttrs.validationErrorMessage }}</span>
      </div>

      <c-button @click="refreshCerts">Refresh key-pair</c-button>
    </div>
  </div>

  <div>
    <h3>Public key</h3>
    <TextareaCopyable :value="certs.publicKeyPem" />
  </div>

  <div>
    <h3>Private key</h3>
    <TextareaCopyable :value="certs.privateKeyPem" />
  </div>
</template>