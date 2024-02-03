<template>
    <div class="flex flex-col w-4/5 justify-center items-center">
        <Form class="flex flex-col bg-gray rounded-lg my-10 justify-center">

            <div class="flex flex-col p-5">
                <TextArea label="Tweet" v-model="tweet" />{{ tweet }}
                <div class="flex justify-end">
                        <Button name="Post" @handle-click="postContent"/>
                    <div class="ml-5">
                        <Button name="Upload Photo" @handle-click="toggleModal" />
                    </div>
                </div>
            </div>

        </Form>

        <Card v-for="item in data" :key="item.id" :content="item.content" :user="item.user" />

        <!-- Modal Lama -->
        <!-- <div class="modal" v-if="showModal">
            <div class="modal-container">
                <div class="flex-modal">
                    <label>Upload Foto</label>
                    <input type="file" id="foto" class="upload_foto"/>
                </div>
                <div class="flex-modal">
                    <textarea row="5"></textarea>
                </div>
                <div class="button">
                    <div class="button-class">
                        <button>Tweet</button>
                    </div>
                    <div class="button-class">
                        <button @click="toggleModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- Modal Baru -->
        <div v-if="showModal">
            <Modal :is-open ="showModal"
            @close-modal="toggleModal"/>
        </div>

        <div>
            <button @click="prevPages" v-if="page!==1">Previous</button>
            <button @click="nextPages" v-if="page!==total_page">Next</button>
        </div>

    </div>
</template>

<script setup>

import Form from '@/components/UI/Form.vue';
import Card from '@/components/UI/Card.vue';
import Button from '@/components/UI/Button.vue';
import TextArea from '@/components/UI/CustomeTextarea.vue'
import Modal from '@/components/UI/Modal.vue';
import {ref, onMounted, watch} from 'vue'
import { useAxios } from '../composable/useAxios';
import { useAuthStore } from '@/stores/authStore.js'
import { storeToRefs } from 'pinia'

const {tryFetch, tryPost, success, tryUpload} = useAxios()

const stores = useAuthStore()
// dekonstruksi state dan getters. membutuhkan satu fungsi dari pinia yaitu storeToRefs

// storeToRefs digunakan untuk memberitahu si VUE bahawa accessToken etc tsb merupakan sebuah state, bukan props. 
// Dan untuk menjaga sifat reactive dari vue tersebut pada instance accessToken, refreshToken, dan isAuthenticated

const { accessToken, refreshToken, isAuthenticated } = storeToRefs(stores)

const page = ref(1)
const per_page = ref(2)
const total_page = ref()
const prevPages = ()=>{
    page.value--
}

const nextPages = ()=>{
    page.value++
}

watch(page, (newPage)=>{
    handleFetching(newPage, per_page)
})
const tweet = ref('')
const showModal = ref(false)

const data = ref([])

const handleFetching = async (page, per_page)=>{
    const result = await tryFetch('/api/tweets', page, per_page) 
    data.value = result.data.data
    total_page.value = result.data.total_page
    console.log(result)
}

const postContent = async ()=>{
    const result = await tryPost(import.meta.env.VITE_API_BASEURL + 'api/tweets/', accessToken.value)
    if(result.response === 200){
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

</script>
