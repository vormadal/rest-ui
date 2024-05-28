<template>
    <div>
        <VueJsonView :src="config.pages" name="Config"/>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import VueJsonView from "@matpool/vue-json-view"


const config = inject('dui-config')
</script>