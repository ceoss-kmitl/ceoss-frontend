import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
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
    Modal.loading({
      loadingText: 'กำลังเพิ่มข้อมูลห้องเรียน',
      finishTitle: 'เพิ่มข้อมูลห้องเรียนสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'ไม่สามารถเพิ่มข้อมูลห้องเรียนได้',
      finishFailText: 'ตกลง',
      width: 400,
      onAsyncOk: async () => {
        try {
          await http.post(`/room`, record)
          await getAllRoom()
        } catch (err) {
          await getAllRoom()
          throw err
        }
      },
    })
  }

  async function editRoom(record: any) {
    Modal.loading({
      loadingText: 'กำลังแก้ไขข้อมูลห้องเรียน',
      finishTitle: 'แก้ไขข้อมูลห้องเรียนสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'ไม่สามารถแก้ไขข้อมูลห้องเรียนได้',
      finishFailText: 'ตกลง',
      width: 400,
      onAsyncOk: async () => {
        try {
          const { id, ...room } = record
          await http.put(`/room/${id}`, room)
          await getAllRoom()
        } catch (err) {
          throw err
        }
      },
    })
  }

  async function deleteRoom(record: any) {
    Modal.warning({
      width: 400,
      title: 'ยืนยันการลบ',
      description: 'คุณต้องการยืนยันการลบข้อมูลห้องเรียนนี้หรือไม่',
      finishTitle: 'ลบข้อมูลห้องเรียนสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'ไม่สามารถลบข้อมูลห้องเรียนได้',
      finishFailText: 'ตกลง',
      onAsyncOk: async () => {
        try {
          await http.delete(`/room/${record.id}`)
          await getAllRoom()
        } catch (err) {
          throw err
        }
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
    type: 'number',
    text: 'จำนวนที่รองรับ (คน)',
    dataIndex: 'capacity',
    editable: true,
    width: '70%',
  },
]
