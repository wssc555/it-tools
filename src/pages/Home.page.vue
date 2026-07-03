<script setup lang="ts">
import { IconDragDrop, IconHeart } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import ColoredCard from '../components/ColoredCard.vue';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';
import { config } from '@/config';

const Draggable = defineAsyncComponent(() => import('vuedraggable'));

const toolStore = useToolStore();

useHead({ title: 'IT Tools - Handy online tools for developers' });
const { t } = useI18n();

const favoriteTools = computed(() => toolStore.favoriteTools);

// Update favorite tools order when drag is finished
function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value); // Update the store with the new order
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Bento Row -->
    <div v-if="config.showBanner" class="bento-hero-row">
      <ColoredCard :title="$t('home.follow.title')" :icon="IconHeart">
        {{ $t('home.follow.p1') }}
        <a
          href="https://github.com/CorentinTh/it-tools"
          rel="noopener"
          target="_blank"
          :aria-label="$t('home.follow.githubRepository')"
        >GitHub</a>
        {{ $t('home.follow.p2') }}
        <a
          href="https://x.com/ittoolsdottech"
          rel="noopener"
          target="_blank"
          :aria-label="$t('home.follow.twitterXAccount')"
        >X</a>.
        {{ $t('home.follow.thankYou') }}
        <IconHeart class="inline-block" style="color: var(--accent-cyan); vertical-align: middle;" />
      </ColoredCard>
    </div>

    <!-- Favorites -->
    <transition name="height">
      <div v-if="toolStore.favoriteTools.length > 0" class="section-block">
        <h3 class="section-title">
          <span class="section-title-text">{{ $t('home.categories.favoriteTools') }}</span>
          <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
            <IconDragDrop size="16" class="drag-icon" />
          </c-tooltip>
        </h3>
        <Draggable
          :list="favoriteTools"
          class="bento-grid"
          ghost-class="ghost-favorites-draggable"
          item-key="name"
          @end="onUpdateFavoriteTools"
        >
          <template #item="{ element: tool }">
            <ToolCard :tool="tool" />
          </template>
        </Draggable>
      </div>
    </transition>

    <!-- New Tools -->
    <div v-if="toolStore.newTools.length > 0" class="section-block">
      <h3 class="section-title">
        <span class="section-title-text">{{ t('home.categories.newestTools') }}</span>
      </h3>
      <div class="bento-grid">
        <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
      </div>
    </div>

    <!-- All Tools -->
    <div class="section-block">
      <h3 class="section-title">
        <span class="section-title-text">{{ $t('home.categories.allTools') }}</span>
      </h3>
      <div class="bento-grid">
        <ToolCard v-for="tool in toolStore.tools" :key="tool.name" :tool="tool" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-page {
  padding: 0;
}

/* ─── Bento Hero ─── */
.bento-hero-row {
  margin-bottom: 28px;
}

/* ─── Section ─── */
.section-block {
  margin-bottom: 28px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

.drag-icon {
  color: var(--text-muted);
  cursor: help;
}

/* ─── Bento Grid ─── */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

/* ─── Favorites drag transition ─── */
.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}

.ghost-favorites-draggable {
  opacity: 0.4;
  background-color: var(--bg-surface-2);
  border: 2px dashed var(--accent-cyan);
  border-radius: var(--radius-md, 16px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  animation: ghost-favorites-draggable-animation 0.2s ease-out;
}

@keyframes ghost-favorites-draggable-animation {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.0);
  }
}
</style>
