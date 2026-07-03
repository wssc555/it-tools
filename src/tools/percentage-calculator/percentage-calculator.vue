<script setup lang="ts">
import InputCopyable from '@/components/InputCopyable.vue';

const percentageX = ref();
const percentageY = ref();
const percentageResult = computed(() => {
  if (percentageX.value === undefined || percentageY.value === undefined) {
    return '';
  }
  return (percentageX.value / 100 * percentageY.value).toString();
});

const numberX = ref();
const numberY = ref();
const numberResult = computed(() => {
  if (numberX.value === undefined || numberY.value === undefined) {
    return '';
  }
  const result = 100 * numberX.value / numberY.value;
  return (!Number.isFinite(result) || Number.isNaN(result)) ? '' : result.toString();
});

const numberFrom = ref();
const numberTo = ref();
const percentageIncreaseDecrease = computed(() => {
  if (numberFrom.value === undefined || numberTo.value === undefined) {
    return '';
  }
  const result = (numberTo.value - numberFrom.value) / numberFrom.value * 100;
  return (!Number.isFinite(result) || Number.isNaN(result)) ? '' : result.toString();
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card class="mb-3">
        <div class="mb-3 sm:hidden">What is</div>
        <div class="flex gap-2">
          <div class="hidden pt-1 sm:block" style="min-width: 48px;">What is</div>
          <input
            v-model.number="percentageX"
            data-test-id="percentageX"
            type="number"
            placeholder="X"
            class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
          />
          <div class="min-w-fit pt-1">% of</div>
          <input
            v-model.number="percentageY"
            data-test-id="percentageY"
            type="number"
            placeholder="Y"
            class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
          />
          <InputCopyable v-model:value="percentageResult" data-test-id="percentageResult" readonly placeholder="Result" style="max-width: 150px;" />
        </div>
      </c-card>

      <c-card class="mb-3">
        <div class="mb-3 sm:hidden">X is what percent of Y</div>
        <div class="flex gap-2">
          <input
            v-model.number="numberX"
            data-test-id="numberX"
            type="number"
            placeholder="X"
            class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
          />
          <div class="hidden min-w-fit pt-1 sm:block">is what percent of</div>
          <input
            v-model.number="numberY"
            data-test-id="numberY"
            type="number"
            placeholder="Y"
            class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
          />
          <InputCopyable v-model:value="numberResult" data-test-id="numberResult" readonly placeholder="Result" style="max-width: 150px;" />
        </div>
      </c-card>

      <c-card class="mb-3">
        <div class="mb-3">What is the percentage increase/decrease</div>
        <div class="flex gap-2">
          <input
            v-model.number="numberFrom"
            data-test-id="numberFrom"
            type="number"
            placeholder="From"
            class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
          />
          <input
            v-model.number="numberTo"
            data-test-id="numberTo"
            type="number"
            placeholder="To"
            class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
          />
          <InputCopyable v-model:value="percentageIncreaseDecrease" data-test-id="percentageIncreaseDecrease" readonly placeholder="Result" style="max-width: 150px;" />
        </div>
      </c-card>
    </div>
  </div>
</template>