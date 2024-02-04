<template>
    <div class="flex flex-col w-4/5 justify-center items-center">
        <Form class="flex flex-col bg-gray rounded-lg my-10 justify-center">

            <div class="flex flex-col p-5">
                <TextArea label="Tweet" v-model="content" />{{content}}
                <div class="flex justify-end">
                        <Button name="Post" @click="postContent"/>
                    <div class="ml-5">
                        <Button name="Upload Photo" @click="toggleModal" />
                    </div>
                </div>
            </div>

        </Form>

        <Card v-for="item in tweets.item.data" :key="item.id" :content="item.content" :user="item.user_id" :imgPath="item.image_path" :imgName="item.image_name" />

        <Teleport to="body">
            <Modal @toggle-modal="toggleModal" :show-modal="showModal">
                <Form>
                    <label for="uploadBtn">Upload</label>
                    <label for="uploadFile" class="flex border-2 border-green-500 justify-center p-5 rounded-md">
                        <InputFile button-text="Upload" id="uploadBtn" v-model="formData.file" />
                    </label>
                    <TextArea id="textarea-input" label="Tweet" v-model="formData.content" row="5" />
                    <div class="flex flex-row space-x-3">
                        <Button type="submit" name="Submit" @click="handleUploadFile" />
                        <Button type="button" name="Close" @click="toggleModal" />
                    </div>
                </Form>
            </Modal>
        </Teleport>

        
        <div>
            <button @click="prevPages" v-if="page!==1">Previous</button>
            <button @click="nextPages" v-if="page!==tweets.total_page">Next</button>
        </div>

    </div>
</template>

<script setup>

import Form from '@/components/UI/Form.vue';
import Card from '@/components/UI/Card.vue';
import Button from '@/components/UI/Button.vue';
import TextArea from '@/components/UI/CustomeTextarea.vue'
import Modal from '@/components/UI/Modal.vue';
import {ref, onMounted, reactive, watch} from 'vue'
import { useAxios } from '../composable/useAxios';
import InputFile from '@/components/UI/InputFile.vue'



const {tryFetch, tryPost, success, tryUpload} = useAxios()


// dekonstruksi state dan getters. membutuhkan satu fungsi dari pinia yaitu storeToRefs

// storeToRefs digunakan untuk memberitahu si VUE bahawa accessToken etc tsb merupakan sebuah state, bukan props. 
// Dan untuk menjaga sifat reactive dari vue tersebut pada instance accessToken, refreshToken, dan isAuthenticated


const formData = reactive({
    content:'',
    file:''
})


const page = ref(1)
const tweets = reactive({
    item:[],
    per_page:2,
    total_page:1,
    total_items:0,
})

const prevPages = ()=>{
    page.value--
}

const nextPages = ()=>{
    page.value++
}

watch(page, (newPage)=>{
    handleFetching(newPage, tweets.per_page)
})
const content = ref('')
const showModal = ref(false)



const handleFetching = async ()=>{
    const result = await tryFetch('/api/tweets', page.value,tweets.per_page) 
    tweets.item = result.data
    page.value = result.data.page
    tweets.total_page = result.data.total_page
    tweets.total_items = result.data.total_item
    
}

const postContent = async ()=>{
    await tryPost('/api/tweets/', {"content": content.value})
    if(success.value = true){
        handleFetching()

    }
}



const toggleModal = () =>{
    showModal.value = !showModal.value
}

onMounted(()=>{
    //digunakan agar ketika home got loaded, langsung fetching data
    handleFetching()
})

const handleUploadFile = async () => {
    await tryUpload("/api/tweets/", formData)
    if (success.value == true) {
        handleFetching()
        toggleModal()
    }

}

</script>
