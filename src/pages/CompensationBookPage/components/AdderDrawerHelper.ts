import { message } from 'antd'
import { useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { compact } from 'lodash'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import { getManyAvailableRoom, getManyRoom } from 'apis/room'
import { IOption } from 'constants/option'
import { ErrorCode } from 'constants/error'
import { getManyWorkload, IWorkload } from 'apis/workload'

const NO_ROOM = { value: 'NULL', label: 'ไม่ใช้ห้อง' }

export const useCompensation = (selectedWorkload: IWorkload) => {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [availableRoomList, setAvailableRoomList] = useState<IOption[]>([])
  const [roomList, setRoomList] = useState<IOption[]>([])

  const fetchAvailableRoom = async (formValue: any) => {
    const date: Dayjs = formValue.compensatedDate
    const time: Dayjs[] = formValue.compensatedTime

    if (!date || compact(time).length !== 2) {
      return
    }
    setIsLoading(true)
    try {
      const [startTime, endTime] = time.map((each) => each.format('HH:mm'))
      const roomList = await getManyAvailableRoom({
        academicYear,
        semester,
        compensatedDate: date.toDate(),
        startTime,
        endTime,
      })
      const roomOptionList = roomList.map((r) => ({
        label: r.roomName,
        value: r.roomId,
      }))
      setAvailableRoomList([NO_ROOM, ...roomOptionList])
    } catch (error) {
      message.error(ErrorCode.C04)
      console.error(error)
    }
    setIsLoading(false)
  }

  const fetchAllRoom = async () => {
    setIsLoading(true)
    try {
      const roomList = await getManyRoom()
      const roomOptionList = roomList.map((r) => ({
        label: r.name,
        value: r.id,
      }))
      setRoomList(roomOptionList)
    } catch (error) {
      message.error(ErrorCode.C04) // FIXME
      console.error(error)
    }
    setIsLoading(false)
  }

  const handleDisabledDate = (date: Dayjs) => {
    // Config offset here again because of `dayjsGenerateConfig`
    // that provide to custom `DatePicker` in folder components is
    // generated before the config in `index.ts` has run
    const offsetWeekDay = (date.weekday() - 1) % 7
    return offsetWeekDay !== selectedWorkload.dayOfWeek
  }

  useEffect(() => {
    fetchAllRoom()
  }, [])

  return {
    isLoading,
    roomList,
    availableRoomList,
    setAvailableRoomList,
    fetchAvailableRoom,
    handleDisabledDate,
  }
}

export const useWorkload = (subjectId: string) => {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [workloadList, setWorkloadList] = useState(<IWorkload[]>[])
  const [selectedWorkload, setSelectedWorkload] = useState(<IWorkload>{})

  const fetchWorkloadList = async () => {
    setIsLoading(true)
    try {
      const workloadList = await getManyWorkload({
        academicYear,
        semester,
        compensation: false,
        subject: subjectId,
      })
      setWorkloadList(workloadList)
    } catch (error) {
      message.error(ErrorCode.C04) // FIXME: eiei
      console.error(error)
    }
    setIsLoading(false)
  }

  const changeSelectedWorkload = (workload?: IWorkload) => {
    setSelectedWorkload(workload || ({} as IWorkload))
  }

  useEffect(() => {
    fetchWorkloadList()
  }, [subjectId])

  return {
    isLoading,
    workloadList,
    selectedWorkload,
    changeSelectedWorkload,
  }
}
