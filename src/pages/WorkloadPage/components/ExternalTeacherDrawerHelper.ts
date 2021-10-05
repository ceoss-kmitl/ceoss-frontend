import { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface IDetail {
  month: string
  subjectList: {
    id: string
    name: string
    dayList: { day: Dayjs; remark: string }[]
  }[]
}

export function useDocumentDetail(workload: any[]) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
  const [detail, setDetail] = useState<IDetail>(initialDetail)

  const setMonth = (index: number) => setCurrentDate(dayjs().month(index))

  const resetDetail = () => {
    setCurrentDate(dayjs())
    setDetail(initialDetail)
  }

  const removeDay = (subjectId: string, day: Dayjs) =>
    setDetail((detail) => ({
      ...detail,
      subjectList: detail.subjectList.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              dayList: subject.dayList.filter((obj) => !obj.day.isSame(day)),
            }
          : subject
      ),
    }))

  const addDay = (subjectId: string, day: Dayjs) =>
    setDetail((detail) => ({
      ...detail,
      subjectList: detail.subjectList.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              dayList: [...subject.dayList, { day, remark: '' }].sort(
                (a, b) => {
                  if (a.day.isBefore(b.day)) return -1
                  if (a.day.isAfter(b.day)) return 1
                  return 0
                }
              ),
            }
          : subject
      ),
    }))

  const isDaySelected = (subjectId: string, day: Dayjs) => {
    const list = detail.subjectList.find((subject) => subject.id === subjectId)
    if (!list) return false

    const found = list.dayList
      .map((obj) => obj.day.startOf('day'))
      .find((obj) => obj.isSame(day))
    if (!found) return false

    return true
  }

  useEffect(() => {
    setDetail({
      month: dayjs().format('MMMM'),
      subjectList: workload.map((w) => ({
        id: w.subjectId,
        name: w.name,
        dayList: [],
      })),
    })
  }, [workload])

  return {
    detail,
    isDaySelected,
    addDay,
    removeDay,
    resetDetail,
    currentDate,
    month: currentDate.month(),
    setMonth,
    monthOptionList,
  }
}

const initialDetail: IDetail = {
  month: dayjs().format('MMMM'),
  subjectList: [],
}

const monthOptionList = Array(12)
  .fill('')
  .map((_, index) => {
    const thatDay = dayjs().month(index)
    return {
      label: thatDay.toDate().toLocaleDateString('th-TH', { month: 'long' }),
      value: thatDay.month(),
    }
  })
