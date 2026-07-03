<script setup lang="ts">
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool }>();
const { tool } = toRefs(props);
</script>

<template>
  <div class="relative">
    <component :is="tool.icon" size="20" class="text-[var(--text-muted)]" />
    <div v-if="tool.isNew" class="absolute -left-1.5 top-0.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
  </div>
</template>