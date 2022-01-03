import { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { IWorkloadOfTeacherWithDayjs } from 'apis/teacher'

interface IDetail {
  month: string
  subjectList: {
    id: string
    name: string
    dayList: { day: Dayjs; isCompensated: boolean; remark: string }[]
  }[]
}

export const useDocumentDetail = (
  workloadList: IWorkloadOfTeacherWithDayjs[]
) => {
  const flatWorkloadList = workloadList.flatMap((w) => w.workloadList)
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
  const [detail, setDetail] = useState<IDetail>({
    month: dayjs().format('MMMM'),
    subjectList: [],
  })

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
                      remark: '',
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
    if (!list) {
      return false
    }

    const found = list.dayList
      .map((obj) => obj.day.startOf('day'))
      .find((obj) => obj.isSame(day))
    if (!found) {
      return false
    }

    return true
  }

  const handleDownload = (callback: (payload: any) => void) => {
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

  const resetForm = () => {
    setDetail({
      month: dayjs().format('MMMM'),
      subjectList: flatWorkloadList.map((w) => ({
        id: w.subjectId,
        name: w.name,
        dayList: [],
      })),
    })
  }

  useEffect(() => {
    resetForm()
  }, [workloadList])

  return {
    detail,
    isDaySelected,
    addDay,
    removeDay,
    toggleIsCompensated,
    onRemarkChange,
    currentDate,
    month: currentDate.month(),
    setMonth,
    handleDownload,
    resetForm,
  }
}
