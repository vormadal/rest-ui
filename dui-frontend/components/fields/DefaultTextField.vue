<template>
    <span>{{ field.format(data) }}</span>
</template>

<script setup lang="ts">
import type { DuiField } from '../../dui-app/DuiField';


defineProps<{
    field: DuiField
    data?: any
}>()

</script>