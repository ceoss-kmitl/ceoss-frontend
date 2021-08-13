import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { message } from 'antd'
import { IColumn } from 'components/Table'

export function useMenuTeacher() {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getAllTeacher() {
    setIsLoading(true)
    try {
      const { data } = await http.get('/teacher')
      setData(data)
      setError(null)
    } catch (err) {
      setError(err)
      setData([])
    }
    setIsLoading(false)
  }

  async function addTeacher(record: any) {
    try {
      await http.post(`/teacher`, record)
      await getAllTeacher()
      message.success('เพิ่มข้อมูลอาจารย์สำเร็จ')
    } catch (err) {
      message.error('ไม่สามารถเพิ่มข้อมูลอาจารย์ได้')
    }
  }

  async function editTeacher(record: any) {
    try {
      const { id, ...teacher } = record
      await http.put(`/teacher/${id}`, teacher)
      await getAllTeacher()
      message.success('แก้ไขข้อมูลอาจารย์สำเร็จ')
    } catch (err) {
      message.error('ไม่สามารถแก้ไขข้อมูลอาจารย์ได้')
    }
  }

  async function deleteTeacher(record: any) {
    console.log(record)
    const deleteModal = Modal.warning({
      title: 'ยืนยันการลบ',
      description: 'คุณต้องการยืนยันการลบข้อมูลอาจารย์นี้หรือไม่',
      onAsyncOk: async () => {
        try {
          await http.delete(`/teacher/${record.id}`)
          await getAllTeacher()
          message.success('ลบข้อมูลอาจารย์สำเร็จ')
        } catch (err) {
          message.error('ไม่สามารถลบข้อมูลอาจารย์ได้')
        }
        deleteModal.destroy()
      },
    })
  }

  useEffect(() => {
    getAllTeacher()
  }, [])

  return {
    isLoading,
    data,
    error,
    getAllTeacher,
    addTeacher,
    editTeacher,
    deleteTeacher,
  }
}

export const columnList: IColumn[] = [
  {
    type: 'select',
    text: 'ตำแหน่ง',
    dataIndex: 'title',
    selectList: [
      'อาจารย์',
      'รองศาสตราจารย์',
      'ศาสตราจารย์',
      'ผู้ช่วยศาสตราจารย์',
    ],
    editable: true,
    width: '20%',
  },
  {
    text: 'ชื่อ-สกุล',
    dataIndex: 'name',
    editable: true,
    width: '40%',
    placeholder: 'ชื่อ-สกุล',
  },
  {
    type: 'checkbox',
    text: 'ผู้บริหาร',
    dataIndex: 'isExecutive',
    editable: true,
    width: '40%',
  },
]
