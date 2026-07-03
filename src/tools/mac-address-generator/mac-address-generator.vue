<script setup lang="ts">
import _ from 'lodash';
import { generateRandomMacAddress } from './mac-adress-generator.models';
import { computedRefreshable } from '@/composable/computedRefreshable';
import { useCopy } from '@/composable/copy';
import { usePartialMacAddressValidation } from '@/utils/macAddress';

const amount = useStorage('mac-address-generator-amount', 1);
const macAddressPrefix = useStorage('mac-address-generator-prefix', '64:16:7F');

const prefixValidation = usePartialMacAddressValidation(macAddressPrefix);

const casesTransformers = [
  { label: 'Uppercase', value: (value: string) => value.toUpperCase() },
  { label: 'Lowercase', value: (value: string) => value.toLowerCase() },
];
const caseTransformer = ref(casesTransformers[0].value);

const separators = [
  { label: ':', value: ':' },
  { label: '-', value: '-' },
  { label: '.', value: '.' },
  { label: 'None', value: '' },
];
const separator = useStorage('mac-address-generator-separator', separators[0].value);

const [macAddresses, refreshMacAddresses] = computedRefreshable(() => {
  if (!prefixValidation.isValid) {
    return '';
  }

  const ids = _.times(amount.value, () => caseTransformer.value(generateRandomMacAddress({
    prefix: macAddressPrefix.value,
    separator: separator.value,
  })));
  return ids.join('\n');
});

const { copy } = useCopy({ source: macAddresses, text: 'MAC addresses copied to the clipboard' });
</script>

<template>
  <div class="flex flex-col justify-center gap-2">
    <div class="flex items-center gap-2">
      <label class="w-[150px] pr-3 text-right text-sm text-[var(--text-secondary)]">Quantity:</label>
      <input
        v-model.number="amount"
        type="number"
        min="1"
        max="100"
        class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
      />
    </div>

    <c-input-text
      v-model:value="macAddressPrefix"
      label="MAC address prefix:"
      placeholder="Set a prefix, e.g. 64:16:7F"
      clearable
      label-position="left"
      spellcheck="false"
      :validation="prefixValidation"
      raw-text
      label-width="150px"
      label-align="right"
    />

    <c-buttons-select
      v-model:value="caseTransformer"
      :options="casesTransformers"
      label="Case:"
      label-width="150px"
      label-align="right"
    />

    <c-buttons-select
      v-model:value="separator"
      :options="separators"
      label="Separator:"
      label-width="150px"
      label-align="right"
    />

    <c-card class="mt-5 flex" data-test-id="ulids">
      <pre class="m-0 mx-auto">{{ macAddresses }}</pre>
    </c-card>

    <div class="flex justify-center gap-2">
      <c-button data-test-id="refresh" @click="refreshMacAddresses()">Refresh</c-button>
      <c-button @click="copy()">Copy</c-button>
    </div>
  </div>
</template>