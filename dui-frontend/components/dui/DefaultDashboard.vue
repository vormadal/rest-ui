<template>
    <v-card v-for="page of props.pages" :text="page.route">
        <v-card-actions>
            <NuxtLink :to="page.route">Show</NuxtLink>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import type { DuiPage } from '~/dui-app/DuiPage';


const props = defineProps<{
    pages: DuiPage[]
}>()

</script>