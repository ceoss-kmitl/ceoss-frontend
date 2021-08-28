import { useState, useEffect } from 'react'
import { IconType } from 'react-icons/lib'
import { FiCalendar, FiMonitor, FiBook, FiFileText } from 'react-icons/fi'
import { getCurrentAcademicYear } from 'libs/datetime'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'

interface IPath {
  path: string
  text: string
  Icon?: IconType
}

export const pathList: IPath[] = [
  {
    path: '/workload',
    text: 'จัดการภาระงาน',
    Icon: FiCalendar,
  },
  {
    path: '/automatic-room',
    text: 'จัดห้องอัตโนมัติ',
    Icon: FiMonitor,
  },
  {
    path: '/compensation-book',
    text: 'หนังสือสอนชดเชย',
    Icon: FiBook,
  },
  {
    path: '/assistant-document',
    text: 'เอกสาร TA',
    Icon: FiFileText,
  },
]

export const subPathList: IPath[] = [
  {
    path: '/menu/teacher',
    text: 'ข้อมูลอาจารย์',
  },
  {
    path: '/menu/subject',
    text: 'ข้อมูลวิชา',
  },
  {
    path: '/menu/assistant',
    text: 'ข้อมูล TA',
  },
  {
    path: '/menu/room',
    text: 'ข้อมูลห้องเรียน',
  },
  {
    path: '/menu/setting',
    text: 'การตั้งค่า',
  },
]

export function useWebScrap() {
  const [date, setDate] = useState<string | null>(null)

  async function triggerWebScrap() {
    Modal.warning({
      title: 'อัปเดตข้อมูล',
      okText: 'อัปเดต',
      description: 'คุณต้องการอัปเดตข้อมูลหรือไม่',
      finishTitle: 'อัปเดตข้อมูลสำเร็จ',
      finishFailTitle: 'อัปเดตข้อมูลล้มเหลว',
      onAsyncOk: async () => {
        try {
          const { academicYear, semester } = getCurrentAcademicYear()
          const { data } = await http.get(`/web-scrap`, {
            params: {
              academic_year: academicYear,
              semester,
            },
          })
          setDate(data)
        } catch (err) {
          throw err
        }
      },
    })
  }

  async function getLastestUpdatedDate() {
    try {
      const { data } = await http.get('/web-scrap/updated-date')
      setDate(data)
    } catch (err) {
      setDate('')
      throw err
    }
  }

  useEffect(() => {
    getLastestUpdatedDate()
  }, [])

  return { date, triggerWebScrap }
}
