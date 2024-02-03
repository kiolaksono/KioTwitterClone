<template>
    <div class="flex flex-col justify-center">
        <label>{{  label  }}</label>
        <textarea class="flex focus:outline-none p-5 my-5 resize-none" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
    </div>
</template>

<script setup>
defineProps(['label','modelValue'])

defineEmits(['update:modelValue'])

</script>

