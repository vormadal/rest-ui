<template>
    <div>
        <v-btn v-for="action in actions" @click.prevent="action.run(context)">
            {{ action.label }}
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import type { DuiActionContext } from '../dui-app/actions/DuiActionContext';
import type { ButtonAction } from '../dui-app/actions/DuiButtonAction';


const props = defineProps<{
    actions: ButtonAction[]
    context: DuiActionContext
}>()
</script>