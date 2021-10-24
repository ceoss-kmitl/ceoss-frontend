import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'

interface IRoom {
  id: string
  name: string
  capacity: number
}

export function useBigSearch() {
  const [roomList, setRoomList] = useState<IRoom[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getAllRoom() {
    setIsLoading(true)
    try {
      const { data } = await http.get<IRoom[]>('/room')

      setRoomList(data)
    } catch (err) {
      setRoomList([])
      Modal.error({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเรียกดูรายการห้องได้',
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAllRoom()
  }, [])

  return { roomList, isLoading }
}
