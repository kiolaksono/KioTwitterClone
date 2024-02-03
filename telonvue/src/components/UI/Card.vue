
<template>
    <div class="bg-mint rounded-lg my-5 w-full">
        <div class="p-5">
            <p>{{ props.content }}</p>
            <span>{{  props.user }}</span>
        </div>
    </div>

</template>

<script setup> 

const props = defineProps(['content','user'])

</script>