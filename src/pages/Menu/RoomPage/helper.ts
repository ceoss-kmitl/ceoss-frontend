import { useState, useEffect } from 'react'
import { message } from 'antd'

import { IColumn, IFormLayout } from 'components/Table'
import {
  createOneRoom,
  deleteOneRoom,
  editOneRoom,
  getManyRoom,
  IRoom,
} from 'apis/room'

export function useMenuRoom() {
  const [data, setData] = useState<IRoom[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function getAllRoom() {
    setIsLoading(true)
    try {
      const roomList = await getManyRoom()
      setData(roomList)
    } catch (err) {
      message.error(err.message)
      console.error(err)
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

  useEffect(() => {
    getAllRoom()
  }, [])

  return {
    isLoading,
    data,
    getAllRoom,
    addRoom,
    editRoom,
    deleteRoom,
  }
}

export const columnList: IColumn[] = [
  {
    type: 'text',
    header: 'ชื่อห้อง',
    dataIndex: 'name',
    showInTable: true,
    width: '30%',
    placeholder: 'ชื่อห้อง',
  },
  {
    type: 'number',
    min: 0,
    header: 'จำนวนที่รองรับ (คน)',
    dataIndex: 'capacity',
    showInTable: true,
    width: '70%',
  },
]

export const formLayout: IFormLayout = {
  addFormTitle: 'เพิ่มข้อมูลห้องเรียนใหม่',
  editFormTitle: 'แก้ไขข้อมูลห้องเรียน',
  layout: [['name', 'capacity']],
}
