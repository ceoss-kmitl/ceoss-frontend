import { useEffect, useState } from 'react'
import { message } from 'antd'

import { Modify } from 'libs/utils'
import { getManySubject, ISubject } from 'apis/subject'
import { ErrorCode } from 'constants/error'
import { IOption } from 'constants/option'

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
      message.error(ErrorCode.C01)
      console.error(error)
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
