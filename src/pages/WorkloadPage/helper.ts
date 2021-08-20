import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { delay } from 'libs/delay'

export function useBigSearch() {
  const [teacherList, setTeacherList] = useState<
    { id: string; value: string; label: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  function convertToOption(list: any[]) {
    return list.map((each) => ({
      id: each.id,
      value: `${each.title}${each.name}`,
      label: `${each.title}${each.name}`,
    }))
  }

  async function getAllActiveTeacher() {
    setIsLoading(true)
    await delay(1)
    try {
      const { data } = await http.get('/teacher?is_active=true')
      setTeacherList(convertToOption(data))
    } catch (err) {
      setTeacherList([])
      Modal.error({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเรียกดูรายชื่ออาจารย์ได้',
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAllActiveTeacher()
  }, [])

  return { teacherList, isLoading }
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

  function getCurrentAcademicYear() {
    const today = new Date()
  }

  return { isLoading, isError, workload, getWorkloadByTeacherId }
}
