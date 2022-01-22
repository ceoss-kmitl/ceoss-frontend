import { useEffect, useState } from 'react'

import { Modify } from 'libs/utils'
import { getManySubject, ISubject } from 'apis/subject'
import { ErrorCode } from 'constants/error'
import { IOption } from 'constants/option'
import { Notification } from 'components/Notification'

type ISubjectOption = Modify<ISubject, IOption>

export const useBigSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [subjectList, setSubjectList] = useState<ISubjectOption[]>([])
  const [currentSubject, setCurrentSubject] = useState(<ISubjectOption>{})

  const fetchSubjectList = async () => {
    setIsLoading(true)
    try {
      const subjectList = await getManySubject()
      const subjectOptionList = subjectList.map((s) => ({
        ...s,
        label: `${s.code} - ${s.name}`,
        value: s.id,
      }))
      setSubjectList(subjectOptionList)
    } catch (error) {
      setSubjectList([])
      Notification.error({
        message: ErrorCode.A00,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSubjectList()
  }, [])

  return {
    isLoading,
    subjectList,
    currentSubject,
    setCurrentSubject,
  }
}
