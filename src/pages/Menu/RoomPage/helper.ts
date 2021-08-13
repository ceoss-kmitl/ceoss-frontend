import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { message } from 'antd'
import { IColumn } from 'components/Table'

export function useMenuRoom() {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getAllRoom() {
    setIsLoading(true)
    try {
      const { data } = await http.get('/room')
      setData(data)
      setError(null)
    } catch (err) {
      setError(err)
      setData([])
    }
    setIsLoading(false)
  }

  async function addRoom(record: any) {
    try {
      await http.post(`/room`, record)
      await getAllRoom()
      message.success('เพิ่มข้อมูลห้องสำเร็จ')
    } catch (err) {
      message.error('ไม่สามารถเพิ่มข้อมูลห้องได้')
    }
  }

  async function editRoom(record: any) {
    try {
      const { id, ...room } = record
      await http.put(`/room/${id}`, room)
      await getAllRoom()
      message.success('แก้ไขข้อมูลห้องสำเร็จ')
    } catch (err) {
      message.error('ไม่สามารถแก้ไขข้อมูลห้องได้')
    }
  }

  async function deleteRoom(record: any) {
    console.log(record)
    const deleteModal = Modal.warning({
      title: 'ยืนยันการลบ',
      description: 'คุณต้องการยืนยันการลบข้อมูลห้องนี้หรือไม่',
      onAsyncOk: async () => {
        try {
          await http.delete(`/room/${record.id}`)
          await getAllRoom()
          message.success('ลบข้อมูลห้องสำเร็จ')
        } catch (err) {
          message.error('ไม่สามารถลบข้อมูลห้องได้')
        }
        deleteModal.destroy()
      },
    })
  }

  useEffect(() => {
    getAllRoom()
  }, [])

  return {
    isLoading,
    data,
    error,
    getAllRoom,
    addRoom,
    editRoom,
    deleteRoom,
  }
}

export const columnList: IColumn[] = [
  {
    text: 'ชื่อห้อง',
    dataIndex: 'name',
    editable: true,
    width: '30%',
    placeholder: 'ชื่อห้อง',
  },
  {
    text: 'จำนวนที่รองรับ (คน)',
    dataIndex: 'capacity',
    editable: true,
    width: '70%',
    placeholder: '0',
  },
  //   {
  //     type: 'select',
  //     text: 'ขนาดห้อง',
  //     dataIndex: '',
  //     selectList: ['เล็ก', 'ใหญ่'],
  //     editable: true,
  //     width: '30%',
  //   },
]
