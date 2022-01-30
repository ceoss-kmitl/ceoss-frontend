import { useEffect, useState } from 'react'

import { Modify } from 'libs/utils'
import { getManyRoom, IRoom } from 'apis/room'
import { ErrorCode } from 'constants/error'
import { IOption } from 'constants/option'
import { Notification } from 'components/Notification'
import { useAuth } from 'contexts/AuthContext'

type IRoomOption = Modify<IRoom, IOption>

export const useBigSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [roomList, setRoomList] = useState<IRoomOption[]>([])
  const [currentRoom, setCurrentRoom] = useState(<IRoomOption>{})
  const { profile } = useAuth()

  const fetchRoomList = async () => {
    setIsLoading(true)
    try {
      const roomList = await getManyRoom()
      const roomOptionList = roomList.map((r) => ({
        ...r,
        label: r.name,
        value: r.id,
      }))
      setRoomList(roomOptionList)
    } catch (error) {
      setRoomList([])
      Notification.error({
        message: ErrorCode.R00,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (profile) {
      fetchRoomList()
    }
  }, [profile])

  return {
    isLoading,
    roomList,
    currentRoom,
    setCurrentRoom,
  }
}
