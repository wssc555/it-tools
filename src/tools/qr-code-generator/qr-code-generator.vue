<script setup lang="ts">
import type { QRCodeErrorCorrectionLevel } from 'qrcode';
import { useQRCode } from './useQRCode';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';

const foreground = ref('#000000ff');
const background = ref('#ffffffff');
const errorCorrectionLevel = ref<QRCodeErrorCorrectionLevel>('medium');

const errorCorrectionLevels = ['low', 'medium', 'quartile', 'high'];

const text = ref('https://it-tools.tech');
const { qrcode } = useQRCode({
  text,
  color: {
    background,
    foreground,
  },
  errorCorrectionLevel,
  options: { width: 1024 },
});

const { download } = useDownloadFileFromBase64({ source: qrcode, filename: 'qr-code.png' });
</script>

<template>
  <c-card>
    <div class="grid gap-3 grid-cols-1" style="@media (min-width: 600px) { grid-template-columns: 2fr 1fr; }">
      <div>
        <c-input-text
          v-model:value="text"
          label-position="left"
          label-width="130px"
          label-align="right"
          label="Text:"
          multiline
          rows="1"
          autosize
          placeholder="Your link or text..."
          mb-6
        />
        <div class="flex items-center gap-4" style="padding-left: 130px">
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <span>Foreground color:</span>
            <input type="color" v-model="foreground" class="h-8 w-8 cursor-pointer rounded border border-[var(--border-default)] bg-transparent p-0.5" />
          </label>
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <span>Background color:</span>
            <input type="color" v-model="background" class="h-8 w-8 cursor-pointer rounded border border-[var(--border-default)] bg-transparent p-0.5" />
          </label>
        </div>
        <c-select
          v-model:value="errorCorrectionLevel"
          label="Error resistance:"
          label-position="left"
          label-width="130px"
          label-align="right"
          :options="errorCorrectionLevels.map((value) => ({ label: value, value }))"
        />
      </div>
      <div>
        <div flex flex-col items-center gap-3>
          <img :src="qrcode" width="200" alt="QR Code" />
          <c-button @click="download">
            Download qr-code
          </c-button>
        </div>
      </div>
    </div>
  </c-card>
</template>
