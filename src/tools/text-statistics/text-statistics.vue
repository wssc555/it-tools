<script setup lang="ts">
import { getStringSizeInBytes } from './text-statistics.service';
import { formatBytes } from '@/utils/convert';

const text = ref('');
</script>

<template>
  <c-card>
    <c-input-text v-model:value="text" multiline placeholder="Your text..." rows="5" />

    <div class="mt-5 grid grid-cols-4 gap-4">
      <div class="flex flex-col items-center rounded-lg bg-[var(--bg-surface-2)] p-4">
        <span class="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Characters</span>
        <span class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ text.length }}</span>
      </div>
      <div class="flex flex-col items-center rounded-lg bg-[var(--bg-surface-2)] p-4">
        <span class="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Words</span>
        <span class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ text === '' ? 0 : text.split(/\s+/).length }}</span>
      </div>
      <div class="flex flex-col items-center rounded-lg bg-[var(--bg-surface-2)] p-4">
        <span class="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Lines</span>
        <span class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ text === '' ? 0 : text.split(/\r\n|\r|\n/).length }}</span>
      </div>
      <div class="flex flex-col items-center rounded-lg bg-[var(--bg-surface-2)] p-4">
        <span class="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Size</span>
        <span class="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{{ formatBytes(getStringSizeInBytes(text)) }}</span>
      </div>
    </div>
  </c-card>
</template>