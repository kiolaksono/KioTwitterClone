import axios from "axios";
import { useAuthStore } from "../../stores/authStore";
import { storeToRefs } from "pinia";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    timeout: 100000,
  });

/*
axios interceptor,
untuk melakukan refresh token secara otomatis 
jika axios menerima respon dari server dengan code 401
*/

axiosInstance.interceptors.request.use(
  (config) =>{
    const accessToken = localStorage.getItem('access_token')
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) =>{
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    //jika axios menerima respon tidak gagal
    return response
  },
  // jika ada suatu eror
  async (error) => {
    const originalRequest = error.config
    if(error.response.status == 401 && !originalRequest._retry){
      originalRequest._retry = true //melakukan refresh ulang
      return Promise.reject(error)}
    try{
      const refreshToken = localStorage.getItem('refresh_token')
      const response = await axios.post(import.meta.env.VITE_API_BASEURL + 'api/auth/refresh', null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      const newAccessToken = response.data.access_token
      localStorage.setItem('access_token', newAccessToken)
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return axiosInstance(originalRequest)
    }catch(err){

      console.log(err)
    }
  }
  
)

export default axiosInstance