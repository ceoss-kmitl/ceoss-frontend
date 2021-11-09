import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'

interface ISubject {
  id: string
  code: string
  name: string
}

export function useBigSearch() {
  const [subjectList, setSubjectList] = useState<ISubject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getAllActiveTeacher() {
    setIsLoading(true)
    try {
      const { data } = await http.get<ISubject[]>('/subject')

      setSubjectList(data)
    } catch (err) {
      setSubjectList([])
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

  return { subjectList, isLoading }
}
