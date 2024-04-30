<template>
    <v-text-field :label="field.displayName" :name="field.name" :model-value="value" @update:modelValue="onChange" />
</template>

<script setup lang="ts">
import type { DuiField } from '../../dui-app/DuiField';


const props = defineProps<{
    field: DuiField
    value?: string
    handleChange: (field: DuiField, value: string) => Promise<void>
}>()

function onChange(value: string) {
    props.handleChange(props.field, value)
}
</script>