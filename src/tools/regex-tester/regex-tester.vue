<script setup lang="ts">
import RandExp from 'randexp';
import { render } from '@regexper/render';
import type { ShadowRootExpose } from 'vue-shadow-dom';
import { matchRegex } from './regex-tester.service';
import { useValidation } from '@/composable/validation';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const regex = useQueryParamOrStorage({ name: 'regex', storageName: 'regex-tester:regex', defaultValue: '' });
const text = ref('');
const global = ref(true);
const ignoreCase = ref(false);
const multiline = ref(false);
const dotAll = ref(true);
const unicode = ref(true);
const unicodeSets = ref(false);
const visualizerSVG = ref<ShadowRootExpose>();

const regexValidation = useValidation({
  source: regex,
  rules: [
    {
      message: 'Invalid regex: {0}',
      validator: value => new RegExp(value),
      getErrorMessage: (value) => {
        const _ = new RegExp(value);
        return '';
      },
    },
  ],
});
const results = computed(() => {
  let flags = 'd';
  if (global.value) {
    flags += 'g';
  }
  if (ignoreCase.value) {
    flags += 'i';
  }
  if (multiline.value) {
    flags += 'm';
  }
  if (dotAll.value) {
    flags += 's';
  }
  if (unicode.value) {
    flags += 'u';
  }
  else if (unicodeSets.value) {
    flags += 'v';
  }

  try {
    return matchRegex(regex.value, text.value, flags);
  }
  catch (_) {
    return [];
  }
});

const sample = computed(() => {
  try {
    const randexp = new RandExp(new RegExp(regex.value.replace(/\(\?\<[^\>]*\>/g, '(?:')));
    return randexp.gen();
  }
  catch (_) {
    return '';
  }
});

watchEffect(
  async () => {
    const regexValue = regex.value;
    // shadow root is required:
    // @regexper/render append a <defs><style> that broke svg transparency of icons in the whole site
    const visualizer = visualizerSVG.value?.shadow_root;
    if (visualizer) {
      while (visualizer.lastChild) {
        visualizer.removeChild(visualizer.lastChild);
      }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      try {
        await render(regexValue, svg);
      }
      catch (_) {
      }
      visualizer.appendChild(svg);
    }
  },
);
</script>

<template>
  <div max-w-600px>
    <c-card title="Regex" mb-1>
      <c-input-text
        v-model:value="regex"
        label="Regex to test:"
        placeholder="Put the regex to test"
        multiline
        rows="3"
        :validation="regexValidation"
      />
      <router-link target="_blank" to="/regex-memo" mb-1 mt-1>
        See Regular Expression Cheatsheet
      </router-link>
      <div class="flex flex-wrap gap-x-4 gap-y-2">
        <label class="flex items-center gap-1.5 cursor-pointer select-none">
          <input type="checkbox" v-model="global" class="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" />
          <span class="text-sm"><span title="Global search">Global search. (<code>g</code>)</span></span>
        </label>
        <label class="flex items-center gap-1.5 cursor-pointer select-none">
          <input type="checkbox" v-model="ignoreCase" class="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" />
          <span class="text-sm"><span title="Case-insensitive search">Case-insensitive search. (<code>i</code>)</span></span>
        </label>
        <label class="flex items-center gap-1.5 cursor-pointer select-none">
          <input type="checkbox" v-model="multiline" class="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" />
          <span class="text-sm"><span title="Allows ^ and $ to match next to newline characters.">Multiline(<code>m</code>)</span></span>
        </label>
        <label class="flex items-center gap-1.5 cursor-pointer select-none">
          <input type="checkbox" v-model="dotAll" class="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" />
          <span class="text-sm"><span title="Allows . to match newline characters.">Singleline(<code>s</code>)</span></span>
        </label>
        <label class="flex items-center gap-1.5 cursor-pointer select-none">
          <input type="checkbox" v-model="unicode" class="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" />
          <span class="text-sm"><span title="Unicode; treat a pattern as a sequence of Unicode code points.">Unicode(<code>u</code>)</span></span>
        </label>
        <label class="flex items-center gap-1.5 cursor-pointer select-none">
          <input type="checkbox" v-model="unicodeSets" class="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" />
          <span class="text-sm"><span title="An upgrade to the u mode with more Unicode features.">Unicode Sets (<code>v</code>)</span></span>
        </label>
      </div>

      <hr class="my-3 border-0 h-px bg-[var(--border-subtle)]" />

      <c-input-text
        v-model:value="text"
        label="Text to match:"
        placeholder="Put the text to match"
        multiline
        rows="5"
      />
    </c-card>

    <c-card title="Matches" mb-1 mt-3>
      <table v-if="results?.length > 0" class="w-full border-collapse rounded-[var(--radius-sm)] overflow-hidden">
        <thead>
          <tr class="bg-[var(--bg-surface)]">
            <th scope="col" class="border border-[var(--border-subtle)] px-3 py-2 text-left text-sm font-semibold">Index in text</th>
            <th scope="col" class="border border-[var(--border-subtle)] px-3 py-2 text-left text-sm font-semibold">Value</th>
            <th scope="col" class="border border-[var(--border-subtle)] px-3 py-2 text-left text-sm font-semibold">Captures</th>
            <th scope="col" class="border border-[var(--border-subtle)] px-3 py-2 text-left text-sm font-semibold">Groups</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match of results" :key="match.index" class="border-b border-[var(--border-subtle)]">
            <td class="px-3 py-2 text-sm">{{ match.index }}</td>
            <td class="px-3 py-2 text-sm">{{ match.value }}</td>
            <td class="px-3 py-2 text-sm">
              <ul>
                <li v-for="capture in match.captures" :key="capture.name">
                  "{{ capture.name }}" = {{ capture.value }} [{{ capture.start }} - {{ capture.end }}]
                </li>
              </ul>
            </td>
            <td class="px-3 py-2 text-sm">
              <ul>
                <li v-for="group in match.groups" :key="group.name">
                  "{{ group.name }}" = {{ group.value }} [{{ group.start }} - {{ group.end }}]
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <c-alert v-else>
        No match
      </c-alert>
    </c-card>

    <c-card title="Sample matching text" mt-3>
      <pre style="white-space: pre-wrap; word-break: break-all;">{{ sample }}</pre>
    </c-card>

    <c-card title="Regex Diagram" style="overflow-x: scroll;" mt-3>
      <shadow-root ref="visualizerSVG">
&#xa0;
      </shadow-root>
    </c-card>
  </div>
</template>
