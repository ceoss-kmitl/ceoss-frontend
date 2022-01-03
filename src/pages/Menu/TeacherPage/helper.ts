import { useState, useEffect } from 'react'

import {
  createOneTeacher,
  deleteOneTeacher,
  editOneTeacher,
  getManyTeacher,
  ITeacher,
} from 'apis/teacher'
import { IColumn, IFormLayout } from 'components/Table'
import { Notification } from 'components/Notification'

export function useMenuTeacher() {
  const [data, setData] = useState<ITeacher[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function getAllTeacher() {
    setIsLoading(true)
    try {
      const teacherList = await getManyTeacher()
      setData(teacherList)
    } catch (error) {
      setData([])
      Notification.error({
        message: error.message,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  async function addTeacher(record: ITeacher) {
    await createOneTeacher(record)
    await getAllTeacher()
  }

  async function editTeacher(record: ITeacher) {
    await editOneTeacher(record)
    await getAllTeacher()
  }

  async function deleteTeacher(record: ITeacher) {
    await deleteOneTeacher(record.id)
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
