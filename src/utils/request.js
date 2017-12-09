import axios from 'axios'
import auth from './auth'

axios.interceptors.request.use(config => {
  config.headers.common.Authorization = auth.getToken()
  config.headers.common['X-ISAPI'] = 1
  return config
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  const errorMsg = error.response.data.error_msg || '网络连接出错'
  const err = new Error(errorMsg)
  err.response = error.response
  throw err
})

const request = axios

request.withLoading = (...args) => {
  window.app.loading()
  return axios(...args).then(result => {
    window.app.loading(false)
    return result
  }, err => {
    window.app.loading(false)
    window.app.toast(err.message)
    throw err
  })
}

export default request
