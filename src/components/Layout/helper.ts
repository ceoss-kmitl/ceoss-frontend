import { useState, useEffect } from 'react'
import { IconType } from 'react-icons/lib'
import { FiCalendar, FiMonitor, FiBook, FiFileText } from 'react-icons/fi'

import { getCurrentAcademicYear } from 'libs/datetime'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { Notification } from 'components/Notification'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { useAuth } from 'contexts/AuthContext'

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
    path: '/ta-document',
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
    path: '/menu/room',
    text: 'ข้อมูลห้องเรียน',
  },
  {
    path: '/menu/setting',
    text: 'การตั้งค่า',
  },
]

export function useWebScrap() {
  const [date, setDate] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { academicYear, semester } = useAcademicYear()
  const { profile } = useAuth()

  async function triggerWebScrap() {
    Modal.warning({
      title: 'อัปเดตข้อมูล',
      okText: 'อัปเดต',
      description: `ระบบจะนำข้อมูลจากเว็บสำนักทะเบียน ปี ${academicYear}/${semester} มาเพิ่มลงในระบบ`,
      onAsyncOk: async () => {
        try {
          const { data } = await http.post(`/web-scrap`, null, {
            params: {
              academicYear,
              semester,
              save: true,
            },
          })
          Notification.success({
            message: 'อัปเดตข้อมูลสำเร็จ',
            seeMore: data,
          })
          getLastestUpdatedDate()
        } catch (error) {
          Notification.error({
            message: 'อัปเดตข้อมูลล้มเหลว',
            seeMore: error,
          })
        }
      },
    })
  }

  async function getLastestUpdatedDate() {
    setIsLoading(true)
    try {
      const { data } = await http.get('/web-scrap/updated-date')
      setDate(data)
    } catch (error) {
      setDate('')
      Notification.error({
        message: 'เกิดข้อผิดพลาดขณะตรวจสอบวันที่ของข้อมูล',
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (profile) {
      getLastestUpdatedDate()
    }
  }, [profile])

  return {
    isLoading,
    date,
    triggerWebScrap,
  }
}

export function useSelectAcademicYear() {
  const { academicYear: currentAcademicYear, semester: currentSemester } =
    getCurrentAcademicYear()

  function createAcademicYearOptionList() {
    const academicYearOptionList = []
    for (let i = 2; i >= 0; i--) {
      const year = currentAcademicYear - i
      academicYearOptionList.push({ label: `${year}/1`, value: `${year}/1` })
      academicYearOptionList.push({ label: `${year}/2`, value: `${year}/2` })
    }
    return academicYearOptionList
  }

  return {
    currentAcademicYear: `${currentAcademicYear}/${currentSemester}`,
    academicYearOptionList: createAcademicYearOptionList(),
  }
}
