<script lang="ts" setup>
const props = withDefaults(defineProps<{ type?: 'warning' | 'error' | 'info' | 'success'; title?: string }>(), { type: 'warning', title: undefined });
const { type, title } = toRefs(props);
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-[var(--radius-sm)] px-5 py-4"
    :class="{
      'c-alert--warning': type === 'warning',
      'c-alert--error': type === 'error',
      'c-alert--info': type === 'info',
      'c-alert--success': type === 'success',
    }"
  >
    <div class="text-[40px] opacity-60 shrink-0 leading-none">
      <slot name="icon">
        <span v-if="type === 'warning'">⚠</span>
        <span v-else-if="type === 'error'">✕</span>
        <span v-else-if="type === 'info'">ℹ</span>
        <span v-else-if="type === 'success'">✓</span>
      </slot>
    </div>

    <div class="min-w-0 flex-1">
      <div v-if="title" class="mb-1 text-[15px] font-semibold">
        {{ title }}
      </div>
      <div class="text-sm leading-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.c-alert--warning {
  background: color-mix(in srgb, var(--state-warning), transparent 88%);
  color: var(--state-warning);
}

.c-alert--error {
  background: color-mix(in srgb, var(--state-danger), transparent 88%);
  color: var(--state-danger);
}

.c-alert--info {
  background: color-mix(in srgb, var(--state-info), transparent 88%);
  color: var(--state-info);
}

.c-alert--success {
  background: color-mix(in srgb, var(--state-success), transparent 88%);
  color: var(--state-success);
}
</style>