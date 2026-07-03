<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
</script>

<template>
  <router-link :to="tool.path" class="tool-card-link block no-underline">
    <div class="tool-card flex h-full cursor-pointer flex-col rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 transition-all duration-200 hover:border-[color-mix(in_srgb,var(--accent-primary),transparent_75%)] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-primary),transparent_92%)]">
      <div class="mb-3 flex items-start justify-between">
        <component :is="tool.icon" class="shrink-0 text-[var(--text-muted)] opacity-70" size="36" />
        <div class="flex items-center gap-1.5">
          <FavoriteButton :tool="tool" />
          <div
            v-if="tool.isNew"
            class="new-badge rounded-full bg-[var(--accent-primary)] px-2 py-0.5 text-[11px] font-semibold uppercase leading-normal tracking-wide text-white"
          >
            {{ $t('toolCard.new') }}
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-1 overflow-hidden text-ellipsis whitespace-nowrap font-[var(--font-heading)] text-[15px] font-semibold text-[var(--text-primary)]">
          {{ tool.name }}
        </div>
        <div class="line-clamp-2 text-[13px] leading-snug text-[var(--text-secondary)]">
          {{ tool.description }}
        </div>
      </div>
    </div>
  </router-link>
</template>