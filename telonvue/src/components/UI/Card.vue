
<template>
    <div class="bg-mint rounded-lg my-5 w-full">
        <div class="p-5">
            <span>Tweet from @{{  props.user }}</span>
            <img v-if="imgPath" :src="imgPath" :alt="imgName">
            <p>{{ props.content }}</p>
            <p>
                <Button name="like" :is-clicked="isClicked" class="hover:bg-green-800 p-2  rounded-md" :class="{'bg-green-500 text-white': !isClicked, 'border-2 border-green-500 text-green-500' : isClicked}" @click="buttonClicked"/>
            </p>
        </div>
    </div>

</template>

<script setup> 

const props = defineProps(['content','user','imgPath','imgName'])
import Button from'./Button.vue';
import {ref} from 'vue'

const isClicked = ref(false)

const buttonClicked = ()=> {
    isClicked.value = !isClicked.value

}

</script>