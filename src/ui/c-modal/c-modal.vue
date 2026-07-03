<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{ open?: boolean; centered?: boolean }>(), {
  open: false,
  centered: true,
});

const emit = defineEmits(['update:open']);

const isOpen = useVModel(props, 'open', emit, { passive: true });

const { centered } = toRefs(props);

function close() { isOpen.value = false; }
function open() { isOpen.value = true; }
function toggle() { isOpen.value = !isOpen.value; }

defineExpose({ close, open, toggle, isOpen });

const modal = ref();

onClickOutside(modal, () => {
  if (isOpen.value) close();
});
</script>

<template>
  <transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex justify-center px-2"
      :class="{ 'items-center': centered }"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div
        ref="modal"
        v-bind="$attrs"
        class="w-full max-w-xl rounded-[var(--radius-md)] bg-[var(--bg-surface-1)] p-6 shadow-[var(--shadow-lg)]"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>