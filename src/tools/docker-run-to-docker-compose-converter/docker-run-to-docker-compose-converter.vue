<script setup lang="ts">
import { MessageType, composerize } from 'composerize-ts';
import { withDefaultOnError } from '@/utils/defaults';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';
import { textToBase64 } from '@/utils/base64';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const dockerRun = ref(
  'docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx',
);

const conversionResult = computed(() =>
  withDefaultOnError(() => composerize(dockerRun.value.trim()), { yaml: '', messages: [] }),
);
const dockerCompose = computed(() => conversionResult.value.yaml);
const notImplemented = computed(() =>
  conversionResult.value.messages.filter(msg => msg.type === MessageType.notImplemented).map(msg => msg.value),
);
const notComposable = computed(() =>
  conversionResult.value.messages.filter(msg => msg.type === MessageType.notTranslatable).map(msg => msg.value),
);
const errors = computed(() =>
  conversionResult.value.messages
    .filter(msg => msg.type === MessageType.errorDuringConversion)
    .map(msg => msg.value),
);
const dockerComposeBase64 = computed(() => `data:application/yaml;base64,${textToBase64(dockerCompose.value)}`);
const { download } = useDownloadFileFromBase64({ source: dockerComposeBase64, filename: 'docker-compose.yml' });
</script>

<template>
  <div>
    <c-input-text
      v-model:value="dockerRun"
      label="Your docker run command:"
      style="font-family: monospace"
      multiline
      raw-text
      monospace
      placeholder="Your docker run command to convert..."
      rows="3"
    />

    <hr class="my-4 border-0 h-px bg-[var(--border-subtle)]" />

    <TextareaCopyable :value="dockerCompose" language="yaml" />

    <div mt-5 flex justify-center>
      <c-button :disabled="dockerCompose === ''" secondary @click="download">
        Download docker-compose.yml
      </c-button>
    </div>

    <div v-if="notComposable.length > 0">
      <c-alert type="info" title="This options are not translatable to docker-compose" class="mt-5">
        <ul>
          <li v-for="(message, index) of notComposable" :key="index">
            {{ message }}
          </li>
        </ul>
      </c-alert>
    </div>

    <div v-if="notImplemented.length > 0">
      <c-alert
        type="warning"
        title="This options are not yet implemented and therefore haven't been translated to docker-compose"
        class="mt-5"
      >
        <ul>
          <li v-for="(message, index) of notImplemented" :key="index">
            {{ message }}
          </li>
        </ul>
      </c-alert>
    </div>

    <div v-if="errors.length > 0">
      <c-alert type="error" title="The following errors occured" class="mt-5">
        <ul>
          <li v-for="(message, index) of errors" :key="index">
            {{ message }}
          </li>
        </ul>
      </c-alert>
    </div>
  </div>
</template>
