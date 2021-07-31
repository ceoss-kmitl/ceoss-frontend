import { useState } from 'react'
// import { http } from 'libs/http'

export function useDemoHttp() {
  const [data, setData] = useState<unknown>(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function loadData() {
    setIsLoading(true)
    try {
      // Example of REAL data fetching below
      // const { data } = await http.get('/account')

      // The line below is mock fetching
      const { data } = await mockHttpGet()
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
    loadData,
  }
}

async function mockHttpGet() {
  const mockAPI: Promise<{ data: unknown }> = new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() >= 0.4
      if (!isSuccess) reject({ error: 'some error' })

      resolve({
        data: {
          title: 'Today datetime',
          datetime: new Date().toUTCString(),
        },
      })
    }, 1000)
  })

  return await mockAPI
}
