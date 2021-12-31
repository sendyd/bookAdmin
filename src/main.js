import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '../src/style/css/base.css'
import router from './router/index.js'
import store from './store/index.js'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(store)
app.mount('#app')