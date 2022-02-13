import { FormInstance } from 'antd'
import { useState, useEffect } from 'react'
import { get } from 'lodash'
import dayjs, { Dayjs } from 'dayjs'

export const useCalendarForm = (isOpen: boolean, form: FormInstance) => {
  const [month, setMonth] = useState(dayjs())
  const [dayList, setDayList] = useState<Dayjs[]>([])
  const [currentDayList, setCurrentDayList] = useState<Dayjs[]>([])

  const filterCurrentDayListByMonth = (list: Dayjs[]) => {
    const filteredList = list.filter(
      (each) => each.isSame(month, 'month') && each.isSame(month, 'year')
    )
    setCurrentDayList(filteredList)
  }

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
    setCurrentDayList([])
    setMonth(dayjs())
  }

  useEffect(() => {
    if (isOpen === true) {
      const formValue = form.getFieldsValue()
      const dayList: Dayjs[] = get(formValue, 'dayList', [])
      setDayList(dayList)
    }
  }, [isOpen])

  useEffect(() => {
    filterCurrentDayListByMonth(dayList)
  }, [month, dayList])

  return {
    dayList,
    currentDayList,
    isDaySelected,
    handleOnSelected,
    month,
    setMonth,
    resetCalendar,
  }
}
