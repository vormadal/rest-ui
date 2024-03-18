<template>
    string value:
    {{ config?.valueFormatters.string.format(props.value, options) }}
</template>

<script setup lang="ts">
import type { DuiConfig } from '~/configurations/AppConfig';


const config = inject<DuiConfig>('dui-config')
const props = defineProps<{
    value: string,
    options: StringValueOptions
}>()
</script>