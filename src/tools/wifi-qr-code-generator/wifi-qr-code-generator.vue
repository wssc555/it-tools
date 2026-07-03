<script setup lang="ts">
import {
  EAPMethods,
  EAPPhase2Methods,
  useWifiQRCode,
} from './useQRCode';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';

const foreground = ref('#000000ff');
const background = ref('#ffffffff');

const ssid = ref();
const password = ref();
const eapMethod = ref();
const isHiddenSSID = ref(false);
const eapAnonymous = ref(false);
const eapIdentity = ref();
const eapPhase2Method = ref();

const { qrcode, encryption } = useWifiQRCode({
  ssid,
  password,
  eapMethod,
  isHiddenSSID,
  eapAnonymous,
  eapIdentity,
  eapPhase2Method,
  color: {
    background,
    foreground,
  },
  options: { width: 1024 },
});

const { download } = useDownloadFileFromBase64({ source: qrcode, filename: 'qr-code.png' });
</script>

<template>
  <c-card>
    <div grid grid-cols-1 gap-12>
      <div>
        <c-select
          v-model:value="encryption"
          mb-4
          label="Encryption method"
          default-value="WPA"
          label-position="left"
          label-width="130px"
          label-align="right"
          :options="[
            {
              label: 'No password',
              value: 'nopass',
            },
            {
              label: 'WPA/WPA2',
              value: 'WPA',
            },
            {
              label: 'WEP',
              value: 'WEP',
            },
            {
              label: 'WPA2-EAP',
              value: 'WPA2-EAP',
            },
          ]"
        />
        <div class="mb-6 flex flex-row items-center gap-2">
          <c-input-text
            v-model:value="ssid"
            label-position="left"
            label-width="130px"
            label-align="right"
            label="SSID:"
            rows="1"
            autosize
            placeholder="Your WiFi SSID..."
            mb-6
          />
          <label class="flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap">
            <input type="checkbox" v-model="isHiddenSSID" class="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" />
            <span class="text-sm">Hidden SSID</span>
          </label>
        </div>
        <c-input-text
          v-if="encryption !== 'nopass'"
          v-model:value="password"
          label-position="left"
          label-width="130px"
          label-align="right"
          label="Password:"
          rows="1"
          autosize
          type="password"
          placeholder="Your WiFi Password..."
          mb-6
        />
        <c-select
          v-if="encryption === 'WPA2-EAP'"
          v-model:value="eapMethod"
          label="EAP method"
          label-position="left"
          label-width="130px"
          label-align="right"
          :options="EAPMethods.map((method) => ({ label: method, value: method }))"
          searchable mb-4
        />
        <div v-if="encryption === 'WPA2-EAP'" class="mb-6 flex flex-row items-center gap-2">
          <c-input-text
            v-model:value="eapIdentity"
            label-position="left"
            label-width="130px"
            label-align="right"
            label="Identity:"
            rows="1"
            autosize
            placeholder="Your EAP Identity..."
            mb-6
          />
          <label class="flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap">
            <input type="checkbox" v-model="eapAnonymous" class="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" />
            <span class="text-sm">Anonymous?</span>
          </label>
        </div>
        <c-select
          v-if="encryption === 'WPA2-EAP'"
          v-model:value="eapPhase2Method"
          label="EAP Phase 2 method"
          label-position="left"
          label-width="130px"
          label-align="right"
          :options="EAPPhase2Methods.map((method) => ({ label: method, value: method }))"
          searchable mb-4
        />
        <div class="flex items-center gap-4 mt-4" style="padding-left: 130px">
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <span>Foreground color:</span>
            <input type="color" v-model="foreground" class="h-8 w-8 cursor-pointer rounded border border-[var(--border-default)] bg-transparent p-0.5" />
          </label>
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <span>Background color:</span>
            <input type="color" v-model="background" class="h-8 w-8 cursor-pointer rounded border border-[var(--border-default)] bg-transparent p-0.5" />
          </label>
        </div>
      </div>
      <div v-if="qrcode">
        <div flex flex-col items-center gap-3>
          <img alt="wifi-qrcode" :src="qrcode" width="200">
          <c-button @click="download">
            Download qr-code
          </c-button>
        </div>
      </div>
    </div>
  </c-card>
</template>
