<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
const theme = useThemeVars();
</script>

<template>
  <router-link :to="tool.path" class="tool-card-link">
    <div class="tool-card">
      <div class="tool-card-top">
        <n-icon class="tool-icon" size="36" :component="tool.icon" />
        <div class="tool-card-meta">
          <FavoriteButton :tool="tool" />
          <div
            v-if="tool.isNew"
            class="new-badge"
            :style="{ 'background-color': theme.primaryColor }"
          >
            {{ $t('toolCard.new') }}
          </div>
        </div>
      </div>
      <div class="tool-card-body">
        <div class="tool-name">{{ tool.name }}</div>
        <div class="tool-desc">{{ tool.description }}</div>
      </div>
    </div>
  </router-link>
</template>

<style lang="less" scoped>
.tool-card-link {
  text-decoration: none;
  display: block;
}

.tool-card {
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md, 16px);
  padding: 16px;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    border-color: rgba(34, 211, 238, 0.25);
    box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.08);
  }
}

.tool-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.tool-icon {
  color: var(--text-muted);
  opacity: 0.7;
}

.tool-card-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.new-badge {
  border-radius: 100px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #fff;
  line-height: 1.4;
}

.tool-card-body {
  flex: 1;
}

.tool-name {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
