import { useEffect, useState } from 'react'
import { message } from 'antd'

import { Modify } from 'libs/utils'
import { getManyTeacher, ITeacher } from 'apis/teacher'
import { ErrorCode } from 'constants/error'
import { IOption } from 'constants/option'

type ITeacherOption = Modify<ITeacher, IOption>

export const useBigSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [teacherList, setTeacherList] = useState<ITeacherOption[]>([])
  const [currentTeacher, setCurrentTeacher] = useState(<ITeacherOption>{})

  const fetchTeacherList = async () => {
    setIsLoading(true)
    try {
      const teacherList = await getManyTeacher({
        isActive: true,
      })
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
