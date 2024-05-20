<template>
    <div>
        <PageSelector v-if="data" :app="app" :page="page" :route="$route.path" :fetchData="fetchData"
            :pagination="pagination" :submitData="submitData" :data="data" />
        <DefaultPagination v-if="!!pagination?.totalCount" :pageNumber="pagination.pageNumber"
            :pageSize="pagination.pageSize" :totalCount="pagination.totalCount" />
    </div>
</template>

<script setup lang="ts">
import { PageSelector } from '~/components/dui/PageSelector';
import type { DuiApp } from '~/dui-app/DuiApp';
import DefaultPagination from '../components/dui/DefaultPagination.vue';


const router = useRouter()
const route = useRoute()
const app = inject<DuiApp<any>>("dui-app")!
const data = ref<any | any[]>(null)
const pagination = ref<{
    pageNumber: number,
    pageSize: number,
    totalCount: number
} | undefined>(undefined)
const page = app.getPage(route.path)

async function fetchData() {
    const response = await page?.dataSource?.run({
        app,
        page,
        path: route.fullPath,
        query: route.query,
        router
    })

    if (response?.size && response.total) {
        pagination.value = {
            pageNumber: response.page ?? 0,
            pageSize: response.size,
            totalCount: response.total
        }
    } else {
        pagination.value = undefined
    }
    //TODO should also give access to pagination
    data.value = response?.data
}

async function submitData(data: any) {
    if (!page?.onSubmit) return

    await page.onSubmit.run({
        data,
        app,
        page,
        path: route.fullPath,
        router
    })
}

onMounted(() => {
    fetchData()
})

watch(() => route.fullPath, () => {
    fetchData()
})

</script>