<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();
const router = useRouter();
const toolStore = useToolStore();

const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories',
  {},
  undefined,
  {
    deep: true,
    serializer: {
      read: v => (v ? JSON.parse(v) : null),
      write: v => JSON.stringify(v),
    },
  },
);

function toggleCategoryCollapse({ name }: { name: string }) {
  collapsedCategories.value[name] = !collapsedCategories.value[name];
}

function selectCategory(name: string) {
  toggleCategoryCollapse({ name });
  if (toolStore.selectedCategoryName === name) {
    toolStore.selectedCategoryName = null;
  } else {
    toolStore.selectedCategoryName = name;
    if (route.path !== '/') {
      router.push('/');
    }
  }
}
</script>

<template>
  <div class="cards-container">
    <div v-for="{ name, components } of toolsByCategory" :key="name" class="category-card">
      <!-- ─── Card header ─── -->
      <div
        class="category-header"
        :class="{ 'category-header--active': toolStore.selectedCategoryName === name }"
        @click="selectCategory(name)"
      >
        <span class="chevron" :class="{ collapsed: collapsedCategories[name] }">
          <icon-mdi-chevron-right />
        </span>
        <span class="category-name">{{ name }}</span>
      </div>

      <!-- ─── Card body ─── -->
      <transition name="collapse">
        <div v-if="!collapsedCategories[name]" class="card-body">
          <router-link
            v-for="tool in components"
            :key="tool.path"
            :to="tool.path"
            class="menu-item"
            :class="{ 'menu-item--active': route.path === tool.path }"
          >
            <MenuIconItem :tool="tool" class="menu-item-icon" />
            <span class="menu-item-label">{{ tool.name }}</span>
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cards-container {
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-sm);
}

/* ─── Category card ─── */
.category-card {
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  margin-bottom: 8px;
  overflow: hidden;
}

/* ─── Card header ─── */
.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px var(--space-md);
  cursor: pointer;
  user-select: none;
  transition: background var(--transition-fast);
  position: relative;

  &:hover {
    background: color-mix(in srgb, var(--accent-primary), transparent 94%);
  }

  &--active {
    background: color-mix(in srgb, var(--accent-primary), transparent 88%);

    .category-name {
      color: var(--accent-primary);
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background: var(--accent-primary);
      border-radius: 0 2px 2px 0;
    }
  }
}

.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  font-size: 12px;
  line-height: 1;
  color: var(--text-muted);
  transition: transform var(--transition-base);
  flex-shrink: 0;

  &:not(.collapsed) {
    transform: rotate(90deg);
  }

  &.collapsed {
    transform: rotate(0deg);
  }
}

.category-name {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
}

/* ─── Card body (tool items) ─── */
.card-body {
  display: flex;
  flex-direction: column;
  padding: 2px 0 6px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 6px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
  min-height: 32px;

  &:hover {
    background: color-mix(in srgb, var(--accent-primary), transparent 92%);
  }

  &--active {
    background: color-mix(in srgb, var(--accent-primary), transparent 88%);
    color: var(--accent-primary) !important;
    font-weight: 500;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 18px;
      background: var(--accent-primary);
      border-radius: 0 2px 2px 0;
    }
  }
}

.menu-item-icon {
  flex-shrink: 0;
}

.menu-item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ─── Collapse transition ─── */
.collapse-enter-active,
.collapse-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
  transform-origin: top;
}
</style>