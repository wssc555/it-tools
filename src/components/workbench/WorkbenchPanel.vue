<script setup lang="ts">
/**
 * WorkbenchPanel — Reusable input/output panel for the unified tool workbench.
 *
 * Slots:
 *   - default: main content (textarea, code, etc.)
 *   - actions: action buttons row (e.g. Copy, Clear)
 *   - header-extra: extra elements to the right of the label
 */
withDefaults(
  defineProps<{
    label?: string
    type?: 'input' | 'output' | 'utility'
    mono?: boolean
  }>(),
  { label: '', type: 'input', mono: false },
);
</script>

<template>
  <div class="workbench-panel" :class="[`panel-${type}`, { mono }]">
    <div v-if="label || $slots.actions || $slots['header-extra']" class="panel-header">
      <div class="panel-header-left">
        <span v-if="label" class="panel-label">{{ label }}</span>
        <slot name="header-extra" />
      </div>
      <div class="panel-header-right">
        <slot name="actions" />
      </div>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.workbench-panel {
  border-radius: var(--radius-lg, 24px);
  border: 1px solid var(--border-subtle);
  background: var(--surface-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);

  &:focus-within {
    border-color: var(--border-cyan);
    box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.1);
  }

  &.panel-output {
    background: var(--surface-output, var(--surface-card));
  }

  &.panel-utility {
    background: var(--bg-surface-1);
    border-style: dashed;
  }

  &.mono {
    font-family: var(--font-mono);
  }
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-subtle);
  min-height: 44px;
}

.panel-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.panel-header-right {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.panel-label {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

.panel-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>