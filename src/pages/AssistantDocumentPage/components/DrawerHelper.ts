import { FormInstance } from 'antd'
import { useState, useEffect } from 'react'
import { get } from 'lodash'
import dayjs, { Dayjs } from 'dayjs'

export const useCalendarForm = (isOpen: boolean, form: FormInstance) => {
  const [month, setMonth] = useState(dayjs().month())
  const [dayList, setDayList] = useState<Dayjs[]>([])

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
    setMonth(dayjs().month())
  }

  useEffect(() => {
    if (isOpen === true) {
      const formValue = form.getFieldsValue()
      setDayList(get(formValue, 'dayList', []))
    }
  }, [isOpen])

  return {
    dayList,
    isDaySelected,
    handleOnSelected,
    month,
    setMonth,
    resetCalendar,
  }
}
