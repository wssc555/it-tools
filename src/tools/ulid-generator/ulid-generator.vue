<script setup lang="ts">
import { ulid } from 'ulid';
import _ from 'lodash';
import { computedRefreshable } from '@/composable/computedRefreshable';
import { useCopy } from '@/composable/copy';

const amount = useStorage('ulid-generator-amount', 1);
const formats = [{ label: 'Raw', value: 'raw' }, { label: 'JSON', value: 'json' }] as const;
const format = useStorage<typeof formats[number]['value']>('ulid-generator-format', formats[0].value);

const [ulids, refreshUlids] = computedRefreshable(() => {
  const ids = _.times(amount.value, () => ulid());

  if (format.value === 'json') {
    return JSON.stringify(ids, null, 2);
  }

  return ids.join('\n');
});

const { copy } = useCopy({ source: ulids, text: 'ULIDs copied to the clipboard' });
</script>

<template>
  <div class="flex flex-col justify-center gap-2">
    <div class="flex items-center gap-2">
      <label class="w-[75px] text-sm text-[var(--text-secondary)]">Quantity:</label>
      <input
        v-model.number="amount"
        type="number"
        min="1"
        max="100"
        class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
      />
    </div>

    <c-buttons-select v-model:value="format" :options="formats" label="Format: " label-width="75px" />

    <c-card class="mt-5 flex" data-test-id="ulids">
      <pre class="m-0 mx-auto">{{ ulids }}</pre>
    </c-card>

    <div class="flex justify-center gap-2">
      <c-button data-test-id="refresh" @click="refreshUlids()">Refresh</c-button>
      <c-button @click="copy()">Copy</c-button>
    </div>
  </div>
</template>