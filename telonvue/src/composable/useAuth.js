import axiosInstance from "../lib/axios/axiosInstance";
import axios from "axios";
import { ref } from "vue";
import Swal from 'sweetalert2'


// Pendefinisian composable
export function useAuth(){
    
    const loading = ref(null)
    const message = ref(null)
    const success = ref(null)
    const error = ref(null)
    const data = ref(null)
    const accessToken = ref(null)
    const refreshToken = ref(null)

    
    const tryAuth = async (url, formData) =>{
        try{
            //credentials digunakan untuk menghubungkan status login antara flask dengan vue
            axios.defaults.withCredentials = true
            const response = await axios.post(url, formData) 
            accessToken.value = response.data.access_token
            refreshToken.value = response.data.refresh_token
            success.value = response.data.success
            loading.value = false
            return response
        }catch(err){
            error.value = err.response.data.error
            Swal.fire(error.value)
            loading.value = false
        }
    }

    const tryLogOut = async (url, access_token) =>{
        try{
            const response = await axios.post(url, null,{
                headers:{
                    "Content-Type": 'application/json',
                    "Authorization":'Bearer' + access_token
                }
            }) 
            success.value = response.data.success
            message.value = response.data.message
            loading.value = false
            return response
        }catch(err){
            error.value = err
            console.log(err)
            loading.value = false
        }
    }

    const tryRegister = async (url, formData, access_token) =>{
        try{
            const response = await axios.post(url, formData,{
                headers:{
                    "Content-Type": 'application/json',
                    "Authorization":'Bearer' + access_token
                }
            }) 
            message.value = response.data.message
            success.value = response.data.success
            loading.value = false
            return response
        }catch(err){
            error.value = err
            console.log(err)
            loading.value = false
        }
    }

    return{
        tryAuth, tryLogOut, tryRegister, success, message, error, loading, accessToken, refreshToken, data
    }
}