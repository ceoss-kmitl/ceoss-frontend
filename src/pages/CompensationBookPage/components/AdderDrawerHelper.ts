import { FormInstance, message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import { getManyAvailableRoom } from 'apis/room'
import { IOption } from 'constants/option'
import { ErrorCode } from 'constants/error'

const convertDateAndTimeToString = (date: Dayjs, time: Dayjs[]) => {
  const dateISO = dayjs(date).toISOString()
  const [startTime, endTime] = time.map((each: any) =>
    dayjs(each).format('HH:mm')
  )
  return { dateISO, startTime, endTime }
}

const NO_ROOM = { value: '', label: 'ไม่มี' }

export const useAvailableRoom = () => {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [roomList, setRoomList] = useState<IOption[]>([NO_ROOM])

  const fetchAvailableRoom = async (form: FormInstance) => {
    const date = form.getFieldValue('compensatedDate')
    const time = form.getFieldValue('compensatedTime')
    if (!date || !time) {
      return
    }
    setIsLoading(true)
    try {
      const { dateISO, startTime, endTime } = convertDateAndTimeToString(
        date,
        time
      )
      const query = {
        academic_year: academicYear,
        semester,
        compensatedDate: dateISO,
        startTime,
        endTime,
      }
      const roomList = await getManyAvailableRoom(query)
      const roomOptionList = roomList.map((r) => ({
        label: r.roomName,
        value: r.roomId,
      }))
      setRoomList([NO_ROOM, ...roomOptionList])
    } catch (error) {
      message.error(ErrorCode.C04)
      console.error(error)
    }
    setIsLoading(false)
  }

  return {
    isLoading,
    roomList,
    fetchAvailableRoom,
  }
}
