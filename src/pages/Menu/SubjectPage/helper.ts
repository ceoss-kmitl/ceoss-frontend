import { useState, useEffect } from 'react'

import {
  createOneSubject,
  deleteOneSubject,
  editOneSubject,
  getManySubject,
  ISubject,
} from 'apis/subject'
import { syncSubject } from 'apis/sync'
import { IColumn, IFormLayout } from 'components/Table'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'

type IParsedSubject = {
  credit: string
  id: string
  code: string
  name: string
  isRequired: boolean
  curriculumCode: string
  isInter: boolean
}

const SYNC_EXCEL_SUBJECT_KEY = 'SYNC_EXCEL_SUBJECT_KEY'

export function useMenuSubject() {
  const [data, setData] = useState<IParsedSubject[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function parseCredit(subjectList: ISubject[]): IParsedSubject[] {
    return subjectList.map((subject) => {
      const { credit, lectureHours, labHours, independentHours, ...record } =
        subject

      return {
        ...record,
        credit: `${credit}${lectureHours}${labHours}${independentHours}`,
      }
    })
  }

  function extractCredit(creditStr: string) {
    const result = String(creditStr).match(/\d{1}/g) || []
    return {
      credit: Number(result[0] ?? 0),
      lectureHours: Number(result[1] ?? 0),
      labHours: Number(result[2] ?? 0),
      independentHours: Number(result[3] ?? 0),
    }
  }

  async function getAllSubject() {
    setIsLoading(true)
    try {
      const subjectList = await getManySubject()
      setData(parseCredit(subjectList))
    } catch (error) {
      Notification.error({
        message: error.message,
        seeMore: error,
      })
      setData([])
    }
    setIsLoading(false)
  }

  async function addSubject(record: IParsedSubject) {
    const credit = extractCredit(record.credit)
    const subject: ISubject = {
      ...record,
      ...credit,
    }
    await createOneSubject(subject)
    await getAllSubject()
  }

  async function editSubject(record: IParsedSubject) {
    const credit = extractCredit(record.credit)
    const subject: ISubject = {
      ...record,
      ...credit,
    }
    await editOneSubject(subject)
    await getAllSubject()
  }

  async function deleteSubject(record: IParsedSubject) {
    await deleteOneSubject(record.id)
    await getAllSubject()
  }

  async function importDataFromExcel(data: Record<string, string>[]) {
    setIsLoading(true)
    Notification.loading({
      key: SYNC_EXCEL_SUBJECT_KEY,
      message: 'กำลังนำเข้าข้อมูล...',
    })
    try {
      const result = await syncSubject(data)
      Notification.success({
        key: SYNC_EXCEL_SUBJECT_KEY,
        message: 'นำเข้าข้อมูลสำเร็จ',
        seeMore: result,
      })
      await getAllSubject()
    } catch (error) {
      Notification.error({
        key: SYNC_EXCEL_SUBJECT_KEY,
        message: ErrorCode.X04,
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAllSubject()
  }, [])

  return {
    isLoading,
    data,
    getAllSubject,
    addSubject,
    editSubject,
    deleteSubject,
    importDataFromExcel,
  }
}

export const columnList: IColumn[] = [
  {
    type: 'text',
    header: 'รหัสวิชา',
    dataIndex: 'code',
    pattern: /^\d{8}$/,
    patternMsg: 'กรุณาใส่ตัวเลข 8 ตัว',
    maxLength: 8,
    placeholder: 'รหัสวิชา',
    showInTable: true,
    width: '10%',
  },
  {
    type: 'text',
    header: 'ชื่อวิชา',
    dataIndex: 'name',
    placeholder: 'ชื่อวิชา',
    normalize: (value) => value.toLocaleUpperCase(),
    showInTable: true,
    width: '40%',
  },
  {
    type: 'credit',
    header: 'หน่วยกิต (ทฤษฎี-ปฏิบัติ-เพิ่มเติม)',
    dataIndex: 'credit',
    showInTable: true,
    width: '20%',
  },
  {
    type: 'text',
    header: 'หลักสูตร',
    dataIndex: 'curriculumCode',
    placeholder: 'หลักสูตร',
    normalize: (value) => value.toLocaleUpperCase(),
  },
  {
    type: 'checkbox',
    header: 'นานาชาติ',
    dataIndex: 'isInter',
  },
  {
    type: 'checkbox',
    header: 'วิชาบังคับ',
    dataIndex: 'isRequired',
    defaultChecked: true,
  },
  {
    type: 'checkbox',
    header: 'ใช้ห้องเรียน',
    dataIndex: 'requiredRoom',
    defaultChecked: true,
  },
]

export const formLayout: IFormLayout = {
  addFormTitle: 'เพิ่มข้อมูลวิชาใหม่',
  editFormTitle: 'แก้ไขข้อมูลวิชา',
  layout: [
    ['code', 'credit'],
    ['name'],
    ['curriculumCode', 'isInter'],
    ['isRequired', 'requiredRoom'],
  ],
}
