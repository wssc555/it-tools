<script setup lang="ts">
import { compareSync, hashSync } from 'bcryptjs';
import { useCopy } from '@/composable/copy';

const input = ref('');
const saltCount = ref(10);
const hashed = computed(() => hashSync(input.value, saltCount.value));
const { copy } = useCopy({ source: hashed, text: 'Hashed string copied to the clipboard' });

const compareString = ref('');
const compareHash = ref('');
const compareMatch = computed(() => compareSync(compareString.value, compareHash.value));
</script>

<template>
  <c-card title="Hash">
    <div class="mb-4 flex flex-col gap-1">
      <label class="text-sm text-[var(--text-secondary)]" style="min-width: 120px;">Your string:</label>
      <c-input-text
        v-model:value="input"
        placeholder="Your string to bcrypt..."
        raw-text
      />
    </div>
    <div class="mb-4 flex flex-col gap-1">
      <label class="text-sm text-[var(--text-secondary)]" style="min-width: 120px;">Salt count:</label>
      <div class="flex items-center gap-2">
        <input
          v-model.number="saltCount"
          type="number"
          min="0"
          max="100"
          class="h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
        />
      </div>
    </div>

    <c-input-text :value="hashed" readonly class="text-center" />

    <div class="mt-5 flex justify-center">
      <c-button @click="copy()">
        Copy hash
      </c-button>
    </div>
  </c-card>

  <c-card title="Compare string with hash">
    <div class="mb-4 flex flex-col gap-1">
      <label class="text-sm text-[var(--text-secondary)]" style="min-width: 120px;">Your string:</label>
      <c-input-text v-model:value="compareString" placeholder="Your string to compare..." raw-text />
    </div>
    <div class="mb-4 flex flex-col gap-1">
      <label class="text-sm text-[var(--text-secondary)]" style="min-width: 120px;">Your hash:</label>
      <c-input-text v-model:value="compareHash" placeholder="Your hash to compare..." raw-text />
    </div>
    <div class="flex items-center gap-3">
      <label class="text-sm text-[var(--text-secondary)]" style="min-width: 120px;">Do they match?</label>
      <div class="compare-result font-semibold" :class="{ positive: compareMatch }">
        {{ compareMatch ? 'Yes' : 'No' }}
      </div>
    </div>
  </c-card>
</template>

<style lang="less" scoped>
.compare-result {
  color: var(--state-danger);

  &.positive {
    color: var(--state-success);
  }
}

input[type="number"] {
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
}
</style>