<script setup lang="ts">
import { generateMeta } from '@it-tools/oggen';
import _ from 'lodash';
import { image, ogSchemas, twitter, website } from './og-schemas';
import type { OGSchemaType, OGSchemaTypeElementSelect } from './OGSchemaType.type';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

// Since type guards do not work in template

const metadata = ref<{ type: string; [k: string]: any }>({
  'type': 'website',
  'twitter:card': 'summary_large_image',
});

watch(
  () => ref(metadata.value.type),
  (_ignored, prevSection) => {
    const section = ogSchemas[prevSection.value];

    if (!section) {
      return;
    }

    section.elements.forEach(({ key }) => {
      metadata.value[key] = '';
    });
  },
);

const sections = computed(() => {
  const secs: OGSchemaType[] = [website, image, twitter];
  const additionalSchema = ogSchemas[metadata.value.type];

  if (additionalSchema) {
    secs.push(additionalSchema);
  }

  return secs;
});

const metaTags = computed(() => {
  const twitterMeta = _.chain(metadata.value)
    .pickBy((_value, k) => k.startsWith('twitter:'))
    .mapKeys((_value, k) => k.replace(/^twitter:/, ''))
    .value();

  const otherMeta = _.pickBy(metadata.value, (_value, k) => !k.startsWith('twitter:'));

  return generateMeta({ ...otherMeta, twitter: twitterMeta }, { generateTwitterCompatibleMeta: true });
});
</script>

<template>
  <div>
    <div v-for="{ name, elements } of sections" :key="name" style="margin-bottom: 15px">
      <div mb-5px>
        {{ name }}
      </div>

      <div v-for="{ key, type, label, placeholder, ...element } of elements" :key="key" class="flex items-stretch mb-1">
        <span class="flex items-center justify-end shrink-0 px-3 py-2 text-sm bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-l-[var(--radius-sm)] text-[var(--text-secondary)] min-w-[110px]" style="flex: 0 0 110px">
          {{ label }}
        </span>

        <c-input-text
          v-if="type === 'input'"
          v-model:value="metadata[key]"
          :placeholder="placeholder"
          clearable
          class="flex-1"
        />

        <div v-else-if="type === 'input-multiple'" class="flex-1">
          <div v-for="(item, idx) in metadata[key]" :key="idx" class="flex items-center gap-1 mb-1">
            <c-input-text v-model:value="metadata[key][idx]" :placeholder="placeholder" raw-text class="flex-1" />
            <button
              v-if="idx > 0"
              class="flex items-center justify-center w-7 h-7 rounded text-[var(--text-muted)] hover:text-[var(--state-danger)] hover:bg-[var(--state-danger)]/10 transition-colors"
              @click="metadata[key].splice(idx, 1)"
              title="Remove"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <button
              class="flex items-center justify-center w-7 h-7 rounded text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
              @click="metadata[key].push('')"
              title="Add"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </button>
          </div>
        </div>

        <c-select
          v-else-if="type === 'select'"
          v-model:value="metadata[key]"
          class="flex-1"
          :placeholder="placeholder"
          :options="(element as OGSchemaTypeElementSelect).options"
        />
      </div>
    </div>
  </div>
  <div>
    <div>
    <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Your meta tags</label>
    <TextareaCopyable :value="metaTags" language="html" />
  </div>
  </div>
</template>


