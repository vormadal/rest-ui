<template>
    <v-text-field :label="field.displayName" :name="field.name" :model-value="data || value"
        @update:modelValue="onChange" />
</template>

<script setup lang="ts">
import type { DuiActionContext } from '../../dui-app/actions/DuiActionContext';
import type { DuiField } from '../../dui-app/DuiField';
import type { DuiLookupField } from '../../dui-app/DuiLookupField';


const props = defineProps<{
    field: DuiLookupField<any>
    value?: string
    context: DuiActionContext,
    handleChange: (field: DuiField, value: string) => Promise<void>
}>()

const data = ref<any>()

onActivated(() => {
    console.log('active lookup data', props.field)
    props.field.dataSource?.run(props.context)
        .then(res => {
            console.log('active lookup data', res)
            data.value = res[props.field.labelField]
        })
})
console.log('lookup data', props.field)
props.field.dataSource?.run(props.context)
    .then(res => {
        console.log('lookup data', res)
        data.value = res[props.field.labelField]
    })
// watch(props.context, (test, test1) => {
//     console.log('lookup field', test, test1)

// })
// onMounted(() => {


// })
function onChange(value: string) {
    props.handleChange(props.field, value)
}
</script>