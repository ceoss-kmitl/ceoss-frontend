import { useState, useEffect } from 'react'
import { message } from 'antd'

import { http } from 'libs/http'
import { IColumn, IFormLayout } from 'components/Table'
import { delay } from 'libs/delay'

export function useMenuSubject() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function parseCredit(data: any[]) {
    return data.map((subject) => {
      const { credit, lectureHours, labHours, independentHours, ...record } =
        subject

      return {
        ...record,
        credit: `${credit}${lectureHours}${labHours}${independentHours}`,
      }
    })
  }

  function extractCredit(input: string) {
    const result = String(input).match(/\d{1}/g) || []
    return {
      credit: Number(result[0] ?? 0),
      lectureHours: Number(result[1] ?? 0),
      labHours: Number(result[2] ?? 0),
      independentHours: Number(result[3] ?? 0),
    }
  }

  async function getAllSubject() {
    setIsLoading(true)
    await delay(2)
    try {
      const { data } = await http.get('/subject')
      setData(parseCredit(data))
    } catch (err) {
      message.error(err.message)
      console.error(err)
      setData([])
    }
    setIsLoading(false)
  }

  async function addSubject(record: any) {
    const credit = extractCredit(record.credit)
    const subject = {
      ...record,
      ...credit,
    }
    await delay(2)
    await http.post(`/subject`, subject)
    await getAllSubject()
  }

  async function editSubject(record: any) {
    const credit = extractCredit(record.credit)
    const subject = {
      ...record,
      ...credit,
    }
    await delay(2)
    const { id, ...subjectData } = subject
    await http.put(`/subject/${id}`, subjectData)
    await getAllSubject()
  }

  async function deleteSubject(record: any) {
    await delay(2)
    await http.delete(`/subject/${record.id}`)
    await getAllSubject()
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
  }
}

export const columnList: IColumn[] = [
  {
    type: 'text',
    header: 'รหัสวิชา',
    dataIndex: 'code',
    pattern: /^\d{8}$/,
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
    header: 'วิชาบังคับ',
    dataIndex: 'isRequired',
    defaultChecked: true,
  },
  {
    type: 'checkbox',
    header: 'นานาชาติ',
    dataIndex: 'isInter',
  },
]

export const formLayout: IFormLayout = {
  addFormTitle: 'เพิ่มข้อมูลวิชาใหม่',
  editFormTitle: 'แก้ไขข้อมูลวิชา',
  layout: [
    ['code', 'credit'],
    ['name'],
    ['curriculumCode', 'isRequired', 'isInter'],
  ],
}
