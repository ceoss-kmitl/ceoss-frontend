import { FormInstance } from 'antd'
import { useState, useEffect } from 'react'
import { get } from 'lodash'
import dayjs, { Dayjs } from 'dayjs'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import { getCurrentAcademicYear } from 'libs/datetime'

export const useCalendarForm = (isOpen: boolean, form: FormInstance) => {
  const [month, setMonth] = useState(dayjs())
  const [dayList, setDayList] = useState<Dayjs[]>([])
  const { academicYear, semester } = useAcademicYear()

  const isDaySelected = (day: Dayjs) => {
    const isFound = dayList.find((d) =>
      d.startOf('day').isSame(day.startOf('day'))
    )
    return isFound ? true : false
  }

  const handleOnSelected = (day: Dayjs) => {
    // Removing from dayList
    if (isDaySelected(day)) {
      const filteredDayList = dayList.filter(
        (d) => !d.startOf('day').isSame(day.startOf('day'))
      )
      setDayList(filteredDayList)
    }
    // Adding to dayList
    else {
      const newDayList = [...dayList, day.startOf('day')]
      setDayList(newDayList)
    }
  }

  const resetCalendar = () => {
    setDayList([])
    setMonth(dayjs())
  }

  const allowWithinAcademicYear = (date: Dayjs) => {
    const { academicYear: a, semester: s } = getCurrentAcademicYear(
      date.toDate()
    )
    return academicYear !== a || semester !== s
  }

  useEffect(() => {
    if (isOpen === true) {
      const formValue = form.getFieldsValue()
      const dayList: Dayjs[] = get(formValue, 'dayList', [])
      setDayList(dayList)
    }
  }, [isOpen])

  return {
    dayList,
    isDaySelected,
    handleOnSelected,
    month,
    setMonth,
    resetCalendar,
    allowWithinAcademicYear,
  }
}
