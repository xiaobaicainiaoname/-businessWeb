import axios from 'axios'
// import store from '../store'
// import { getToken } from '@/utils/auth'
// import { Message, MessageBox } from 'element-ui'
// 每次请求携带cookies信息
axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  console.log('request interceptors', config)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    console.log(response.data)
    debugger

    return response.data
  },
  error => {
    console.log(error + ' ' + error.config.url) // for debug
    debugger
    console.log(error)
    return error
  }
)
export default service
// ---------------------
// 作者：话梦人生
// 来源：CSDN
// 原文：https://blog.csdn.net/xshsjl/article/details/82998470
// 版权声明：本文为博主原创文章，转载请附上博文链接！
