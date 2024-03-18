<template>
    <PageSelector :app="app" :route="$route.path" />
</template>

<script setup lang="ts">
import { PageSelector } from '~/components/dui/PageSelector';
import type { DuiApp } from '~/dui-app/DuiApp';
const app = inject<DuiApp>("dui-app")!

</script>