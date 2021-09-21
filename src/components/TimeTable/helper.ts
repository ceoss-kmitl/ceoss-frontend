import { Form } from 'antd'
import { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'

import { DAY_OF_WEEK, DEGREE, SUBJECT_TYPE } from 'constants/enum'
import { ISelectOption } from 'constants/selectOption'

import { http } from 'libs/http'

export interface IDay {
  workloadList: IWorkload[]
}

export interface IWorkload {
  id: string
  subjectId: string
  code: string
  name: string
  section: number
  type: SUBJECT_TYPE
  fieldOfStudy: string
  degree: DEGREE
  classYear: number
  dayOfWeek: DAY_OF_WEEK
  startSlot: number
  endSlot: number
  timeList: [Dayjs, Dayjs][]
  teacherList: {
    id: string
    name: string
    weekCount: number
  }[]
}

export interface ISlot {
  slotSpan: number
  startSlot: number
  endSlot: number
  workloadList: IWorkload[]
}

export const timeSlot = generateTimeSlot(8, 20)

export const shortDayOfWeek = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา']

export const classYearOptionList = Array(4)
  .fill('')
  .map((_, i) => ({
    label: i + 1,
    value: i + 1,
  }))

/**
 * Input 7 days data from backend and this hooks
 * will return 7 days data that ready to render
 */
export function useTimeTable(dayList: IDay[]) {
  const tableSlot = []
  const MAX_SLOT = 52 // 13 hours x 4 slot each hours (08:00 - 20:00)
  const sortedDayList = sortWorkloadStartTime(dayList)

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const { workloadList } = sortedDayList[dayIndex]
    const daySlot: (ISlot | null)[] = []
    let workloadIndex = 0
    let currentSlot = 1

    while (currentSlot <= MAX_SLOT) {
      const currentWorkload = workloadList[workloadIndex] || { startSlot: 99 }

      // Case #1: Has workload
      if (currentWorkload.startSlot === currentSlot) {
        const slotSpan = currentWorkload.endSlot - currentWorkload.startSlot + 1
        const newEndSlot = currentSlot + slotSpan
        daySlot.push({
          slotSpan,
          startSlot: currentSlot,
          endSlot: newEndSlot - 1,
          workloadList: [currentWorkload],
        })
        currentSlot = newEndSlot
        workloadIndex += 1
      }
      // Case #2: Has workload BUT overlap time
      else if (currentWorkload.startSlot < currentSlot) {
        const prevDaySlot = daySlot.pop()!
        const prevFirstSubject = prevDaySlot.workloadList[0]
        const slotSpan = Math.max(
          currentWorkload.endSlot - prevFirstSubject.startSlot + 1,
          prevDaySlot.slotSpan
        )
        const newEndSlot = Math.max(currentWorkload.endSlot + 1, currentSlot)
        daySlot.push({
          slotSpan,
          startSlot: prevDaySlot.startSlot,
          endSlot: newEndSlot - 1,
          workloadList: [...prevDaySlot.workloadList, currentWorkload],
        })
        currentSlot = newEndSlot
        workloadIndex += 1
      }
      // Case #3: No workload
      else {
        currentSlot += 1
        daySlot.push(null)
      }
    }
    tableSlot.push(daySlot)
  }
  return tableSlot
}

/**
 * Convert data to view-model (Ready for render)
 */
export function useWorkloadSlot(data: ISlot) {
  interface IWorkloadSpan {
    slotSpan: number
    workload: IWorkload
  }
  const workloadSlot: (IWorkloadSpan | null)[][] = []
  const MAX_SLOT = data.slotSpan

  for (let i = 0; i < data.workloadList.length; i++) {
    const slot: (IWorkloadSpan | null)[] = []
    let currentSlot = 1

    while (currentSlot <= MAX_SLOT) {
      const currentWorkload = data.workloadList[i]
      const relativeStartSlot = currentWorkload.startSlot - data.startSlot + 1
      const relativeEndSlot = currentWorkload.endSlot - data.startSlot + 1

      // Case #1: Has subject
      if (relativeStartSlot === currentSlot) {
        const slotSpan = relativeEndSlot - relativeStartSlot + 1
        const newEndSlot = currentSlot + slotSpan
        slot.push({
          slotSpan,
          workload: currentWorkload,
        })
        currentSlot = newEndSlot
      }
      // Case #2: No subject
      else {
        slot.push(null)
        currentSlot += 1
      }
    }
    workloadSlot.push(slot)
  }
  return {
    workloadSlotList: workloadSlot,
    slotHeight: `${((100 / data.workloadList.length) * 60) / 100}px`,
  }
}

export function useDrawer() {
  const [form] = Form.useForm<IWorkload>()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [formAction, setFormAction] = useState<'ADD' | 'EDIT'>('ADD')
  const [subjectOptionList, setSubjectOptionList] = useState<
    ISelectOption[] | null
  >(null)
  const [roomOptionList, setRoomOptionList] = useState<ISelectOption[] | null>(
    null
  )

  const addSubject = () => {
    form.resetFields()
    setFormAction('ADD')
    setIsDrawerVisible(true)
  }

  const editWorkload = (workload: IWorkload) => {
    form.resetFields()
    form.setFieldsValue(workload)
    setFormAction('EDIT')
    setIsDrawerVisible(true)
  }

  const closeDrawer = () => setIsDrawerVisible(false)

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

  useEffect(() => {
    getAllSubject()
  }, [])

  return {
    form,
    isDrawerVisible,
    formAction,
    closeDrawer,
    editWorkload,
    subjectOptionList,
  }
}

// ------------------
// Utilities function
// ------------------

function generateTimeSlot(start: number, end: number) {
  const slots = []
  for (let i = start; i <= end; i++) {
    const time = `${String(i).padStart(2, '0')}:00`
    slots.push(time)
  }
  return slots
}

function sortWorkloadStartTime(dayList: IDay[]): IDay[] {
  return dayList.map((day) => ({
    ...day,
    workloadList: [...day.workloadList].sort(
      (a, b) => a.startSlot - b.startSlot
    ),
  }))
}
