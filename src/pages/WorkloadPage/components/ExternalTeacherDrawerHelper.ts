import { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface IDetail {
  month: string
  subjectList: {
    id: string
    name: string
    dayList: { day: Dayjs; isCompensated: boolean; remark: string }[]
  }[]
}

export function useDocumentDetail(workload: any[]) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
  const [detail, setDetail] = useState<IDetail>(initialDetail)

  const setMonth = (index: number) => {
    setCurrentDate(dayjs().month(index))
    setDetail((detail) => ({
      ...detail,
      subjectList: detail.subjectList.map((subject) => ({
        ...subject,
        dayList: [],
      })),
    }))
  }

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
              dayList: [
                ...subject.dayList,
                { day, remark: '', isCompensated: false },
              ].sort((a, b) => {
                if (a.day.isBefore(b.day)) return -1
                if (a.day.isAfter(b.day)) return 1
                return 0
              }),
            }
          : subject
      ),
    }))

  const toggleIsCompensated = (subjectId: string, day: Dayjs) =>
    setDetail((detail) => ({
      ...detail,
      subjectList: detail.subjectList.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              dayList: subject.dayList.map((obj) =>
                obj.day.startOf('day').isSame(day.startOf('day'))
                  ? {
                      ...obj,
                      isCompensated: !obj.isCompensated,
                    }
                  : obj
              ),
            }
          : subject
      ),
    }))

  const onRemarkChange = (subjectId: string, day: Dayjs, value: string) => {
    setDetail((detail) => ({
      ...detail,
      subjectList: detail.subjectList.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              dayList: subject.dayList.map((obj) =>
                obj.day.startOf('day').isSame(day.startOf('day'))
                  ? {
                      ...obj,
                      remark: value,
                    }
                  : obj
              ),
            }
          : subject
      ),
    }))
  }

  const isDaySelected = (subjectId: string, day: Dayjs) => {
    const list = detail.subjectList.find((subject) => subject.id === subjectId)
    if (!list) return false

    const found = list.dayList
      .map((obj) => obj.day.startOf('day'))
      .find((obj) => obj.isSame(day))
    if (!found) return false

    return true
  }

  const handleDownload = (callback: (config: any) => void) => {
    const payload = {
      ...detail,
      subjectList: detail.subjectList.map((subject) => ({
        subjectId: subject.id,
        dayList: subject.dayList.map((obj) => ({
          day: obj.day.date(),
          isCompensated: obj.isCompensated,
          remark: obj.remark,
        })),
      })),
    }
    callback(payload)
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
    toggleIsCompensated,
    onRemarkChange,
    currentDate,
    month: currentDate.month(),
    setMonth,
    monthOptionList,
    handleDownload,
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
