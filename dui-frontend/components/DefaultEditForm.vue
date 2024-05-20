<template>
    <v-form :if="!!data" @submit.prevent="handleSubmit">
        <DuiFieldSelector v-for="field in fields" :context="context" :field="field" :data="data"
            :handleChange="onChange" />
        <v-btn type="submit" :loading="disabled">Save</v-btn>
    </v-form>
</template>

<script setup lang="ts">
import type { DuiField } from '~/dui-app/DuiField';
import type { DuiActionContext } from '../dui-app/actions/DuiActionContext';

const props = defineProps<{
    fetchData: () => Promise<any>,
    context: DuiActionContext,
    fields: DuiField[],
    submitData: (data: any) => Promise<void>,
    data: any
}>()

const disabled = ref(false)

const formData = ref(props.data)

async function handleSubmit() {
    console.log('submitting')
    disabled.value = true
    await props.submitData(formData)
    disabled.value = false
}

function onChange(field: DuiField, value: any) {
    if (!formData.value) formData.value = {}
    formData.value[field.name] = value
    console.log('updating value', field.name, value, formData.value)
}

</script>