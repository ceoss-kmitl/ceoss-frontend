import { useEffect, useState } from 'react'

import { getManyTeacher } from 'apis/teacher'
import { getManySubject } from 'apis/subject'
import { IOption } from 'constants/option'
import { ErrorCode } from 'constants/error'
import { getManyRoom } from 'apis/room'
import { Notification } from 'components/Notification'
import { useAuth } from 'contexts/AuthContext'

export const useOption = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [teacherList, setTeacherList] = useState<IOption[]>([])
  const [subjectList, setSubjectList] = useState<IOption[]>([])
  const [roomList, setRoomList] = useState<IOption[]>([])
  const { profile } = useAuth()

  const fetchTeacherList = async () => {
    try {
      const teacherList = await getManyTeacher({
        isActive: true,
      })
      const teacherOptionList = teacherList.map((t) => ({
        label: `${t.title}${t.name}`,
        value: t.id,
      }))
      setTeacherList(teacherOptionList)
    } catch (error) {
      setTeacherList([])
      Notification.error({
        message: ErrorCode.R11,
        seeMore: error,
      })
    }
  }

  const fetchSubjectList = async () => {
    try {
      const subjectList = await getManySubject()
      const subjectOptionList = subjectList.map((s) => ({
        label: `${s.code} - ${s.name}`,
        value: s.id,
      }))
      setSubjectList(subjectOptionList)
    } catch (error) {
      setSubjectList([])
      Notification.error({
        message: ErrorCode.R12,
        seeMore: error,
      })
    }
  }

  const fetchRoomList = async () => {
    try {
      const roomList = await getManyRoom()
      const roomOptionList = roomList.map((r) => ({
        label: r.name,
        value: r.id,
      }))
      setRoomList(roomOptionList)
    } catch (error) {
      setRoomList([])
      Notification.error({
        message: ErrorCode.R13,
        seeMore: error,
      })
    }
  }

  const fetchAllOption = async () => {
    setIsLoading(true)
    await Promise.all([fetchTeacherList(), fetchSubjectList(), fetchRoomList()])
    setIsLoading(false)
  }

  useEffect(() => {
    if (profile) {
      fetchAllOption()
    }
  }, [profile])

  return {
    isLoading,
    teacherList,
    subjectList,
    roomList,
  }
}
