<script setup lang="ts">
import { IconTrash, IconPlus } from '@tabler/icons-vue';
import { useTemplateRefsList, useVModel } from '@vueuse/core';
import { nextTick } from 'vue';

const props = defineProps<{ values: (number | null)[] }>();

const emit = defineEmits(['update:values']);

const inputRefs = useTemplateRefsList<HTMLInputElement>();

const values = useVModel(props, 'values', emit);

async function addValue() {
  values.value.push(null);
  await nextTick();
  inputRefs.value.at(-1)?.focus();
}

function onInputEnter(index: number) {
  if (index === values.value.length - 1) {
    addValue();
    return;
  }

  inputRefs.value.at(index + 1)?.focus();
}
</script>

<template>
  <div>
    <div v-for="(value, index) of values" :key="index" class="mb-2 flex flex-nowrap gap-2">
      <input
        :ref="inputRefs.set"
        :value="values[index]"
        type="number"
        class="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-input)] px-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)] focus:shadow-[0_0_0_2px_var(--accent-primary-glow)]"
        placeholder="Set your measure..."
        autofocus
        @input="values[index] = ($event.target as HTMLInputElement).valueAsNumber"
        @keydown.enter="onInputEnter(index)"
      />
      <c-tooltip tooltip="Delete this value">
        <c-button circle variant="text" @click="values.splice(index, 1)">
          <IconTrash size="18" class="opacity-30" />
        </c-button>
      </c-tooltip>
    </div>

    <c-button @click="addValue">
      <IconPlus size="18" class="mr-2 opacity-30" />
      Add a measure
    </c-button>
  </div>
</template>