<template>
    <v-table>
        <thead>
            <tr>
                <th>
                    Field
                </th>
                <th>
                    Value
                </th>
            </tr>
        </thead>
        <tbody v-if="data">
            <tr v-for="field in props.fields">
                <td>
                    {{ field.displayName }}
                </td>
                <td>
                    <FieldSelector :context="context" :data="data" :field="field" />
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import type { DuiField } from '~/dui-app/DuiField';
import type { DuiActionContext } from '../dui-app/actions/DuiActionContext';
import FieldSelector from './dui/FieldSelector';

const props = defineProps<{ fetch: () => Promise<any[]>, context: DuiActionContext, fields: DuiField[] }>()
const data = ref<any>()

onMounted(() => {
    props.fetch().then(res => data.value = res)
})

</script>