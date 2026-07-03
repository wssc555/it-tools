<script setup lang="ts">
import { IconArrowsExchange } from '@tabler/icons-vue';
import { isValidIpv4 } from '../ipv4-address-converter/ipv4-address-converter.service';
import type { Ipv4RangeExpanderResult } from './ipv4-range-expander.types';
import { calculateCidr } from './ipv4-range-expander.service';
import ResultRow from './result-row.vue';
import { useValidation } from '@/composable/validation';

const rawStartAddress = useStorage('ipv4-range-expander:startAddress', '192.168.1.1');
const rawEndAddress = useStorage('ipv4-range-expander:endAddress', '192.168.6.255');

const result = computed(() => calculateCidr({ startIp: rawStartAddress.value, endIp: rawEndAddress.value }));

const calculatedValues: {
  label: string
  getOldValue: (result: Ipv4RangeExpanderResult | undefined) => string | undefined
  getNewValue: (result: Ipv4RangeExpanderResult | undefined) => string | undefined
}[] = [
  { label: 'Start address', getOldValue: () => rawStartAddress.value, getNewValue: result => result?.newStart },
  { label: 'End address', getOldValue: () => rawEndAddress.value, getNewValue: result => result?.newEnd },
  { label: 'Addresses in range', getOldValue: result => result?.oldSize?.toLocaleString(), getNewValue: result => result?.newSize?.toLocaleString() },
  { label: 'CIDR', getOldValue: () => '', getNewValue: result => result?.newCidr },
];

const startIpValidation = useValidation({
  source: rawStartAddress,
  rules: [{ message: 'Invalid ipv4 address', validator: ip => isValidIpv4({ ip }) }],
});
const endIpValidation = useValidation({
  source: rawEndAddress,
  rules: [{ message: 'Invalid ipv4 address', validator: ip => isValidIpv4({ ip }) }],
});

const showResult = computed(() => endIpValidation.isValid && startIpValidation.isValid && result.value !== undefined);

function onSwitchStartEndClicked() {
  const tmpStart = rawStartAddress.value;
  rawStartAddress.value = rawEndAddress.value;
  rawEndAddress.value = tmpStart;
}
</script>

<template>
  <div>
    <div class="mb-4 flex gap-4">
      <c-input-text v-model:value="rawStartAddress" label="Start address" placeholder="Start IPv4 address..." :validation="startIpValidation" clearable />
      <c-input-text v-model:value="rawEndAddress" label="End address" placeholder="End IPv4 address..." :validation="endIpValidation" clearable />
    </div>

    <div v-if="showResult" data-test-id="result" class="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
      <table class="w-full border-collapse text-left text-sm">
        <thead>
          <tr class="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)]">
            <th scope="col" class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">&nbsp;</th>
            <th scope="col" class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">old value</th>
            <th scope="col" class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">new value</th>
          </tr>
        </thead>
        <tbody>
          <ResultRow v-for="{ label, getOldValue, getNewValue } in calculatedValues" :key="label" :label="label" :old-value="getOldValue(result)" :new-value="getNewValue(result)" />
        </tbody>
      </table>
    </div>
    <c-alert v-else-if="startIpValidation.isValid && endIpValidation.isValid" title="Invalid combination of start and end IPv4 address" type="error">
      <div class="my-3 opacity-70 text-[var(--text-muted)]">
        The end IPv4 address is lower than the start IPv4 address. This is not valid and no result could be calculated.
        In the most cases the solution to solve this problem is to change start and end address.
      </div>

      <c-button @click="onSwitchStartEndClicked">
        <IconArrowsExchange size="22" class="mr-2 opacity-30" />
        Switch start and end IPv4 address
      </c-button>
    </c-alert>
  </div>
</template>