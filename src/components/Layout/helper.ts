import { useState, useEffect } from 'react'
import { IconType } from 'react-icons/lib'
import { FiCalendar, FiMonitor, FiBook, FiFileText } from 'react-icons/fi'

import { getCurrentAcademicYear } from 'libs/datetime'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { Notification } from 'components/Notification'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { useAuth } from 'contexts/AuthContext'
import { useWebContext } from 'contexts/WebContext'
import { getManyWeb } from 'apis/web'

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
  const { webList, updateWebList } = useWebContext()

  async function triggerWebScrap() {
    Modal.warning({
      title: 'อัปเดตข้อมูล',
      okText: 'อัปเดต',
      description: `ระบบจะนำข้อมูลจากเว็บสำนักทะเบียน ปี ${academicYear}/${semester} มาเพิ่มลงในระบบ`,
      loadingStep: webList.length,
      onAsyncOk: async (nextStep) => {
        try {
          const result = <{ webId: string; data: any }[]>[]
          for (const _web of webList) {
            const { data } = await http.post(`/v2/web-scrap`, null, {
              params: {
                webId: _web.id,
                academicYear,
                semester,
                save: true,
              },
            })
            result.push({ webId: _web.id, data })
            nextStep()
          }
          Notification.success({
            message: 'อัปเดตข้อมูลสำเร็จ',
            seeMore: result,
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

  async function fetchWebList() {
    setIsLoading(true)
    try {
      const webList = await getManyWeb()
      updateWebList(webList)
    } catch (error) {
      Notification.error({
        message: 'เกิดข้อผิดพลาดขณะเรียกดูรายการเว็บไซต์',
        seeMore: error,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (profile) {
      getLastestUpdatedDate()
      fetchWebList()
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
