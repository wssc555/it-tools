<script setup lang="ts">
// Duplicate issue with sub directory

import { addMilliseconds, formatRelative } from 'date-fns';

import { enGB } from 'date-fns/locale';

import { formatMsDuration } from './eta-calculator.service';

const unitCount = ref(3 * 62);
const unitPerTimeSpan = ref(3);
const timeSpan = ref(5);
const timeSpanUnitMultiplier = ref(60000);
const startedAt = ref(Date.now());

const durationMs = computed(() => {
  const timeSpanMs = timeSpan.value * timeSpanUnitMultiplier.value;

  return unitCount.value / (unitPerTimeSpan.value / timeSpanMs);
});
const endAt = computed(() =>
  formatRelative(addMilliseconds(startedAt.value, durationMs.value), Date.now(), { locale: enGB }),
);
</script>

<template>
  <div>
    <div text-justify op-70>
      With a concrete example, if you wash 5 plates in 3 minutes and you have 500 plates to wash, it will take you 5
      hours to wash them all.
    </div>
    <hr class="my-3 border-0 h-px bg-[var(--border-subtle)]" />
    <div class="flex gap-2">
      <div class="flex-1">
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Amount of element to consume</label>
        <input v-model.number="unitCount" type="number" min="1" class="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]" />
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">The consumption started at</label>
        <input v-model="startedAt" type="datetime-local" class="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]" />
      </div>
    </div>

    <p>Amount of unit consumed by time span</p>
    <div flex flex-col items-baseline gap-y-2 md:flex-row>
      <input v-model.number="unitPerTimeSpan" type="number" min="1" class="rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]" />
      <div flex items-baseline gap-2>
        <span ml-2>in</span>
        <input v-model.number="timeSpan" type="number" min="1" class="min-w-[130px] rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]" />
        <c-select
          v-model:value="timeSpanUnitMultiplier"
          min-w-130px
          :options="[
            { label: 'milliseconds', value: 1 },
            { label: 'seconds', value: 1000 },
            { label: 'minutes', value: 1000 * 60 },
            { label: 'hours', value: 1000 * 60 * 60 },
            { label: 'days', value: 1000 * 60 * 60 * 24 },
          ]"
        />
      </div>
    </div>

    <hr class="my-3 border-0 h-px bg-[var(--border-subtle)]" />
    <c-card mb-2>
      <div class="text-sm font-medium text-[var(--text-secondary)] mb-1">Total duration</div>
      <div class="text-lg font-semibold">{{ formatMsDuration(durationMs) }}</div>
    </c-card>
    <c-card>
      <div class="text-sm font-medium text-[var(--text-secondary)] mb-1">It will end</div>
      <div class="text-lg font-semibold">{{ endAt }}</div>
    </c-card>
  </div>
</template>


