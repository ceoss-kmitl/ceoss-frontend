import { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'

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

export function useWorkload(academicYear: number, semester: number) {
  const [currentTeacherId, setCurrentTeacherId] = useState('')
  const [workload, setWorkload] = useState([])
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  async function getWorkloadByTeacherId(id: string) {
    if (!id) return

    setIsLoading(true)
    try {
      const { data } = await http.get(`/workload`, {
        params: {
          teacher_id: id,
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
      setCurrentTeacherId(id)
    } catch (err) {
      Modal.error({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเรียกดูภาระงานได้',
      })
      setWorkload([])
      setCurrentTeacherId('')
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
    await getWorkloadByTeacherId(currentTeacherId)
    setIsLoading(false)
  }

  const editWorkload = async (workload: any) => {
    setIsLoading(true)
    await http.put(`/workload/${workload.id}`, {
      teacherList: workload.teacherList,
    })
    await getWorkloadByTeacherId(currentTeacherId)
    setIsLoading(false)
  }

  async function deleteWorkload(workload: any) {
    setIsLoading(true)
    await http.delete(`/workload/${workload.id}`)
    await getWorkloadByTeacherId(currentTeacherId)
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

  useEffect(() => {
    getWorkloadByTeacherId(currentTeacherId)
  }, [academicYear, semester])

  return {
    isLoading,
    workload,
    getWorkloadByTeacherId,
    addWorkload,
    editWorkload,
    deleteWorkload,
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
