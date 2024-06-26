import axios from 'axios'

export const api = axios.create({
  // baseURL: window.location.origin + '/wxapi/',
  baseURL: 'http://114.55.25.220:8080/chnsx/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  },
  timeout: 15 * 1000
})

// //设置拦截器
// api.interceptors.response.use(
//   (response) => {
//     console.log('拦截器:请求成功', response)
//     return response
//   }, (error) => {
//     console.log('拦截器:发生错误', error.response)
//     return Promise.reject(error)
//   }
// )
