import Axios from 'axios'

import { IProfile } from 'contexts/AuthContext'

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api'

export const http = Axios.create({
  baseURL,
})

http.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem('auth') || ''
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
      localStorage.setItem('auth', JSON.stringify(null))
      window.location.reload()
    }
    return Promise.reject(err.response.data)
  }
)
