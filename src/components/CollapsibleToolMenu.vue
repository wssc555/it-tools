<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();

const makeLabel = (tool: Tool) => () => h(RouterLink, { to: tool.path }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

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

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name],
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
    })),
  })),
);

const themeVars = useThemeVars();
</script>

<template>
  <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name" class="category-group">
    <div
      class="category-header"
      @click="toggleCategoryCollapse({ name })"
    >
      <span class="chevron" :class="{ collapsed: isCollapsed }">
        <icon-mdi-chevron-right />
      </span>
      <span class="category-name">{{ name }}</span>
    </div>

    <n-collapse-transition :show="!isCollapsed">
      <div class="menu-wrapper">
        <div class="menu-accent-bar" @click="toggleCategoryCollapse({ name })" />
        <n-menu
          class="menu"
          :value="route.path"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="tools"
          :indent="8"
          :default-expand-all="true"
        />
      </div>
    </n-collapse-transition>
  </div>
</template>

<style scoped lang="less">
.category-group {
  margin-top: 2px;
}

.category-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px 4px 16px;
  user-select: none;

  .chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    font-size: 14px;
    line-height: 1;
    color: var(--text-muted);
    transition: transform var(--transition-fast);
    flex-shrink: 0;

    &.collapsed {
      transform: rotate(0deg);
    }

    &:not(.collapsed) {
      transform: rotate(90deg);
    }
  }

  .category-name {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    font-family: var(--font-heading);
  }
}

.menu-wrapper {
  display: flex;
  flex-direction: row;

  .menu {
    flex: 1;
    margin-bottom: 4px;

    ::v-deep(.n-menu-item-content) {
      height: 30px;
      padding: 0 12px;
      border-radius: 6px;
      margin: 0 8px;
      font-size: 13px;
      transition: background var(--transition-fast);
    }

    ::v-deep(.n-menu-item-content::before) {
      left: 0;
      right: 0;
    }

    ::v-deep(.n-menu-item-content--selected) {
      background: rgba(34, 211, 238, 0.08);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 18px;
        background: var(--accent-cyan);
        border-radius: 0 2px 2px 0;
      }
    }

    ::v-deep(.n-menu-item-content--selected .n-menu-item-content-header) {
      color: var(--accent-cyan) !important;
    }

    ::v-deep(.n-menu-item-content:hover) {
      background: rgba(255, 255, 255, 0.04);
    }
  }

  .menu-accent-bar {
    width: 20px;
    opacity: 0.08;
    transition: opacity var(--transition-base);
    position: relative;
    cursor: pointer;
    flex-shrink: 0;

    &::before {
      width: 2px;
      height: 100%;
      content: '';
      background: var(--accent-cyan);
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 12px;
    }

    &:hover {
      opacity: 0.25;
    }
  }
}

::v-deep(.n-menu-item-content--selected .n-menu-item-content-header) {
  font-weight: 500;
}
</style>
