import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)
const pinia = createPinia()

// install pinia plugin persistances
// import piniapluginpersistedstate
pinia.use(piniaPluginPersistedstate)

app.use(router) // thats how use router
app.use(pinia)
app.use(VueSweetalert2)
app.mount('#app')

