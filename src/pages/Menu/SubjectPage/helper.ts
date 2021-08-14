import { useState, useEffect } from 'react'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { IColumn } from 'components/Table'

export function useMenuSubject() {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState(null)
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
    try {
      const { data } = await http.get('/subject')
      setData(parseCredit(data))
      setError(null)
    } catch (err) {
      setError(err)
      setData([])
    }
    setIsLoading(false)
  }

  async function addSubject(record: any) {
    const credit = extractCredit(record.credit)
    const subject = { ...record, ...credit }

    Modal.loading({
      loadingText: 'กำลังเพิ่มข้อมูลวิชา',
      finishTitle: 'เพิ่มข้อมูลวิชาสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'ไม่สามารถเพิ่มข้อมูลวิชาได้',
      finishFailText: 'ตกลง',
      width: 400,
      onAsyncOk: async () => {
        try {
          await http.post(`/subject`, subject)
          await getAllSubject()
        } catch (err) {
          await getAllSubject()
          throw err
        }
      },
    })
  }

  async function editSubject(record: any) {
    const credit = extractCredit(record.credit)
    const subject = { ...record, ...credit }

    Modal.loading({
      loadingText: 'กำลังแก้ไขข้อมูลวิชา',
      finishTitle: 'แก้ไขข้อมูลวิชาสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'ไม่สามารถแก้ไขข้อมูลวิชาได้',
      finishFailText: 'ตกลง',
      width: 400,
      onAsyncOk: async () => {
        try {
          const { id, ...subjectWithOutId } = subject
          await http.put(`/subject/${id}`, subjectWithOutId)
          await getAllSubject()
        } catch (err) {
          throw err
        }
      },
    })
  }

  async function deleteSubject(record: any) {
    Modal.warning({
      width: 400,
      title: 'ยืนยันการลบ',
      description: 'คุณต้องการยืนยันการลบข้อมูลวิชานี้หรือไม่',
      finishTitle: 'ลบข้อมูลวิชาสำเร็จ!',
      finishText: 'ตกลง',
      finishFailTitle: 'ไม่สามารถลบข้อมูลวิชาได้',
      finishFailText: 'ตกลง',
      onAsyncOk: async () => {
        try {
          await http.delete(`/subject/${record.id}`)
          await getAllSubject()
        } catch (err) {
          throw err
        }
      },
    })
  }

  useEffect(() => {
    getAllSubject()
  }, [])

  return {
    isLoading,
    data,
    error,
    getAllSubject,
    addSubject,
    editSubject,
    deleteSubject,
  }
}

export const columnList: IColumn[] = [
  {
    text: 'รหัสวิชา',
    dataIndex: 'code',
    placeholder: 'รหัสวิชา',
    editable: true,
    width: '15%',
  },
  {
    text: 'ชื่อวิชา',
    dataIndex: 'name',
    placeholder: 'ชื่อวิชา',
    editable: true,
    width: '50%',
  },
  {
    type: 'credit',
    text: 'หน่วยกิต (ทฤษฎี-ปฏิบัติ-เพิ่มเติม)',
    dataIndex: 'credit',
    editable: true,
    width: '20%',
  },
  {
    type: 'checkbox',
    text: 'วิชาบังคับ',
    dataIndex: 'isRequired',
    editable: true,
    width: '15%',
  },
]
