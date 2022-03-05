import { useState, useEffect } from 'react'

import {
  createOneTeacher,
  deleteOneTeacher,
  editOneTeacher,
  getManyTeacher,
  ITeacher,
} from 'apis/teacher'
import { syncTeacher } from 'apis/sync'
import { IColumn, IFormLayout } from 'components/Table'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'
import { OptionList } from 'constants/option'

const SYNC_EXCEL_TEACHER_KEY = 'SYNC_EXCEL_TEACHER_KEY'

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

  async function importDataFromExcel(data: Record<string, string>[]) {
    setIsLoading(true)
    Notification.loading({
      key: SYNC_EXCEL_TEACHER_KEY,
      message: 'กำลังนำเข้าข้อมูล...',
    })
    try {
      const result = await syncTeacher(data)
      Notification.success({
        key: SYNC_EXCEL_TEACHER_KEY,
        message: 'นำเข้าข้อมูลสำเร็จ',
        seeMore: result,
      })
      await getAllTeacher()
    } catch (error) {
      Notification.error({
        key: SYNC_EXCEL_TEACHER_KEY,
        message: ErrorCode.X03,
        seeMore: error,
      })
    }
    setIsLoading(false)
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
    importDataFromExcel,
  }
}

export const columnList: IColumn[] = [
  {
    type: 'select',
    header: 'ตำแหน่ง',
    dataIndex: 'title',
    optionList: OptionList.teacherTitle,
    sorter: {
      compare: (a, b) =>
        OptionList.teacherTitle.indexOf(a.title) -
        OptionList.teacherTitle.indexOf(b.title),
      multiple: 2,
    },
    defaultFirstOption: true,
    showInTable: true,
    width: '20%',
  },
  {
    type: 'text',
    header: 'ชื่อ-สกุล',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 1,
    },
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
