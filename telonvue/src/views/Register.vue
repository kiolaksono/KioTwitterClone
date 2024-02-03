<template>
    <div class="p-20 w-4/5">
        <Form class="flex flex-col bg-gray rounded-lg my-10 justify-center">
            <p v-if="success" class="bg-green p-3">{{ message }}</p>
                <Input id-input="username" input-type="text" label-name="Username" v-model="userData.username"/>
                <Input id-input="email" input-type="text" label-name="Email" v-model="userData.email"/>
                <Input id-input="password" input-type="password" label-name="Password" v-model="userData.password"/>
                <Input id-input="confirm_password" input-type="password" label-name="Confirm Password" v-model="confirmPassword"/>
                
                <div class="flex justify-end">
                        <Button name="Login" btnType="submit" @handle-click="handleRegist"/>
                </div>

                {{ userData.username }} - {{ userData.password }} - {{ userData.email }}
        </Form>
    </div>

</template>

<script setup>
import Form from '@/components/ui/Form.vue'
import Input from '@/components/UI/Input.vue'
import Button from '@/components/UI/Button.vue';
import { reactive, ref } from 'vue';
import {useRouter} from 'vue-router';
import { useAuth } from '@/composable/useAuth.js';

const {tryAuth} = useAuth()

const userData = reactive({
    username: '',
    password: '',
    email: ''
})

const confirmPassword = ref('')


const success = ref(false)
const message = ref()

const {tryLogin} = useAuth()


const handleRegist = async ()=>{
    if(confirmPassword.value === userData.password){
        const result = await tryAuth(import.meta.env.VITE_API_BASEURL + "/api/auth/register/", userData)
            success.value = result.data.success
            message.value = result.data.message

    }
}
</script>
