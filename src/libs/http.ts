import Axios from 'axios'

import { IProfile, AUTH_KEY } from 'contexts/AuthContext'

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api'

export const http = Axios.create({
  baseURL,
})

http.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem(AUTH_KEY) || '{}'
    const parsedAuth: IProfile = JSON.parse(auth)
    config.headers['Authorization'] = `Bearer ${parsedAuth.accessToken}`
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
    if (err.response.status === 401) {
      localStorage.removeItem(AUTH_KEY)
      window.location.reload()
    }
    return Promise.reject(err.response.data)
  }
)
