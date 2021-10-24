import { Dayjs } from 'dayjs'
import { message } from 'antd'
import { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'

import { getCurrentAcademicYear, toDayjsTime } from 'libs/datetime'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'

export function useAcademicYear() {
  const [currentAcademicYear, setCurrentAcademicYear] = useState(0)
  const [academicYear, setAcademicYear] = useState(0)
  const [semester, setSemester] = useState(0)

  function getAcademicYearOptionList() {
    const academicYearOptionList = []
    for (let i = 3; i >= 0; i--) {
      const year = currentAcademicYear - i
      academicYearOptionList.push({ label: year, value: year })
    }
    return academicYearOptionList
  }

  function getSemesterOptionList() {
    const semesterOptionList = []
    for (let i = 1; i <= 2; i++) {
      semesterOptionList.push({ label: i, value: i })
    }
    return semesterOptionList
  }

  useEffect(() => {
    const current = getCurrentAcademicYear()
    setCurrentAcademicYear(current.academicYear)
    setAcademicYear(current.academicYear)
    setSemester(current.semester)
  }, [])

  return {
    academicYear,
    semester,
    setAcademicYear,
    setSemester,
    academicYearOptionList: getAcademicYearOptionList(),
    semesterOptionList: getSemesterOptionList(),
  }
}

interface IRoom {
  id: string
  name: string
  capacity: number
}

export function useWorkload(academicYear: number, semester: number) {
  const [room, setRoom] = useState<IRoom>({} as IRoom)
  const [workload, setWorkload] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  function setCurrentRoom(room: IRoom) {
    setRoom(room)
  }

  async function getWorkloadByRoomId(id: string) {
    if (!id) return

    setIsLoading(true)
    try {
      const { data } = await http.get(`/workload`, {
        params: {
          room_id: id,
          academic_year: academicYear,
          semester,
        },
      })

      const workloadWithDayjs = data.map((day: any) => ({
        workloadList: day.workloadList.map((workload: any) => ({
          ...workload,
          timeList: workload.timeList.map((time: any) => [
            toDayjsTime(time.start),
            toDayjsTime(time.end),
          ]),
        })),
      }))

      setWorkload(workloadWithDayjs)
    } catch (err) {
      Modal.error({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเรียกดูภาระงานได้',
      })
      setWorkload([])
    }
    setIsLoading(false)
  }

  async function addWorkload(formValue: any) {
    setIsLoading(true)
    const payload = {
      ...formValue,
      timeList: convertToWorkloadTime(formValue.timeList),
      section: Number(formValue.section),
      academicYear,
      semester,
    }
    delete payload.id

    await http.post(`/workload`, payload)
    await getWorkloadByRoomId(room.id)
    setIsLoading(false)
  }

  const editWorkload = async (workload: any) => {
    setIsLoading(true)
    await http.put(`/workload/${workload.id}`, {
      roomList: workload.roomList,
    })
    await getWorkloadByRoomId(room.id)
    setIsLoading(false)
  }

  async function deleteWorkload(workload: any) {
    setIsLoading(true)
    await http.delete(`/workload/${workload.id}`)
    await getWorkloadByRoomId(room.id)
    setIsLoading(false)
  }

  function convertToWorkloadTime(timeRangePicker: Dayjs[][]) {
    return timeRangePicker.map(([start, end]) => {
      return [
        start.toDate().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        end.toDate().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      ]
    })
  }

  async function downloadExcel(externalTeacherOption?: any) {
    const messageKey = 'downloading'

    message.loading({ key: messageKey, content: 'กำลังดาวน์โหลด...' })
    setIsDownloading(true)
    try {
      let data

      if (externalTeacherOption) {
        const res = await http.post(
          '/workload/excel-external',
          externalTeacherOption,
          {
            params: {
              teacher_id: room.id,
              academic_year: academicYear,
              semester,
            },
          }
        )
        data = res.data
      } else {
        const res = await http.get('/workload/excel', {
          params: {
            teacher_id: room.id,
            academic_year: academicYear,
            semester,
          },
        })
        data = res.data
      }

      const bufferArray = [new Uint8Array(data.buffer).buffer]
      const blob = new Blob(bufferArray, { type: data.fileType })
      saveAs(blob, data.fileName)

      message.success({ key: messageKey, content: 'ดาวน์โหลดสำเร็จ' })
    } catch (err) {
      message.error({ key: messageKey, content: err.message })
    }
    setIsDownloading(false)
  }

  useEffect(() => {
    getWorkloadByRoomId(room.id)
  }, [academicYear, semester, room])

  return {
    isLoading,
    isDownloading,
    workload,
    currentRoom: room,
    setCurrentRoom,
    getWorkloadByRoomId,
    addWorkload,
    editWorkload,
    deleteWorkload,
    downloadExcel,
  }
}

export function useExternalTeacherDrawer() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const openDrawer = () => {
    setIsDrawerVisible(true)
  }

  const closeDrawer = () => {
    setIsDrawerVisible(false)
  }

  return {
    openDrawer,
    drawerProps: {
      isDrawerVisible,
      onClose: closeDrawer,
    },
  }
}
