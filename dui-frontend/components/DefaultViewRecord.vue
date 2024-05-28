<template>
    <div>
        <v-table>
            <tbody v-if="data">
                <tr v-for="field in props.fields.filter(x => x.type !== DataType.ARRAY)">
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
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" v-for="field in props.fields.filter(x => x.type === DataType.ARRAY)">
                    <DefaultArrayField :context="context" :data="data" :field="(field as any)" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import type { DuiField } from '~/dui-app/DuiField';
import type { DuiActionContext } from '../dui-app/actions/DuiActionContext';
import FieldSelector from './dui/FieldSelector';
import { DataType } from '../configurations/DataType';
import DefaultArrayField from './fields/DefaultArrayField.vue';

const props = defineProps<{
    context: DuiActionContext,
    fields: DuiField[],
    data: any
}>()

</script>