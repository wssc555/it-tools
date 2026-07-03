<script setup lang="ts">
import yaml from 'yaml';
import { useStorage } from '@vueuse/core';
import { formatYaml } from './yaml-models';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const inputElement = ref<HTMLElement>();

const rawYaml = useStorage('yaml-prettify:raw-yaml', '');
const indentSize = useStorage('yaml-prettify:indent-size', 2);
const sortKeys = useStorage('yaml-prettify:sort-keys', false);

const cleanYaml = computed(() => withDefaultOnError(() => formatYaml({ rawYaml, indentSize, sortKeys }), ''));

const rawYamlValidation = useValidation({
  source: rawYaml,
  rules: [
    {
      validator: v => v === '' || yaml.parse(v),
      message: 'Provided YAML is not valid.',
    },
  ],
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px" flex justify-center items-center gap-6>
      <label class="flex items-center gap-2 cursor-pointer select-none">
        <span class="text-sm">Sort keys:</span>
        <input type="checkbox" v-model="sortKeys" class="sr-only" />
        <span
          class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
          :class="sortKeys ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'"
          @click="sortKeys = !sortKeys"
        >
          <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="sortKeys ? 'translate-x-4' : 'translate-x-0'" />
        </span>
      </label>
      <label class="flex items-center gap-2 text-sm">
        <span>Indent size:</span>
        <input
          v-model.number="indentSize"
          type="number"
          min="1"
          max="10"
          class="w-20 rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]"
        />
      </label>
    </div>
  </div>

  <div class="mb-4">
    <div class="flex items-center gap-2 mb-1">
      <label class="text-sm font-medium text-[var(--text-secondary)]">Your raw YAML</label>
      <span v-if="rawYamlValidation.message" class="text-xs" :class="rawYamlValidation.status === 'error' ? 'text-[var(--state-danger)]' : 'text-[var(--text-muted)]'">{{ rawYamlValidation.message }}</span>
    </div>
    <c-input-text
      ref="inputElement"
      v-model:value="rawYaml"
      placeholder="Paste your raw YAML here..."
      rows="20"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </div>
  <div class="mb-4">
    <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Prettified version of your YAML</label>
    <TextareaCopyable :value="cleanYaml" language="yaml" :follow-height-of="inputElement" />
  </div>
</template>

<style lang="less" scoped>
.result-card {
  position: relative;
  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
