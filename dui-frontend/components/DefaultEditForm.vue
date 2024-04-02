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
    fetch: () => Promise<any>,
    context: DuiActionContext,
    fields: DuiField[],
    submit: (data: any) => Promise<void>,
}>()
const data = ref<any>()

const disabled = ref(false)

async function handleSubmit() {
    console.log('submitting')
    disabled.value = true
    await props.submit(data.value)
    disabled.value = false
}

function onChange(field: DuiField, value: any) {
    if (!data.value) data.value = {}
    data.value[field.name] = value
    console.log('updating value', field.name, value, data.value)
}

onMounted(() => {
    props.fetch().then(res => {
        data.value = res
        console.log('fetched data', res)
    })
})

</script>