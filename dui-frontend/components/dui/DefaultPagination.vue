<template>
    <div style="text-align: center;">
        <div style="display: inline-block;">
            <v-btn-toggle rounded="xl" v-model="size">
                <v-btn :value="v" v-for="v of pageSizeOptions">{{ v }}</v-btn>
            </v-btn-toggle>
        </div>
        <div style="display: inline-block;">
            <v-pagination v-model="page" :total-visible="5" :length="Math.ceil(totalCount/pageSize)">

            </v-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    pageNumber: number,
    pageSize: number,
    totalCount: number
}>()

const router = useRouter()
const route = useRoute()

const pageSizeOptions = [
    10, 25, 50, 100
]
const page = computed({
    get() {
        return parseInt(route.query.page as string ?? `${props.pageNumber}`)
    },
    set(page) {
        router.replace({ query: { ...route.query, page } })
    }
})

const size = computed({
    get() {
        return parseInt(route.query.size as string ?? `${props.pageSize}`)
    },
    set(size) {
        router.replace({ query: { ...route.query, size } })
    }
})
</script>