<script setup lang="ts">
import { useDialog } from '@/composable/dialog';

const { dialogs, closeDialog } = useDialog();
</script>

<template>
  <Teleport to="body">
    <div v-for="d in dialogs" :key="d.id">
      <transition name="dialog">
        <div
          v-if="d.visible"
          class="dialog-overlay fixed inset-0 z-[9998] flex items-center justify-center px-4"
          style="background-color: rgba(0, 0, 0, 0.5);"
          @click.self="d.negativeText ? closeDialog(d.id, false) : undefined"
        >
          <div class="dialog-card w-full max-w-sm rounded-[var(--radius-md)] bg-[var(--bg-surface-1)] p-6 shadow-[var(--shadow-lg)]">
            <h3 v-if="d.title" class="mb-2 text-base font-medium text-[var(--text-primary)]">
              {{ d.title }}
            </h3>
            <p class="text-sm text-[var(--text-secondary)]">{{ d.content }}</p>
            <div class="mt-5 flex justify-end gap-2">
              <c-button v-if="d.negativeText" variant="basic" @click="closeDialog(d.id, false)">
                {{ d.negativeText }}
              </c-button>
              <c-button type="primary" @click="closeDialog(d.id, true)">
                {{ d.positiveText || 'OK' }}
              </c-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>