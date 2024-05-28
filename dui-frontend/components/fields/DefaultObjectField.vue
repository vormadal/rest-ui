<template>
    <v-card :title="field.displayName">
        <c-card-content>
            <DefaultViewRecord :fields="field.fields" :context="context" :data="field.getInputValue(data)" />
            <!-- <DuiFieldSelector v-for="f in field.fields" :context="context" :field="f" :data="field.getInputValue(data)"
                :handleChange="onChange" /> -->
        </c-card-content>
    </v-card>
</template>

<script setup lang="ts">
import type { DuiActionContext } from '../../dui-app/actions/DuiActionContext';
import type { DuiField } from '../../dui-app/DuiField';
import type { DuiObjectField } from '../../dui-app/DuiObjectField';


const props = defineProps<{
    field: DuiObjectField<any>
    context: DuiActionContext,
    onChange: (field: DuiField, value: any) => void | undefined
    data?: object
}>()

onMounted(() => {
    console.log('object field', props.field.name, props.data)
})

</script>