<script setup lang="ts">
const props = withDefaults(defineProps<{ tooltip?: string; position?: 'top' | 'bottom' | 'left' | 'right' }>(), {
  tooltip: undefined,
  position: 'top',
});
const { tooltip, position } = toRefs(props);

const targetRef = ref();
const isTargetHovered = useElementHover(targetRef);
</script>

<template>
  <div class="relative inline-block">
    <div ref="targetRef">
      <slot />
    </div>

    <div
      v-if="tooltip || $slots.tooltip"
      class="pointer-events-none absolute z-10 whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] px-3 py-1.5 text-sm text-[var(--text-primary)] shadow-[var(--shadow-md)] transition-all duration-200"
      :class="{
        'scale-0 opacity-0': !isTargetHovered,
        'scale-100 opacity-100': isTargetHovered,
        'bottom-full left-1/2 -translate-x-1/2 mb-1': position === 'top',
        'top-full left-1/2 -translate-x-1/2 mt-1': position === 'bottom',
        'right-full top-1/2 -translate-y-1/2 mr-1': position === 'left',
        'left-full top-1/2 -translate-y-1/2 ml-1': position === 'right',
      }"
    >
      <slot v-if="isTargetHovered" name="tooltip">
        {{ tooltip }}
      </slot>
    </div>
  </div>
</template>