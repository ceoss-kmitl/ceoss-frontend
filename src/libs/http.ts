import Axios from 'axios'

const baseURL = process.env.API_URL || 'http://localhost:5050/api'

export const http = Axios.create({
  baseURL,
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (!err.response) {
      return Promise.reject({
        name: 'NetworkError',
        message: 'Request did not reach the destination',
      })
    }
    return Promise.reject(err.response.data)
  }
)
