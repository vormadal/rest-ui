<template>
    <v-form :if="!!data" @submit.prevent="handleSubmit">
        <DuiFieldSelector v-for="field in fields" :app="app" :page="page" :field="field" :data="data"
            :handleChange="onChange" />
        <v-btn type="submit" :loading="disabled">Save</v-btn>
    </v-form>
</template>

<script setup lang="ts">
import type { DuiField } from '~/dui-app/DuiField';
import { DuiApp } from '../dui-app/DuiApp';
import type { DuiPage } from '~/dui-app/DuiPage';

const props = defineProps<{
    fetch: () => Promise<any>,
    page: DuiPage,
    fields: DuiField[],
    submit: (data: any) => Promise<void>,
}>()
const data = ref<any>()
const app = inject<DuiApp>('dui-app')!

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