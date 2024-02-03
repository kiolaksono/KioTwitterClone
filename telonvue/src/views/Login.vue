<template>
    <div class="p-20 w-4/5">
        <Form class="flex flex-col bg-gray rounded-lg my-10 justify-center">
                <Input id-input="username" input-type="text" label-name="Username" v-model="userDataLogin.username"/>
                <p v-if="validationError.username" class="text-red-500">{{  validationError.username }}</p>
                <Input id-input="password" input-type="password" label-name="Password" v-model="userDataLogin.password"/>
                <p v-if="validationError.password" class="text-red-500">{{  validationError.password }}</p>
                <div class="flex justify-end">
                        <Button name="Login" btnType="submit" @handle-click="handleLogin"/>
                </div>
                {{ userDataLogin.username }} - {{ userDataLogin.password }}
        </Form>
        {{ accessToken }}
    </div>

</template>

<script setup>
import Form from '@/components/ui/Form.vue'
import Input from '@/components/UI/Input.vue'
import Button from '@/components/UI/Button.vue';
import { reactive, ref } from 'vue';
import {useRouter} from 'vue-router';
import { useAuthStore } from '@/stores/authStore.js';
import { useAuth } from '@/composable/useAuth.js';
import Swal from 'sweetalert2'

const {setToken} = useAuthStore()

const {tryAuth, success, message, accessToken, refreshToken, error} = useAuth()

const router = useRouter()

const userDataLogin = reactive({
    username:'',
    password:''
})

const validationError = reactive({
    username:'',
    password:''
})

const handleLogin = async ()=>{

    Object.keys(validationError).forEach(key=>{
        validationError[key] = '';
    })

    let isValid = ref(true);

    if(!userDataLogin.username || !userDataLogin.password){
        validationError.value = "Username atau password tidak boleh kosong"
        isValid = false
        Swal.fire(validationError.value)
    }

    if(isValid){

        const response = await tryAuth(import.meta.env.VITE_API_BASEURL + "api/auth/login/", userDataLogin) 
        
        success.value = response.data.success
        message.value = response.data.message

        if(success.value === true){
            setToken(accessToken.value, refreshToken.value)
            Swal.fire(message.value)
            router.push('/')
        }

    }
}

</script>