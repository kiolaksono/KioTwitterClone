<template>
    <div>
        <h1 class="flex justify-center my-10">Leaderboard</h1>
        <div class="flex item-center">
            <DataTable class="display" :columns="columns" :data="data.data" :options="options"/>

        </div>
            

    </div>
</template>

<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import { useAxios } from '../composable/useAxios';
import { ref, onMounted } from 'vue';
 
DataTable.use(DataTablesCore);

const data = ref([])
const {tryFetch} = useAxios()

const columns = [
    {data:"username", title:'Username'},
    {data:'total_tweet',title:'Total Tweets'}
]

const options = {
    paging: false,
    searching: false,
    details: false,
    info:false
}

const handleFetching = async ()=>{
    const result = await tryFetch('/api/totaltweets')
    data.value = result.data
    console.log(data.value)

}

onMounted(()=>{
    handleFetching()
})

</script>

<style>
@import 'datatables.net-dt'
</style>