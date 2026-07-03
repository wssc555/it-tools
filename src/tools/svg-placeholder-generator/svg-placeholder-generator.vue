<script setup lang="ts">
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { useCopy } from '@/composable/copy';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';
import { textToBase64 } from '@/utils/base64';

const width = ref(600);
const height = ref(350);
const fontSize = ref(26);
const bgColor = ref('#cccccc');
const fgColor = ref('#333333');
const useExactSize = ref(true);
const customText = ref('');
const svgString = computed(() => {
  const w = width.value;
  const h = height.value;
  const text = customText.value.length > 0 ? customText.value : `${w}x${h}`;
  const size = useExactSize.value ? ` width="${w}" height="${h}"` : '';

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${size}>
  <rect width="${w}" height="${h}" fill="${bgColor.value}"></rect>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="${fontSize.value}px" fill="${fgColor.value}">${text}</text>   
</svg>
  `.trim();
});
const base64 = computed(() => `data:image/svg+xml;base64,${textToBase64(svgString.value)}`);

const { copy: copySVG } = useCopy({ source: svgString });
const { copy: copyBase64 } = useCopy({ source: base64 });
const { download } = useDownloadFileFromBase64({ source: base64 });
</script>

<template>
  <div>
    <div>
      <div class="flex gap-3 mb-3">
        <div class="flex-1">
          <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Width (in px)</label>
          <input v-model.number="width" type="number" min="1" placeholder="SVG width..." class="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Background</label>
          <input type="color" v-model="bgColor" class="h-8 w-full cursor-pointer rounded border border-[var(--border-default)] bg-transparent p-0.5" />
        </div>
      </div>
      <div class="flex gap-3 mb-3">
        <div class="flex-1">
          <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Height (in px)</label>
          <input v-model.number="height" type="number" min="1" placeholder="SVG height..." class="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Text color</label>
          <input type="color" v-model="fgColor" class="h-8 w-full cursor-pointer rounded border border-[var(--border-default)] bg-transparent p-0.5" />
        </div>
      </div>
      <div class="flex gap-3 mb-3">
        <div class="flex-1">
          <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Font size</label>
          <input v-model.number="fontSize" type="number" min="1" placeholder="Font size..." class="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]" />
        </div>

        <c-input-text
          v-model:value="customText"
          label="Custom text"
          :placeholder="`Default is ${width}x${height}`"
          label-position="left"
          label-width="100px"
          label-align="right"
          flex-1
        />
      </div>
      <div class="flex items-center gap-3 mb-4">
        <label class="text-sm text-[var(--text-secondary)]">Use exact size</label>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="useExactSize" class="sr-only" />
          <span class="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200" :class="useExactSize ? 'bg-[var(--accent-cyan)]' : 'bg-[var(--border-default)]'" @click="useExactSize = !useExactSize">
            <span class="absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200" :class="useExactSize ? 'translate-x-4' : 'translate-x-0'" />
          </span>
        </label>
      </div>

    <div class="mb-2">
      <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">SVG HTML element</label>
      <TextareaCopyable :value="svgString" copy-placement="none" />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">SVG in Base64</label>
      <TextareaCopyable :value="base64" copy-placement="none" />
    </div>

    <div flex justify-center gap-3>
      <c-button @click="copySVG()">
        Copy svg
      </c-button>
      <c-button @click="copyBase64()">
        Copy base64
      </c-button>
      <c-button @click="download()">
        Download svg
      </c-button>
    </div>
  </div>

  <img :src="base64" alt="Image">
  </div>
</template>


