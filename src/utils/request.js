import axios from 'axios'
import router from "@/router/index.js";

import store from '../store/index.js'
import nprogress from 'nprogress';
import { ElMessage } from 'element-plus';

// const baseURL = import.meta.env.VITE_APP_URL
export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    // baseURL,
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000
  })
  // instance.defaults.withCredentials = true;

  // 请求拦截器配置
  instance.interceptors.request.use(config => {
    // console.log(window.sessionStorage.getItem('htToken'));
    config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('htToken')
    nprogress.start()

    return config
  }, error => {

    return Promise.error(error)
  }
  )
  // 响应拦截器配置
  instance.interceptors.response.use(response => {

    //通过有需要授权才能访问接口，统一去往login授权

    nprogress.done()
    // console.log(response);

    return response.data ? response.data : response
  }, error => {
    console.log(error.response);
    switch (error?.response.status) {
      case 401:

        setTimeout(() => {
          router.push({ path: '/login' })
        }, 1000)
        break
      case 500:
        // console.log("token过期啦")

        
        break
      case 400:
        // console.log("404啦")
        ElMessage.error( error.response.data.message)
        break
      case 422:
        ElMessage.error(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0])
        
        break
      default:
        return Promise.reject(error)
    }
    return Promise.reject(error)
  })
  // 发送真正的网络请求
  return instance(config);
}

export default request
