<template>
    <v-text-field type="date" :label="field.displayName" :name="field.name" :model-value="formatInputDate(value)"
        @update:modelValue="onChange" />
    <!-- <v-date-picker :label="field.displayName" :name="field.name" :value="value" @update:modelValue="onChange" /> -->
</template>

<script setup lang="ts">
import { formatInputDate } from '~/utils/dateUtils';
import type { DuiField } from '../../dui-app/DuiField';


const props = defineProps<{
    field: DuiField
    value?: Date
    handleChange: (field: DuiField, value: Date) => Promise<void>
}>()

function onChange(value: Date) {
    console.log('date changed', value, new Date(value))
    props.handleChange(props.field, new Date(value))
}
</script>