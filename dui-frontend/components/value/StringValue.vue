<template>
    string value:
    {{ config?.valueFormatters.string.format(props.value, options) }}
</template>

<script setup lang="ts">
import type { DuiConfig } from '../../dui-app/config/DuiConfig';



const config = inject<DuiConfig>('dui-config')
const props = defineProps<{
    value: string,
    options: StringValueOptions
}>()
</script>