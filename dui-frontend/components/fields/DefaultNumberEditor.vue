<template>
    <v-text-field type="number" :label="field.displayName" :name="field.name" :model-value="value"
        @update:modelValue="onChange" />
</template>

<script setup lang="ts">
import type { DuiField } from '../../dui-app/DuiField';


const props = defineProps<{
    field: DuiField
    value?: number
    
    handleChange: (field: DuiField, value: number) => Promise<void>
}>()

function onChange(value: string) {
    const num = Number.parseFloat(value)
    props.handleChange(props.field, num)
}
</script>