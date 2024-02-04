/*
 * 1. Buat instance Axios : src>lib>axios>axiosInstace.js 
 */

import axiosInstance from '@/lib/axios/axiosInstance.js'
import { ref } from "vue"


export function useAxios(){
    const loading = ref(true)
    const success = ref(true)
    const error = ref(null)
    const data = ref(null)
    
    const tryFetch = async (url, page, per_page) =>{
        try{
            const response = await axiosInstance.get(url, {
                params:{
                    page: page,
                    per_page: per_page
                }
            })
            data.value = response.data.data
            return response
        }catch(e){
            error.value = e
            loading.value = false
        }
    }

    const tryPost = async (url, formData) =>{
        try{
            const response = await axiosInstance.post(url, formData, {
                headers:{
                   
                    'Content-Type' : 'application/json'
                }
            })
            success.value = response.data.success
            loading.value = false
        }catch(e){
            
            error.value = e
            loading.value = false
        }
    }

    const tryUpload = async (url,formData) =>{
        try{
            const response = await axiosInstance.post(url, formData, {
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            })
            success.value = response.data.success
            loading.value = false
        }catch(e){
            
        }
    }

    return{
        tryFetch, data, tryPost, success, tryUpload
    }
} 