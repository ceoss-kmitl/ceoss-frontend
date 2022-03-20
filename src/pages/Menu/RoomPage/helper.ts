import { useState, useEffect } from 'react'

import { IColumn, IFormLayout } from 'components/Table'
import { Notification } from 'components/Notification'
import {
  createOneRoom,
  deleteOneRoom,
  editOneRoom,
  getManyRoom,
  IRoom,
} from 'apis/room'
import { syncRoom } from 'apis/sync'
import { ErrorCode } from 'constants/error'
import { useAuth } from 'contexts/AuthContext'

const SYNC_EXCEL_ROOM_KEY = 'SYNC_EXCEL_ROOM_KEY'

export function useMenuRoom() {
  const [data, setData] = useState<IRoom[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { profile } = useAuth()

  async function getAllRoom() {
    setIsLoading(true)
    try {
      const roomList = await getManyRoom()
      setData(roomList)
    } catch (error) {
      Notification.error({
        message: error.message,
        seeMore: error,
      })
      setData([])
    }
    setIsLoading(false)
  }

  async function addRoom(record: IRoom) {
    await createOneRoom(record)
    await getAllRoom()
  }

  async function editRoom(record: IRoom) {
    await editOneRoom(record)
    await getAllRoom()
  }

  async function deleteRoom(record: IRoom) {
    await deleteOneRoom(record.id)
    await getAllRoom()
  }

  async function importDataFromExcel(data: Record<string, string>[]) {
    setIsLoading(true)
    Notification.loading({
      key: SYNC_EXCEL_ROOM_KEY,
      message: 'กำลังนำเข้าข้อมูล...',
    })
    try {
      const result = await syncRoom(data)
      Notification.success({
        key: SYNC_EXCEL_ROOM_KEY,
        message: 'นำเข้าข้อมูลสำเร็จ',
        seeMore: result,
      })
      await getAllRoom()
    } catch (error) {
      Notification.error({
        key: SYNC_EXCEL_ROOM_KEY,
        message: ErrorCode.X05,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (profile) {
      getAllRoom()
    }
  }, [profile])

  return {
    isLoading,
    data,
    getAllRoom,
    addRoom,
    editRoom,
    deleteRoom,
    importDataFromExcel,
  }
}

export const columnList: IColumn[] = [
  {
    type: 'text',
    header: 'ชื่อห้อง',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    showInTable: true,
    width: '30%',
    placeholder: 'ชื่อห้อง',
  },
  {
    type: 'number',
    min: 0,
    header: 'จำนวนที่รองรับ (คน)',
    dataIndex: 'capacity',
    sorter: (a, b) => a.capacity - b.capacity,
    showInTable: true,
    width: '70%',
  },
]

export const formLayout: IFormLayout = {
  addFormTitle: 'เพิ่มข้อมูลห้องเรียนใหม่',
  editFormTitle: 'แก้ไขข้อมูลห้องเรียน',
  layout: [['name', 'capacity']],
}
