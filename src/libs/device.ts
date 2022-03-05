import { useEffect } from 'react'
import { nanoid } from 'nanoid'

export const DEVICE_KEY = 'CEOSS_DEVICE'

export const useDeviceId = () => {
  useEffect(() => {
    const deviceId = localStorage.getItem(DEVICE_KEY)
    if (!deviceId) {
      const id = nanoid(10)
      localStorage.setItem(DEVICE_KEY, id)
    }
  }, [])
}
