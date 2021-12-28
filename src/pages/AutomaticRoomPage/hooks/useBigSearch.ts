import { useEffect, useState } from 'react'
import { message } from 'antd'

import { Modify } from 'libs/utils'
import { getManyRoom, IRoom } from 'apis/room'
import { ErrorCode } from 'constants/error'
import { IOption } from 'constants/option'

type IRoomOption = Modify<IRoom, IOption>

export const useBigSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [roomList, setRoomList] = useState<IRoomOption[]>([])
  const [currentRoom, setCurrentRoom] = useState(<IRoomOption>{})

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
      message.error(ErrorCode.R00)
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRoomList()
  }, [])

  return {
    isLoading,
    roomList,
    currentRoom,
    setCurrentRoom,
  }
}
