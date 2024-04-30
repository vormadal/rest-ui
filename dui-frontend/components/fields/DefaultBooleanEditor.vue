<template>
    <v-checkbox type="number" :label="field.displayName" :name="field.name" :model-value="value"
        @update:modelValue="onChange" />
</template>

<script setup lang="ts">
import type { DuiField } from '../../dui-app/DuiField';


const props = defineProps<{
    field: DuiField
    value?: boolean
    handleChange: (field: DuiField, value: boolean) => Promise<void>
}>()

function onChange(value: boolean) {
    props.handleChange(props.field, value)
}
</script>