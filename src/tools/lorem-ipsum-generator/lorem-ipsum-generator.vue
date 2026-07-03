<script setup lang="ts">
import { generateLoremIpsum } from './lorem-ipsum-generator.service';
import { useCopy } from '@/composable/copy';
import { randIntFromInterval } from '@/utils/random';
import { computedRefreshable } from '@/composable/computedRefreshable';

const paragraphs = ref(1);
const sentences = ref([3, 8]);
const words = ref([8, 15]);
const startWithLoremIpsum = ref(true);
const asHTML = ref(false);

const [loremIpsumText, refreshLoremIpsum] = computedRefreshable(() =>
  generateLoremIpsum({
    paragraphCount: paragraphs.value,
    asHTML: asHTML.value,
    sentencePerParagraph: randIntFromInterval(sentences.value[0], sentences.value[1]),
    wordCount: randIntFromInterval(words.value[0], words.value[1]),
    startWithLoremIpsum: startWithLoremIpsum.value,
  }),
);

const { copy } = useCopy({ source: loremIpsumText, text: 'Lorem ipsum copied to the clipboard' });
</script>

<template>
  <c-card>
    <div class="flex items-center justify-between gap-4 mb-2">
      <label class="text-sm text-[var(--text-secondary)] shrink-0 w-[200px]">Paragraphs</label>
      <div class="flex items-center gap-3 flex-1">
        <input type="range" v-model.number="paragraphs" :step="1" :min="1" :max="20" class="flex-1 accent-[var(--accent-cyan)]" />
        <span class="text-sm font-mono w-8 text-right">{{ paragraphs }}</span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4 mb-2">
      <label class="text-sm text-[var(--text-secondary)] shrink-0 w-[200px]">Sentences per paragraph</label>
      <div class="flex items-center gap-3 flex-1">
        <input type="range" v-model.number="sentences[0]" :step="1" :min="1" :max="sentences[1]" class="flex-1 accent-[var(--accent-cyan)]" />
        <input type="range" v-model.number="sentences[1]" :step="1" :min="sentences[0]" :max="50" class="flex-1 accent-[var(--accent-cyan)]" />
        <span class="text-sm font-mono w-16 text-right">{{ sentences[0] }}–{{ sentences[1] }}</span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4 mb-2">
      <label class="text-sm text-[var(--text-secondary)] shrink-0 w-[200px]">Words per sentence</label>
      <div class="flex items-center gap-3 flex-1">
        <input type="range" v-model.number="words[0]" :step="1" :min="1" :max="words[1]" class="flex-1 accent-[var(--accent-cyan)]" />
        <input type="range" v-model.number="words[1]" :step="1" :min="words[0]" :max="50" class="flex-1 accent-[var(--accent-cyan)]" />
        <span class="text-sm font-mono w-16 text-right">{{ words[0] }}–{{ words[1] }}</span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4 mb-2">
      <label class="text-sm text-[var(--text-secondary)] shrink-0 w-[200px]">Start with lorem ipsum ?</label>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="startWithLoremIpsum" class="sr-only" />
        <span class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200" :class="startWithLoremIpsum ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'" @click="startWithLoremIpsum = !startWithLoremIpsum">
          <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="startWithLoremIpsum ? 'translate-x-4' : 'translate-x-0'" />
        </span>
      </label>
    </div>
    <div class="flex items-center justify-between gap-4 mb-4">
      <label class="text-sm text-[var(--text-secondary)] shrink-0 w-[200px]">As html ?</label>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="asHTML" class="sr-only" />
        <span class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200" :class="asHTML ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'" @click="asHTML = !asHTML">
          <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="asHTML ? 'translate-x-4' : 'translate-x-0'" />
        </span>
      </label>
    </div>

    <c-input-text :value="loremIpsumText" multiline placeholder="Your lorem ipsum..." readonly mt-5 rows="5" />

    <div mt-5 flex justify-center gap-3>
      <c-button autofocus @click="copy()">
        Copy
      </c-button>
      <c-button @click="refreshLoremIpsum">
        Refresh
      </c-button>
    </div>
  </c-card>
</template>
