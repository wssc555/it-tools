<script setup lang="ts">
import { useEventListener } from '@vueuse/core';

import InputCopyable from '../../components/InputCopyable.vue';

const event = ref<KeyboardEvent>();

useEventListener(document, 'keydown', (e) => {
  event.value = e;
});

const fields = computed(() => {
  if (!event.value) {
    return [];
  }

  return [
    { label: 'Key :', value: event.value.key, placeholder: 'Key name...' },
    { label: 'Keycode :', value: String(event.value.keyCode), placeholder: 'Keycode...' },
    { label: 'Code :', value: event.value.code, placeholder: 'Code...' },
    { label: 'Location :', value: String(event.value.location), placeholder: 'Code...' },
    {
      label: 'Modifiers :',
      value: [event.value.metaKey && 'Meta', event.value.shiftKey && 'Shift', event.value.ctrlKey && 'Ctrl', event.value.altKey && 'Alt']
        .filter(Boolean)
        .join(' + '),
      placeholder: 'None',
    },
  ];
});
</script>

<template>
  <div>
    <c-card class="mb-5 text-center !py-12">
      <div v-if="event" class="mb-2 text-3xl text-[var(--text-primary)]">
        {{ event.key }}
      </div>
      <span class="leading-snug opacity-70 text-[var(--text-muted)]">
        Press the key on your keyboard you want to get info about this key
      </span>
    </c-card>

    <div v-for="({ label, value, placeholder }, i) of fields" :key="i" class="mb-1 flex items-center gap-2">
      <div class="shrink-0 text-sm font-medium text-[var(--text-secondary)]" style="flex: 0 0 150px;">
        {{ label }}
      </div>
      <InputCopyable :value="value" readonly :placeholder="placeholder" class="min-w-0 flex-1" />
    </div>
  </div>
</template>