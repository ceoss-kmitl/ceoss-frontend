import { useEffect, useState } from 'react'

import { Modify } from 'libs/utils'
import { getManyTeacher, ITeacher } from 'apis/teacher'
import { ErrorCode } from 'constants/error'
import { IOption } from 'constants/option'
import { Notification } from 'components/Notification'

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
      Notification.error({
        message: ErrorCode.W00,
        seeMore: error,
      })
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
