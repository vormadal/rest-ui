<template>
    <v-form @submit.prevent="handleSubmit">
        <DuiFieldSelector v-for="field in fields" :context="context" :field="field" :data="data"
            :handleChange="onChange" />
        <v-btn type="submit" :loading="disabled">Create</v-btn>
    </v-form>
</template>

<script setup lang="ts">
import type { DuiField } from '~/dui-app/DuiField';
import type { DuiActionContext } from '../dui-app/actions/DuiActionContext';

const props = defineProps<{
    fetch: () => Promise<any[]>,
    context: DuiActionContext,
    fields: DuiField[]
    submitData: (data: any) => Promise<void>
}>()

const disabled = ref(false)

const data = ref<any>(props.fields.reduce((formData, field) => {
    //TODO set default values

    return formData
}, {}))

async function handleSubmit() {
    console.log('submitting')
    disabled.value = true
    await props.submitData(data.value)
    disabled.value = false
}

function onChange(field: DuiField, value: any) {
    if (!data.value) data.value = {}
    data.value[field.name] = value
    console.log('updating value', field.name, value, data.value)
}

</script>