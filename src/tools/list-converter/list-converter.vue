<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { convert } from './list-converter.models';
import type { ConvertOptions } from './list-converter.types';

const sortOrderOptions = [
  { label: 'Sort ascending', value: 'asc', disabled: false },
  { label: 'Sort descending', value: 'desc', disabled: false },
];

const conversionConfig = useStorage<ConvertOptions>('list-converter:conversionConfig', {
  lowerCase: false,
  trimItems: true,
  removeDuplicates: true,
  keepLineBreaks: false,
  itemPrefix: '',
  itemSuffix: '',
  listPrefix: '',
  listSuffix: '',
  reverseList: false,
  sortList: null,
  separator: ', ',
});

function transformer(value: string) {
  return convert(value, conversionConfig.value);
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card>
        <div class="flex gap-4">
          <div class="flex flex-col gap-3">
            <label class="flex cursor-pointer items-center gap-2">
              <input
                v-model="conversionConfig.trimItems"
                type="checkbox"
                class="h-5 w-5 accent-[var(--accent-primary)]"
              />
              <span class="text-sm text-[var(--text-secondary)]">Trim list items</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <input
                v-model="conversionConfig.removeDuplicates"
                type="checkbox"
                data-test-id="removeDuplicates"
                class="h-5 w-5 accent-[var(--accent-primary)]"
              />
              <span class="text-sm text-[var(--text-secondary)]">Remove duplicates</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <input
                v-model="conversionConfig.lowerCase"
                type="checkbox"
                class="h-5 w-5 accent-[var(--accent-primary)]"
              />
              <span class="text-sm text-[var(--text-secondary)]">Convert to lowercase</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <input
                v-model="conversionConfig.keepLineBreaks"
                type="checkbox"
                class="h-5 w-5 accent-[var(--accent-primary)]"
              />
              <span class="text-sm text-[var(--text-secondary)]">Keep line breaks</span>
            </label>
          </div>
          <div class="flex min-w-0 flex-1 flex-col gap-3">
            <c-select
              v-model:value="conversionConfig.sortList"
              label="Sort list"
              label-position="left"
              label-width="120px"
              label-align="right"
              :options="sortOrderOptions"
              :disabled="conversionConfig.reverseList"
              data-test-id="sortList"
              placeholder="Sort alphabetically"
            />

            <c-input-text
              v-model:value="conversionConfig.separator"
              label="Separator"
              label-position="left"
              label-width="120px"
              label-align="right"
              placeholder=","
            />

            <div class="flex items-center gap-1">
              <label class="w-[120px] shrink-0 pr-3 text-right text-sm text-[var(--text-secondary)]">Wrap item:</label>
              <c-input-text
                v-model:value="conversionConfig.itemPrefix"
                placeholder="Item prefix"
                test-id="itemPrefix"
              />
              <c-input-text
                v-model:value="conversionConfig.itemSuffix"
                placeholder="Item suffix"
                test-id="itemSuffix"
              />
            </div>
            <div class="flex items-center gap-1">
              <label class="w-[120px] shrink-0 pr-3 text-right text-sm text-[var(--text-secondary)]">Wrap list:</label>
              <c-input-text
                v-model:value="conversionConfig.listPrefix"
                placeholder="List prefix"
                test-id="listPrefix"
              />
              <c-input-text
                v-model:value="conversionConfig.listSuffix"
                placeholder="List suffix"
                test-id="listSuffix"
              />
            </div>
          </div>
        </div>
      </c-card>
    </div>
  </div>
  <format-transformer
    input-label="Your input data"
    input-placeholder="Paste your input data here..."
    output-label="Your transformed data"
    :transformer="transformer"
  />
</template>