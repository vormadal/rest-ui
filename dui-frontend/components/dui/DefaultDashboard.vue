<template>
    <v-card v-for="page of props.pages" :text="sanitizeString(page.route)">
        <v-card-actions>
            <NuxtLink :to="page.route">Show</NuxtLink>

        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import type { DuiPage } from '~/dui-app/DuiPage';

// TODO shortcut to create a record of each type

const props = defineProps<{
    pages: DuiPage<any>[]
}>()

</script>