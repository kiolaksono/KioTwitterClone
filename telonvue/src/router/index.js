import { createRouter, createWebHistory } from "vue-router"

import Home from "@/views/Home.vue"
import Leaderboard from "@/views/Leaderboard.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import {useAuthStore} from '@/stores/authStore.js'

// createwebhistory memerlukan 1 parameter, yaitu default url yang akan digunakan oleh vue tersebut 
// seperti http://localhost:5173/
// paramter tersebut juga bisa diisi dengan mengimport base url yang ada

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        // penampung yang digunakan untuk mendeklarasikan variabel variabel yang dibutuhkan oleh #Apps
        {
        // atribute untuk home
            path: '/' ,
            name: 'home',
            component: Home,
            meta:{
                requiresAuth:true
            }
        },
        {
            path: '/leaderboard',
            name: 'leaderboard',
            component: Leaderboard,
            meta:{
                requiresAuth:true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        }
    ]
    
})

router.beforeEach((to, from, next)=>{
    const {isAuthenticated} = useAuthStore()

    if(to.meta.requiresAuth){
        if(isAuthenticated){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})

export default router