<script setup lang="ts">
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-vue';
import { Netmask } from 'netmask';
import { useStorage } from '@vueuse/core';
import { getIPClass } from './ipv4-subnet-calculator.models';
import { withDefaultOnError } from '@/utils/defaults';
import { isNotThrowing } from '@/utils/boolean';
import SpanCopyable from '@/components/SpanCopyable.vue';

const ip = useStorage('ipv4-subnet-calculator:ip', '192.168.0.1/24');

const getNetworkInfo = (address: string) => new Netmask(address.trim());

const networkInfo = computed(() => withDefaultOnError(() => getNetworkInfo(ip.value), undefined));

const ipValidationRules = [
  {
    message: 'We cannot parse this address, check the format',
    validator: (value: string) => isNotThrowing(() => getNetworkInfo(value.trim())),
  },
];

const sections: { label: string; getValue: (blocks: Netmask) => string | undefined; undefinedFallback?: string }[] = [
  { label: 'Netmask', getValue: block => block.toString() },
  { label: 'Network address', getValue: ({ base }) => base },
  { label: 'Network mask', getValue: ({ mask }) => mask },
  { label: 'Network mask in binary', getValue: ({ bitmask }) => ('1'.repeat(bitmask) + '0'.repeat(32 - bitmask)).match(/.{8}/g)?.join('.') ?? '' },
  { label: 'CIDR notation', getValue: ({ bitmask }) => `/${bitmask}` },
  { label: 'Wildcard mask', getValue: ({ hostmask }) => hostmask },
  { label: 'Network size', getValue: ({ size }) => String(size) },
  { label: 'First address', getValue: ({ first }) => first },
  { label: 'Last address', getValue: ({ last }) => last },
  { label: 'Broadcast address', getValue: ({ broadcast }) => broadcast, undefinedFallback: 'No broadcast address with this mask' },
  { label: 'IP class', getValue: ({ base: ip }) => getIPClass({ ip }), undefinedFallback: 'Unknown class type' },
];

function switchToBlock({ count = 1 }: { count?: number }) {
  const next = networkInfo.value?.next(count);
  if (next) ip.value = next.toString();
}
</script>

<template>
  <div>
    <c-input-text v-model:value="ip" label="An IPv4 address with or without mask" placeholder="The ipv4 address..." :validation-rules="ipValidationRules" class="mb-4" />

    <div v-if="networkInfo">
      <div class="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
        <table class="w-full border-collapse text-sm">
          <tbody>
            <tr v-for="{ getValue, label, undefinedFallback } in sections" :key="label" class="border-b border-[var(--border-subtle)] last:border-b-0">
              <td class="px-4 py-2 font-semibold text-[var(--text-primary)]" style="white-space: nowrap;">{{ label }}</td>
              <td class="px-4 py-2 text-[var(--text-secondary)]">
                <SpanCopyable v-if="getValue(networkInfo)" :value="getValue(networkInfo)" />
                <span v-else class="opacity-70 text-[var(--text-muted)]">{{ undefinedFallback }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-3 flex items-center justify-between">
        <c-button @click="switchToBlock({ count: -1 })">
          <IconArrowLeft size="20" />
          Previous block
        </c-button>
        <c-button @click="switchToBlock({ count: 1 })">
          Next block
          <IconArrowRight size="20" />
        </c-button>
      </div>
    </div>
  </div>
</template>