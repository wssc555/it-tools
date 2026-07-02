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
    <div class="tool-layout">
      <!-- Tool Header -->
      <div class="tool-header">
        <div class="tool-header-top">
          <n-h1 class="tool-title">
            {{ toolTitle }}
          </n-h1>
          <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
        </div>
        <div class="tool-description">
          {{ toolDescription }}
        </div>
      </div>

      <!-- Tool Content (workbench area) -->
      <div class="tool-content">
        <slot />
      </div>
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-layout {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.tool-header {
  padding: 8px 0 24px;

  .tool-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .tool-title {
    font-family: var(--font-heading);
    font-size: 28px;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
    color: var(--text-primary);
    opacity: 0.95;
    letter-spacing: -0.02em;
  }

  .tool-description {
    margin-top: 6px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--text-secondary);
  }
}

.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
</style>
