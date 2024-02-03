<template>
    <nav class="flex justify-around bg-moonstone p-4">
        <h1 class="flex items-center">Twitter Clone</h1>
        <ul class="flex gap-10">
            <RouterLink to="/" exact active-class="border-b-2 border-gray" class="hover:border-b-2 border-gray cursor-pointer">Home</RouterLink>
            <RouterLink to="/leaderboard" exact active-class="border-b-2 border-gray" class="hover:border-b-2 border-gray cursor-pointer">Leaderboard</RouterLink>
            <RouterLink to="/login" exact active-class="border-b-2 border-gray" class="hover:border-b-2 border-gray cursor-pointer">Login</RouterLink>
            <RouterLink to="/register" exact active-class="border-b-2 border-gray" class="hover:border-b-2 border-gray cursor-pointer">Register</RouterLink>
            <a to="/logout" class="hover:border-b-2 border-gray cursor-pointer" @click="handleLogout">Logout</a>
            <a :href="urlAdmin" class="hover:border-b-2 border-gray cursor-pointer">Admin</a>
            
            
        </ul>
    </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import { useAuthStore } from '../../stores/authStore';
import { useAuth } from '../../composable/useAuth';


const urlAdmin = import.meta.env.VITE_API_BASEURL + 'admin'
const router = useRouter()
const { removeToken, accessToken } = useAuthStore()
const { tryLogOut, success, message } = useAuth()

const handleLogout = async ()=>{
    Swal.fire({
        title: "Logout",
        text: "Are you sure to leave us?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Contiue",
        cancelButtonText: "Close"
    }).then((result) => {
        if (result.isConfirmed) {
            removeToken()
            router.push('/login')
            
        }
    });
}

</script>