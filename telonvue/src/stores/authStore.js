import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// computed dapat digunakan untuk mengecek apakah token sudah disimpan di localstorage atau belum

export const useAuthStore = defineStore('auth', ()=>{
    const accessToken = ref(null) 
    const refreshToken = ref(null)

    // untuk mencegah nilai state kembali ke null ketika browser direfresh
    const persistAccessToken = localStorage.getItem('accessToken')
    const persistRefreshToken = localStorage.getItem('refreshToken')
    if((persistAccessToken && persistRefreshToken) !== null){
        accessToken.value = persistAccessToken
        refreshToken.value = persistRefreshToken
    }
    // karena sudah menggunakan piniaPluginPersistedstate, makan script ini tidak diperlukan lagi
    // karena pencegahan tersebut sudah dilakukan oleh pinia plugin tsb

    watch(accessToken,(newAccessToken)=>{
        accessToken.value = newAccessToken
    })
    
    // watch berfungsi untuk menjaga agar nilai access token selalu sama atas adanya refresh token 
    // dari newAccessToken terhadap nilai dari accessToken itu sendiri
    // untuk mencegah perbedaan nilai yang ada pada accessToken yang disimpan 
    // dengan accessToken yang sudah direfresh pada axiosInstance, maka bisa menggunakan library watch

    // getter (checking)
    const isAuthenticated = computed(()=>{
        return accessToken.value !== null
    })

    //actions 
    const setToken = (access_token, refresh_token) =>{
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        accessToken.value = access_token
        refreshToken.value = refresh_token
    }
    const removeToken = ()=>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        accessToken.value = null
        refreshToken.value = null
    }

    return{
        accessToken, refreshToken, isAuthenticated, setToken, removeToken
    }
},
{
    persist: true 
    // bagian dari penggunaan pinia plugin persistedstate.
    // digunakan untuk membuat sifat access token tidak menghilang begitu direfresh
}

)