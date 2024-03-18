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
        <tbody>
            <tr v-for="field in props.fields">
                <td>
                    {{ field.displayName }}
                </td>
                <td>
                    <DuiFieldSelector :app="app" :page="page" :data="data || {}" :field="field" />
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import type { DuiField } from '~/dui-app/DuiField';
import { DuiApp } from '../dui-app/DuiApp';
import type { DuiPage } from '~/dui-app/DuiPage';

const props = defineProps<{ fetch: () => Promise<any[]>, page: DuiPage, fields: DuiField[] }>()
const data = ref<any>()
const app = inject<DuiApp>('dui-app')!

onMounted(() => {
    props.fetch().then(res => data.value = res)
})

</script>