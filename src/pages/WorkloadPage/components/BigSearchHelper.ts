import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'

interface ITeacherList {
  id: string
  value: string
  label: string
}

export function useBigSearch() {
  const [teacherList, setTeacherList] = useState<ITeacherList[]>([])
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
