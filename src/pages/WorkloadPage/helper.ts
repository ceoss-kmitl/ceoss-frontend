import { http } from 'libs/http'
import { useState, useEffect } from 'react'

export function useBigSearch() {
  const [teacherList, setTeacherList] = useState<
    { id: string; value: string; label: string }[]
  >([])

  function convertToOption(list: any[]) {
    return list.map((each) => ({
      id: each.id,
      value: `${each.title}${each.name}`,
      label: `${each.title}${each.name}`,
    }))
  }

  async function getAllActiveTeacher() {
    try {
      const { data } = await http.get('/teacher?is_active=true')
      setTeacherList(convertToOption(data))
    } catch (err) {
      setTeacherList([])
    }
  }

  useEffect(() => {
    getAllActiveTeacher()
  }, [])

  return { teacherList }
}

export function useWorkload() {
  const [workload, setWorkload] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  async function getWorkloadByTeacherId(id: string) {
    setIsLoading(true)
    try {
      const { data } = await http.get(`/teacher/${id}/workload`, {
        params: {
          academic_year: 2563,
          semester: 1,
        },
      })
      setWorkload(data)
      setIsError(false)
    } catch (err) {
      setWorkload([])
      setIsError(true)
    }
    setIsLoading(false)
  }

  return { isLoading, isError, workload, getWorkloadByTeacherId }
}
