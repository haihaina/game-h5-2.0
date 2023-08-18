import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/css/tailwind.css'
// 1. 引入你需要的组件
import { Button } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
const app = createApp(App)
app.use(router)
.use(Button)
.mount('#app')
