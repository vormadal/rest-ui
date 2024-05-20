<template>
    <v-table>
        <tbody v-if="data">
            <tr v-for="field in props.fields">
                <td>
                <th>
                    {{ field.displayName }}
                </th>
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

const props = defineProps<{
    context: DuiActionContext,
    fields: DuiField[],
    data: any
}>()

</script>