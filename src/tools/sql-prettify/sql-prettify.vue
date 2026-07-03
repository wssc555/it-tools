<script setup lang="ts">
import { type FormatOptionsWithLanguage, format as formatSQL } from 'sql-formatter';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { useStyleStore } from '@/stores/style.store';

const inputElement = ref<HTMLElement>();
const styleStore = useStyleStore();
const config = reactive<FormatOptionsWithLanguage>({
  keywordCase: 'upper',
  useTabs: false,
  language: 'sql',
  indentStyle: 'standard',
  tabulateAlias: true,
});

const rawSQL = ref('select field1,field2,field3 from my_table where my_condition;');
const prettySQL = computed(() => formatSQL(rawSQL.value, config));
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="max-width: 600px" :class="{ 'flex-col': styleStore.isSmallScreen }" class="mx-auto mb-5 flex gap-2">
      <c-select
        v-model:value="config.language"
        class="flex-1"
        label="Dialect"
        :options="[
          { label: 'GCP BigQuery', value: 'bigquery' },
          { label: 'IBM DB2', value: 'db2' },
          { label: 'Apache Hive', value: 'hive' },
          { label: 'MariaDB', value: 'mariadb' },
          { label: 'MySQL', value: 'mysql' },
          { label: 'Couchbase N1QL', value: 'n1ql' },
          { label: 'Oracle PL/SQL', value: 'plsql' },
          { label: 'PostgreSQL', value: 'postgresql' },
          { label: 'Amazon Redshift', value: 'redshift' },
          { label: 'Spark', value: 'spark' },
          { label: 'Standard SQL', value: 'sql' },
          { label: 'sqlite', value: 'sqlite' },
          { label: 'SQL Server Transact-SQL', value: 'tsql' },
        ]"
      />
      <c-select
        v-model:value="config.keywordCase" label="Keyword case"
        class="flex-1"
        :options="[
          { label: 'UPPERCASE', value: 'upper' },
          { label: 'lowercase', value: 'lower' },
          { label: 'Preserve', value: 'preserve' },
        ]"
      />
      <c-select
        v-model:value="config.indentStyle" label="Indent style"
        class="flex-1"
        :options="[
          { label: 'Standard', value: 'standard' },
          { label: 'Tabular left', value: 'tabularLeft' },
          { label: 'Tabular right', value: 'tabularRight' },
        ]"
      />
    </div>
  </div>

  <div class="mb-4">
    <label class="mb-1 block text-sm text-[var(--text-secondary)]">Your SQL query:</label>
    <c-input-text
      ref="inputElement"
      v-model:value="rawSQL"
      placeholder="Put your SQL query here..."
      rows="20"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </div>
  <div>
    <label class="mb-1 block text-sm text-[var(--text-secondary)]">Prettify version of your query:</label>
    <TextareaCopyable :value="prettySQL" language="sql" :follow-height-of="inputElement" />
  </div>
</template>