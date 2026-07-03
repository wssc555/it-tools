<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const route = useRoute();

const head = computed<HeadObject>(() => ({
  title: `${route.meta.name} - IT Tools`,
  meta: [
    {
      name: 'description',
      content: route.meta?.description as string,
    },
    {
      name: 'keywords',
      content: ((route.meta.keywords ?? []) as string[]).join(','),
    },
  ],
}));
useHead(head);
const { t } = useI18n();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));
</script>

<template>
  <BaseLayout>
    <div class="tool-layout mx-auto w-full" style="max-width: 1400px;">
      <!-- Tool Header -->
      <div class="px-0 pb-6 pt-2">
        <div class="flex items-center justify-between gap-3">
          <h1 class="m-0 font-[var(--font-heading)] text-[28px] font-semibold leading-tight tracking-tight text-[var(--text-primary)]" style="opacity: 0.95; letter-spacing: -0.02em;">
            {{ toolTitle }}
          </h1>
          <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
        </div>
        <div class="mt-1.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {{ toolDescription }}
        </div>
      </div>

      <!-- Tool Content (workbench area) -->
      <div class="flex w-full flex-col gap-5">
        <slot />
      </div>
    </div>
  </BaseLayout>
</template>