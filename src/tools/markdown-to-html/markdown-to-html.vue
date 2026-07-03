<script setup lang="ts">
import markdownit from 'markdown-it';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const inputMarkdown = ref('');
const outputHtml = computed(() => {
  const md = markdownit();
  return md.render(inputMarkdown.value);
});

function printHtml() {
  const w = window.open();
  if (w === null) {
    return;
  }
  w.document.body.innerHTML = outputHtml.value;
  w.print();
}
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputMarkdown"
      multiline raw-text
      placeholder="Your Markdown content..."
      rows="8"
      autofocus
      label="Your Markdown to convert:"
    />

    <hr class="my-4 border-t border-[var(--border-subtle)]" />

    <div class="mb-4">
      <label class="mb-1 block text-sm text-[var(--text-secondary)]">Output HTML:</label>
      <TextareaCopyable :value="outputHtml" :word-wrap="true" language="html" />
    </div>

    <div class="flex justify-center">
      <c-button @click="printHtml">Print as PDF</c-button>
    </div>
  </div>
</template>