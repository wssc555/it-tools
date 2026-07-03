<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();

const sections = [
  {
    name: 'Screen',
    information: [
      { label: 'Screen size', value: computed(() => `${window.screen.availWidth} x ${window.screen.availHeight}`) },
      { label: 'Orientation', value: computed(() => window.screen.orientation.type) },
      { label: 'Orientation angle', value: computed(() => `${window.screen.orientation.angle}°`) },
      { label: 'Color depth', value: computed(() => `${window.screen.colorDepth} bits`) },
      { label: 'Pixel ratio', value: computed(() => `${window.devicePixelRatio} dppx`) },
      { label: 'Window size', value: computed(() => `${width.value} x ${height.value}`) },
    ],
  },
  {
    name: 'Device',
    information: [
      { label: 'Browser vendor', value: computed(() => navigator.vendor) },
      { label: 'Languages', value: computed(() => navigator.languages.join(', ')) },
      { label: 'Platform', value: computed(() => navigator.platform) },
      { label: 'User agent', value: computed(() => navigator.userAgent) },
    ],
  },
];
</script>

<template>
  <c-card v-for="{ name, information } in sections" :key="name" :title="name">
    <div class="grid gap-3 sm:grid-cols-2">
      <div v-for="{ label, value: { value } } in information" :key="label" class="information rounded-md bg-[color-mix(in_srgb,var(--text-primary),transparent_93%)] p-3.5">
        <div class="mb-1 text-sm leading-none opacity-80 text-[var(--text-secondary)]">
          {{ label }}
        </div>
        <div class="truncate text-xl font-normal text-[var(--text-primary)]" :title="value">
          {{ value }}
        </div>
      </div>
    </div>
  </c-card>
</template>