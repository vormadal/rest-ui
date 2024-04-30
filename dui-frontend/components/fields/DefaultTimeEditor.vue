<template>
    <v-text-field type="time" :label="field.displayName" :name="field.name" :model-value="formatInputTime(value)"
        @update:modelValue="onChange" />
    <!-- <v-date-picker :label="field.displayName" :name="field.name" :value="value" @update:modelValue="onChange" /> -->
</template>

<script setup lang="ts">
import { formatInputTime, parseTime, time2Minutes, time2Seconds } from '~/utils/dateUtils';
import type { DuiField } from '../../dui-app/DuiField';


const props = defineProps<{
    field: DuiField
    value?: Date
    handleChange: (field: DuiField, value: Date) => Promise<void>
}>()

function onChange(value: string) {
    const date = parseTime(value)
    console.log('time changed', value, time2Minutes(date), time2Seconds(date))
    props.handleChange(props.field, date)
}
</script>