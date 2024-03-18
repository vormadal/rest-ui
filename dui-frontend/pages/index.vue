<template>
    <DashboardSelector :app="app" />
</template>
<script setup lang="ts">
import { DashboardSelector } from '../components/dui/DashboardSelector';
import { DuiApp } from '../dui-app/DuiApp';

const app = inject<DuiApp>('dui-app')!
</script>