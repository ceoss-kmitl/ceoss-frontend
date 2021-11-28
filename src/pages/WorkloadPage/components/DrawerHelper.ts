import { message } from 'antd'
import { useEffect, useState } from 'react'

import { getManyTeacher } from 'apis/teacher'
import { getManySubject } from 'apis/subject'
import { IOption } from 'constants/option'
import { ErrorCode } from 'constants/error'
import { getManyRoom } from 'apis/room'

export const useOption = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [teacherList, setTeacherList] = useState<IOption[]>([])
  const [subjectList, setSubjectList] = useState<IOption[]>([])
  const [roomList, setRoomList] = useState<IOption[]>([])

  const fetchTeacherList = async () => {
    try {
      const query = { is_active: true }
      const teacherList = await getManyTeacher(query)
      const teacherOptionList = teacherList.map((t) => ({
        label: `${t.title}${t.name}`,
        value: t.id,
      }))
      setTeacherList(teacherOptionList)
    } catch (error) {
      setTeacherList([])
      message.error(ErrorCode.W05)
      console.error(error)
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
      message.error(ErrorCode.W06)
      console.error(error)
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
      message.error(ErrorCode.W07)
      console.error(error)
    }
  }

  const fetchAllOption = async () => {
    setIsLoading(true)
    await Promise.all([fetchTeacherList(), fetchSubjectList(), fetchRoomList()])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAllOption()
  }, [])

  return {
    isLoading,
    teacherList,
    subjectList,
    roomList,
  }
}
