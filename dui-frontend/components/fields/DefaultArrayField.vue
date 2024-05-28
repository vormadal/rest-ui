<template>
    <v-card :title="field.displayName">
        <div style="max-height: 500px; overflow: auto; max-width: 100%;">
            <DefaultTable :context="context" :data="field.getInputValue(data)" :fields="field.fields" />
        </div>
    </v-card>
</template>

<script setup lang="ts">
import type { DuiActionContext } from '../../dui-app/actions/DuiActionContext';
import type { DuiObjectField } from '../../dui-app/DuiObjectField';


const props = defineProps<{
    field: DuiObjectField<any>
    context: DuiActionContext
    data?: object
}>()

</script>