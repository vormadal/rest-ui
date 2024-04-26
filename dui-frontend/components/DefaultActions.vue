<template>
    <div>
        <v-btn v-for="action in actions" @click.prevent="action.run(context)">
            {{ action.label ?? 'Submit' }}
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import type { DuiActionContext } from '../dui-app/actions/DuiActionContext';
import type { DuiAction } from '../dui-app/actions/DuiAction';


const props = defineProps<{
    actions: DuiAction[]
    context: DuiActionContext
}>()
</script>