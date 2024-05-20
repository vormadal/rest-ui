<template>
    <div>
        <NuxtLink v-if="field.redirectAction" :to="field.redirectAction.getLink(context)">{{ data }}</NuxtLink>
        <span v-else>{{ data }}</span>
    </div>
</template>

<script setup lang="ts">
import type { DuiActionContext } from '../../dui-app/actions/DuiActionContext';
import type { DuiLookupField } from '../../dui-app/DuiLookupField';


const props = defineProps<{
    field: DuiLookupField<any>
    context: DuiActionContext
}>()

const data = ref<any>()

props.field.dataSource?.run(props.context)
    .then(res => {
        data.value = res.data[props.field.labelField]
    })

</script>