import { useEffect, useState } from 'react'
import { message } from 'antd'

import { getManyTeacher, ITeacher } from 'apis/teacher'
import { ErrorCode } from 'constants/error'

export const useTeacherList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [teacherList, setTeacherList] = useState<any[]>([])
  const [currentTeacher, setCurrentTeacher] = useState<ITeacher | null>(null)

  const fetchTeacherList = async () => {
    setIsLoading(true)
    try {
      const query = { is_active: true }
      const teacherList = await getManyTeacher(query)
      const teacherOptionList = teacherList.map((t) => ({
        ...t,
        label: `${t.title}${t.name}`,
        value: t.id,
      }))
      setTeacherList(teacherOptionList)
    } catch (error) {
      setTeacherList([])
      message.error(ErrorCode.W00)
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTeacherList()
  }, [])

  return {
    isLoading,
    teacherList,
    currentTeacher,
    setCurrentTeacher,
  }
}
