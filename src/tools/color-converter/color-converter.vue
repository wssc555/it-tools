<script setup lang="ts">
import type { Colord } from 'colord';
import { colord, extend } from 'colord';
import _ from 'lodash';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import namesPlugin from 'colord/plugins/names';
import lchPlugin from 'colord/plugins/lch';
import { buildColorFormat } from './color-converter.models';

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin]);

const formats = {
  picker: buildColorFormat({
    label: 'color picker',
    format: (v: Colord) => v.toHex(),
    type: 'color-picker',
  }),
  hex: buildColorFormat({
    label: 'hex',
    format: (v: Colord) => v.toHex(),
    placeholder: 'e.g. #ff0000',
  }),
  rgb: buildColorFormat({
    label: 'rgb',
    format: (v: Colord) => v.toRgbString(),
    placeholder: 'e.g. rgb(255, 0, 0)',
  }),
  hsl: buildColorFormat({
    label: 'hsl',
    format: (v: Colord) => v.toHslString(),
    placeholder: 'e.g. hsl(0, 100%, 50%)',
  }),
  hwb: buildColorFormat({
    label: 'hwb',
    format: (v: Colord) => v.toHwbString(),
    placeholder: 'e.g. hwb(0, 0%, 0%)',
  }),
  lch: buildColorFormat({
    label: 'lch',
    format: (v: Colord) => v.toLchString(),
    placeholder: 'e.g. lch(53.24, 104.55, 40.85)',
  }),
  cmyk: buildColorFormat({
    label: 'cmyk',
    format: (v: Colord) => v.toCmykString(),
    placeholder: 'e.g. cmyk(0, 100%, 100%, 0)',
  }),
  name: buildColorFormat({
    label: 'name',
    format: (v: Colord) => v.toName({ closest: true }) ?? 'Unknown',
    placeholder: 'e.g. red',
  }),
};

updateColorValue(colord('#1ea54c'));

function updateColorValue(value: Colord | undefined, omitLabel?: string) {
  if (value === undefined) {
    return;
  }

  if (!value.isValid()) {
    return;
  }

  _.forEach(formats, ({ value: valueRef, format }, key) => {
    if (key !== omitLabel) {
      valueRef.value = format(value);
    }
  });
}
</script>

<template>
  <c-card>
    <template v-for="({ label, parse, placeholder, validation, type }, key) in formats" :key="key">
      <input-copyable
        v-if="type === 'text'"
        v-model:value="formats[key].value.value"
        :test-id="`input-${key}`"
        :label="`${label}:`"
        label-position="left"
        label-width="100px"
        label-align="right"
        :placeholder="placeholder"
        :validation="validation"
        raw-text
        clearable
        mt-2
        @update:value="(v:string) => updateColorValue(parse(v), key)"
      />

      <div v-else-if="type === 'color-picker'" class="flex items-center gap-2 mt-2" style="padding-left: 100px">
        <input
          type="color"
          :value="formats[key].value.value"
          class="h-9 w-9 cursor-pointer rounded border border-[var(--border-default)] bg-transparent p-0.5"
          @input="(e: Event) => updateColorValue(parse((e.target as HTMLInputElement).value), key)"
        />
        <span class="text-sm text-[var(--text-secondary)]">{{ label }}:</span>
      </div>
    </template>
  </c-card>
</template>
