<script setup lang="ts">
import { escape, unescape } from 'lodash';

import { useCopy } from '@/composable/copy';

const escapeInput = ref('<title>IT Tool</title>');
const escapeOutput = computed(() => escape(escapeInput.value));
const { copy: copyEscaped } = useCopy({ source: escapeOutput });

const unescapeInput = ref('&lt;title&gt;IT Tool&lt;/title&gt;');
const unescapeOutput = computed(() => unescape(unescapeInput.value));
const { copy: copyUnescaped } = useCopy({ source: unescapeOutput });
</script>

<template>
  <c-card title="Escape html entities">
    <div class="mb-4">
      <label class="mb-1 block text-sm text-[var(--text-secondary)]">Your string:</label>
      <c-input-text
        v-model:value="escapeInput"
        multiline
        placeholder="The string to escape"
        rows="3"
        autosize
        raw-text
      />
    </div>

    <div class="mb-4">
      <label class="mb-1 block text-sm text-[var(--text-secondary)]">Your string escaped:</label>
      <c-input-text
        multiline
        readonly
        placeholder="Your string escaped"
        :value="escapeOutput"
        rows="3"
        autosize
      />
    </div>

    <div class="flex justify-center">
      <c-button @click="copyEscaped()">Copy</c-button>
    </div>
  </c-card>
  <c-card title="Unescape html entities">
    <div class="mb-4">
      <label class="mb-1 block text-sm text-[var(--text-secondary)]">Your escaped string:</label>
      <c-input-text
        v-model:value="unescapeInput"
        multiline
        placeholder="The string to unescape"
        rows="3"
        autosize
        raw-text
      />
    </div>

    <div class="mb-4">
      <label class="mb-1 block text-sm text-[var(--text-secondary)]">Your string unescaped:</label>
      <c-input-text
        :value="unescapeOutput"
        multiline
        readonly
        placeholder="Your string unescaped"
        rows="3"
        autosize
      />
    </div>

    <div class="flex justify-center">
      <c-button @click="copyUnescaped()">Copy</c-button>
    </div>
  </c-card>
</template>