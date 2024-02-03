<template>
    <label :for="idInput" class="mx-5">{{  labelName }}</label>
    <input :type="inputType" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="bg-gray focus:outline-none border-b-4 focus:border-colombia-blue h-10 m-5">
</template>

<script setup>
defineProps([ 'idInput','labelName','inputType','modelValue' ])
defineEmits(['update:modelValue'])


</script>