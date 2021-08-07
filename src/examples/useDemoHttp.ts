import { useState } from 'react'
import { http } from 'libs/http'

export function useDemoHttp() {
  const [data, setData] = useState<unknown>(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getAllAccount() {
    setIsLoading(true)
    try {
      const { data } = await http.get('/account')
      setData(data)
      setError(null)
    } catch (err) {
      setError(err)
      setData(null)
    }
    setIsLoading(false)
  }

  async function getErrorAccount() {
    setIsLoading(true)
    try {
      const { data } = await http.get('/account/xyz')
      setData(data)
      setError(null)
    } catch (err) {
      setError(err)
      setData(null)
    }
    setIsLoading(false)
  }

  return {
    isLoading,
    data,
    error,
    getAllAccount,
    getErrorAccount,
  }
}
