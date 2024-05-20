<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="4" v-for="page of props.pages">
                <v-card :title="sanitizeString(page.route)" link :to="page.route">
                    <v-card-text>
                        <!-- description                -->
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import type { DuiPage } from '~/dui-app/DuiPage';

// TODO shortcut to create a record of each type

const props = defineProps<{
    pages: DuiPage<any>[]
}>()

</script>