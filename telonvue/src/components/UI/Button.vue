<template>
    <button :type="btnType" class="text-white bg-colombia-blue px-4 py-2 rounded-lg opacity-75 mx-5 hover:opacity-100" @click="$emit('handleClick')">{{  name  }}</button>
</template>

<script setup>
defineProps({
    name : String,
    btnType : String
})

defineEmits(['handleClick'])
</script>