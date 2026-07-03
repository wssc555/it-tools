<script setup lang="ts">
import { types as extensionToMimeType, extensions as mimeTypeToExtension } from 'mime-types';

const mimeInfos = Object.entries(mimeTypeToExtension).map(([mimeType, extensions]) => ({ mimeType, extensions }));

const mimeToExtensionsOptions = Object.keys(mimeTypeToExtension).map(label => ({ label, value: label }));
const selectedMimeType = ref(undefined);

const extensionsFound = computed(() => (selectedMimeType.value ? mimeTypeToExtension[selectedMimeType.value] : []));

const extensionToMimeTypeOptions = Object.keys(extensionToMimeType).map((label) => {
  const extension = `.${label}`;

  return { label: extension, value: label };
});
const selectedExtension = ref(undefined);

const mimeTypeFound = computed(() => (selectedExtension.value ? extensionToMimeType[selectedExtension.value] : []));
</script>

<template>
  <c-card>
    <h2 class="text-lg font-semibold mb-0" style="margin-bottom: 0">
      Mime type to extension
    </h2>
    <div style="opacity: 0.8">
      Know which file extensions are associated to a mime-type
    </div>
    <c-select
      v-model:value="selectedMimeType"
      searchable
      my-4
      :options="mimeToExtensionsOptions"
      placeholder="Select your mimetype here... (ex: application/pdf)"
    />

    <div v-if="extensionsFound.length > 0">
      Extensions of files with the <span class="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-0.5 text-sm font-medium">{{ selectedMimeType }}</span> mime-type:
      <div style="margin-top: 10px">
        <span
          v-for="extension of extensionsFound"
          :key="extension"
          class="inline-flex items-center rounded-full bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] px-2.5 py-0.5 text-sm font-medium mr-2"
        >
          .{{ extension }}
        </span>
      </div>
    </div>
  </c-card>

  <c-card>
    <h2 class="text-lg font-semibold mb-0" style="margin-bottom: 0">
      File extension to mime type
    </h2>
    <div style="opacity: 0.8">
      Know which mime type is associated to a file extension
    </div>
    <c-select
      v-model:value="selectedExtension"
      searchable
      my-4
      :options="extensionToMimeTypeOptions"
      placeholder="Select your mimetype here... (ex: application/pdf)"
    />

    <div v-if="selectedExtension">
      Mime type associated to the extension <span class="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-0.5 text-sm font-medium">{{ selectedExtension }}</span> file
      extension:
      <div style="margin-top: 10px">
        <span class="inline-flex items-center rounded-full bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] px-2.5 py-0.5 text-sm font-medium mr-2">{{ mimeTypeFound }}</span>
      </div>
    </div>
  </c-card>

  <div>
    <table class="w-full border-collapse rounded-[var(--radius-sm)] overflow-hidden">
      <thead>
        <tr class="bg-[var(--bg-surface)]">
          <th class="border border-[var(--border-subtle)] px-3 py-2 text-left text-sm font-semibold">Mime types</th>
          <th class="border border-[var(--border-subtle)] px-3 py-2 text-left text-sm font-semibold">Extensions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ mimeType, extensions } of mimeInfos" :key="mimeType" class="border-b border-[var(--border-subtle)]">
          <td class="px-3 py-2 text-sm">{{ mimeType }}</td>
          <td class="px-3 py-2 text-sm">
            <span v-for="extension of extensions" :key="extension" class="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-0.5 text-xs font-medium mr-2 mb-1">
              .{{ extension }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
