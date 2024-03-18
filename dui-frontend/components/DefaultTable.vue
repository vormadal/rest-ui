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
                    <FieldSelector :app="app" :page="page" :data="row" :field="field" />
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import type { DuiField } from '~/dui-app/DuiField';
import { DuiApp } from '../dui-app/DuiApp';
import FieldSelector from './dui/FieldSelector';
import type { DuiPage } from '~/dui-app/DuiPage';

const props = defineProps<{ fetch: () => Promise<any[]>, fields: DuiField[], page: DuiPage }>()
const data = ref<any[]>([])
const app = inject<DuiApp>('dui-app')!

onMounted(() => {
    props.fetch().then(res => data.value = res)
})

</script>