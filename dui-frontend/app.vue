<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { createDuiApp } from './configurations/AppConfig';
import { OpenApiParser } from './generator/OpenApiParser';
import { StamdataDocument } from './samples/stamdata';
import { TestDocument1 } from './samples/test';
import { ApiMock } from './mocks/ApiMock'

const TestDocument = StamdataDocument

const parser = new OpenApiParser(TestDocument)
const mock = new ApiMock(TestDocument)
mock.createServerInstance({
  // baseUrl: "https://api2.ski.dk",
  // namespace: "stamdata/v1/"
})
const config = parser.parse();
console.log('config', config)
const app = createDuiApp(config);

provide('dui-config', config)
provide('dui-app', app)


</script>