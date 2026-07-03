<script setup lang="ts">
import { decodeSafeLinksURL } from './safelink-decoder.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const inputSafeLinkUrl = ref('');
const outputDecodedUrl = computed(() => {
  try {
    return decodeSafeLinksURL(inputSafeLinkUrl.value);
  }
  catch (e: any) {
    return e.toString();
  }
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputSafeLinkUrl"
      raw-text
      placeholder="Your input Outlook SafeLink Url..."
      autofocus
      label="Your input Outlook SafeLink Url:"
    />

    <hr class="my-4 border-t border-[var(--border-subtle)]" />

    <div class="mb-4">
      <label class="mb-1 block text-sm text-[var(--text-secondary)]">Output decoded URL:</label>
      <TextareaCopyable :value="outputDecodedUrl" :word-wrap="true" />
    </div>
  </div>
</template>