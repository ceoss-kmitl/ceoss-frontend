import { useState, useEffect } from 'react'
import { message } from 'antd'

import { http } from 'libs/http'
import { IColumn, IFormLayout } from 'components/Table'

export function useMenuRoom() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function getAllRoom() {
    setIsLoading(true)
    try {
      const { data } = await http.get('/room')
      setData(data)
    } catch (err) {
      setData([])
      message.error(err.message)
      console.error(err)
    }
    setIsLoading(false)
  }

  async function addRoom(record: any) {
    await http.post(`/room`, record)
    await getAllRoom()
  }

  async function editRoom(record: any) {
    const { id, ...roomData } = record
    await http.put(`/room/${id}`, roomData)
    await getAllRoom()
  }

  async function deleteRoom(record: any) {
    await http.delete(`/room/${record.id}`)
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
