<script setup lang="ts">
import { formatXml, isValidXML } from './xml-formatter.service';
import type { UseValidationRule } from '@/composable/validation';

const defaultValue = '<hello><world>foo</world><world>bar</world></hello>';
const indentSize = useStorage('xml-formatter:indent-size', 2);
const collapseContent = useStorage('xml-formatter:collapse-content', true);

function transformer(value: string) {
  return formatXml(value, {
    indentation: ' '.repeat(indentSize.value),
    collapseContent: collapseContent.value,
    lineSeparator: '\n',
  });
}

const rules: UseValidationRule<string>[] = [
  {
    validator: isValidXML,
    message: 'Provided XML is not valid.',
  },
];
</script>

<template>
  <div flex-full shrink-0 grow-0>
    <div flex justify-center items-center gap-6>
      <label class="flex items-center gap-2 cursor-pointer select-none">
        <span class="text-sm">Collapse content:</span>
        <input type="checkbox" v-model="collapseContent" class="sr-only" />
        <span
          class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
          :class="collapseContent ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'"
          @click="collapseContent = !collapseContent"
        >
          <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="collapseContent ? 'translate-x-4' : 'translate-x-0'" />
        </span>
      </label>
      <label class="flex items-center gap-2 text-sm">
        <span>Indent size:</span>
        <input
          v-model.number="indentSize"
          type="number"
          min="0"
          max="10"
          class="w-20 rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]"
        />
      </label>
    </div>
  </div>

  <format-transformer
    input-label="Your XML"
    input-placeholder="Paste your XML here..."
    output-label="Formatted XML from your XML"
    output-language="xml"
    :input-validation-rules="rules"
    :transformer="transformer"
    :input-default="defaultValue"
  />
</template>
