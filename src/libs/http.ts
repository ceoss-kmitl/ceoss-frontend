import { googleRefresh } from 'apis/auth'
import Axios from 'axios'

import { Notification } from 'components/Notification'
import { CEOSS_LOGOUT_BTN } from 'constants/common'
import { IProfile, AUTH_KEY } from 'contexts/AuthContext'

import { DEVICE_KEY } from './device'

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api'

export const http = Axios.create({
  baseURL,
})

http.interceptors.request.use(
  (config) => {
    const deviceId = localStorage.getItem(DEVICE_KEY) || ''
    const auth = localStorage.getItem(AUTH_KEY) || '{}'
    const profile: IProfile = JSON.parse(auth)
    config.headers['Authorization'] = `Bearer ${profile.accessToken}`
    config.headers['ceoss-device-id'] = deviceId
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
  async (err) => {
    if (!err.response) {
      return Promise.reject({
        name: 'NetworkError',
        message: 'Request did not reach the destination',
      })
    }
    if (err.response.status === 401) {
      try {
        // Try to refresh token
        const { accessToken } = await googleRefresh()
        const auth = localStorage.getItem(AUTH_KEY) || '{}'
        const profile: IProfile = JSON.parse(auth)

        // Save new token
        profile.accessToken = accessToken
        localStorage.setItem(AUTH_KEY, JSON.stringify(profile))

        // Retry failed request
        err.config.headers['Authorization'] = `Bearer ${accessToken}`
        return Axios.request(err.config)
      } catch (error) {
        // Failed to refresh token. Force user to login again
        localStorage.removeItem(AUTH_KEY)
        Notification.error({
          message: 'กรุณาลงชื่อเข้าใช้ใหม่อีกครั้ง',
        })
        const button = document.querySelector<HTMLButtonElement>(
          `#${CEOSS_LOGOUT_BTN}`
        )
        if (button) {
          button.click()
        }
      }
    }
    return Promise.reject(err.response.data)
  }
)
