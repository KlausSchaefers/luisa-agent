import './assets/main.css'

import luisa from 'luisa-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(luisa)
app.mount('#app')
