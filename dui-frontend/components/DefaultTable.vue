<template>
    <v-table>
        <thead>
            <tr>
                <th v-for="field in props.fields" class="text-left">
                    {{ field.displayName || field.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data">
                <td v-for="field in props.fields">
                    <FieldSelector :context="context" :data="row" :field="field" />
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import type { DuiField } from '~/dui-app/DuiField';
import type { DuiActionContext } from '../dui-app/actions/DuiActionContext';
import FieldSelector from './dui/FieldSelector';

const props = defineProps<{ fetch: () => Promise<any[]>, fields: DuiField[], context: DuiActionContext }>()
const data = ref<any[]>([])

onMounted(() => {
    props.fetch().then(res => data.value = res)
})

</script>