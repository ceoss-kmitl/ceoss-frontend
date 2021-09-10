import { Form } from 'antd'
import { useEffect, useState } from 'react'

import { http } from 'libs/http'
import { DAY_IN_WEEK, SUBJECT_TYPE, DEGREE } from 'components/TimeTable'

interface IOption {
  label: string
  value: string
}

export function useAdderForm() {
  const [form] = Form.useForm()
  const [subjectOptionList, setSubjectOptionList] = useState<IOption[] | null>(
    null
  )
  const [roomOptionList, setRoomOptionList] = useState<IOption[] | null>(null)

  function isNull(target: any) {
    return target === null
  }

  async function getAllSubject() {
    try {
      const { data } = await http.get('/subject')
      const antdOption = data.map((subject: any) => ({
        label: `${subject.code} - ${subject.name}`,
        value: subject.id,
      }))
      setSubjectOptionList(antdOption)
    } catch (err) {
      setSubjectOptionList([])
    }
  }

  async function getAllRoom() {
    try {
      const { data } = await http.get('/room')
      const antdOption = data.map((room: any) => ({
        label: room.name,
        value: room.id,
      }))
      setRoomOptionList(antdOption)
    } catch (err) {
      setRoomOptionList([])
    }
  }

  useEffect(() => {
    getAllSubject()
    getAllRoom()
  }, [])

  return {
    form,
    isLoading: isNull(subjectOptionList) && isNull(roomOptionList),
    subjectOptionList: subjectOptionList!,
    typeOptionList,
    degreeOptionList,
    classYearOptionList,
    dayOfWeekOptionList,
    roomOptionList: roomOptionList!,
  }
}

const typeOptionList = [
  {
    label: 'ทฤษฎี',
    value: SUBJECT_TYPE.LECTURE,
  },
  {
    label: 'ปฏิบัติ',
    value: SUBJECT_TYPE.LAB,
  },
]

const degreeOptionList = [
  {
    label: 'ปริญญาตรี ทั่วไป',
    value: DEGREE.Bachelor,
  },
  {
    label: 'ปริญญาตรี ต่อเนื่อง',
    value: DEGREE.BachelorCon,
  },
  {
    label: 'ปริญญาตรี นานาชาติ',
    value: DEGREE.BachelorInter,
  },
  {
    label: 'บัณฑิต ทั่วไป',
    value: DEGREE.Pundit,
  },
  {
    label: 'บัณฑิต นานาชาติ',
    value: DEGREE.PunditInter,
  },
]

const classYearOptionList = Array(4)
  .fill('')
  .map((_, i) => ({
    label: i + 1,
    value: i + 1,
  }))

const dayOfWeekOptionList = [
  {
    label: 'จันทร์',
    value: DAY_IN_WEEK.MONDAY,
  },
  {
    label: 'อังคาร',
    value: DAY_IN_WEEK.TUESDAY,
  },
  {
    label: 'พุธ',
    value: DAY_IN_WEEK.WEDNESDAY,
  },
  {
    label: 'พฤหัสบดี',
    value: DAY_IN_WEEK.THURSDAY,
  },
  {
    label: 'ศุกร์',
    value: DAY_IN_WEEK.FRIDAY,
  },
  {
    label: 'เสาร์',
    value: DAY_IN_WEEK.SATURDAY,
  },
  {
    label: 'อาทิตย์',
    value: DAY_IN_WEEK.SUNDAY,
  },
]
