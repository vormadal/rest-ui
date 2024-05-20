<template>
    <v-table>
        <thead>
            <tr>
                <td v-for="field in props.fields">
                <th class="text-left">
                    {{ field.displayName || field.name }}
                </th>
                </td>
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
import FieldSelector from './dui/FieldSelector';
import type { DuiActionContext } from '~/dui-app/actions/DuiActionContext';

const props = defineProps<{
    fields: DuiField[]
    context: DuiActionContext
    data: any[]
}>()
</script>