import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/router'
import './assets/common.css'
import 'virtual:uno.css'

const app = createApp(App)
app.use(router)

app.mount('#app')
