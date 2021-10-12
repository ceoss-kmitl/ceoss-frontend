import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'

interface ITeacher {
  id: string
  title: string
  name: string
  isExternal: boolean
}

export function useBigSearch() {
  const [teacherList, setTeacherList] = useState<ITeacher[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getAllActiveTeacher() {
    setIsLoading(true)
    try {
      const { data } = await http.get<ITeacher[]>('/teacher?is_active=true')

      setTeacherList(data)
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
