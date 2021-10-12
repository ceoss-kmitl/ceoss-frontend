import { useState, useEffect } from 'react'
import { message } from 'antd'

import { http } from 'libs/http'
import { IColumn, IFormLayout } from 'components/Table'

export function useMenuTeacher() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function getAllTeacher() {
    setIsLoading(true)
    try {
      const { data } = await http.get('/teacher')
      setData(data)
    } catch (err) {
      setData([])
      message.error(err.message)
      console.error(err)
    }
    setIsLoading(false)
  }

  async function addTeacher(record: any) {
    const payload = { ...record, executiveRole: record.executiveRole ?? '' }
    await http.post(`/teacher`, payload)
    await getAllTeacher()
  }

  async function editTeacher(record: any) {
    const { id, ...teacher } = record
    const payload = { ...teacher, executiveRole: record.executiveRole ?? '' }
    await http.put(`/teacher/${id}`, payload)
    await getAllTeacher()
  }

  async function deleteTeacher(record: any) {
    await http.delete(`/teacher/${record.id}`)
    await getAllTeacher()
  }

  useEffect(() => {
    getAllTeacher()
  }, [])

  return {
    isLoading,
    data,
    getAllTeacher,
    addTeacher,
    editTeacher,
    deleteTeacher,
  }
}

export const columnList: IColumn[] = [
  {
    type: 'select',
    header: 'ตำแหน่ง',
    dataIndex: 'title',
    optionList: ['อ.', 'ดร.', 'รศ.', 'รศ.ดร.', 'ศ.', 'ผศ.', 'ผศ.ดร.'],
    showInTable: true,
    width: '20%',
  },
  {
    type: 'text',
    header: 'ชื่อ-สกุล',
    dataIndex: 'name',
    showInTable: true,
    width: '40%',
    placeholder: 'ชื่อ-สกุล',
  },
  {
    type: 'text',
    header: 'ตำแหน่งบริหาร',
    dataIndex: 'executiveRole',
    placeholder: 'ไม่มีตำแหน่ง',
    required: false,
  },
  {
    type: 'status',
    header: 'สถานะ',
    dataIndex: 'isActive',
    showInTable: true,
    width: '20%',
  },
  {
    type: 'checkbox',
    header: 'อาจารย์ภายนอก',
    dataIndex: 'isExternal',
    showInTable: false,
    width: '20%',
  },
]

export const formLayout: IFormLayout = {
  addFormTitle: 'เพิ่มข้อมูลอาจารย์ใหม่',
  editFormTitle: 'แก้ไขข้อมูลอาจารย์',
  layout: [['title', 'name'], ['executiveRole'], ['isActive', 'isExternal']],
}
