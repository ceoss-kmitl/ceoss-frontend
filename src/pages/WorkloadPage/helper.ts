import { useState, useEffect } from 'react'

import { getCurrentAcademicYear, toDayjsTime } from 'libs/datetime'
import { http } from 'libs/http'
import { Modal } from 'components/Modal'
import { delay } from 'libs/delay'
import { message } from 'antd'

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
    await delay(1)
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

  const editWorkload = async (workload: any) => {
    setIsLoading(true)
    await delay(1)
    try {
      await http.put(`/workload/${workload.id}`, {
        teacherList: workload.teacherList,
      })
      await getWorkloadByTeacherId(currentTeacherId)
    } catch (err) {
      message.error(err.message, 10)
    }
    setIsLoading(false)
  }

  async function deleteWorkload(workload: any) {
    setIsLoading(true)
    await delay(1)
    try {
      await http.delete(`/workload/${workload.id}`)
      await getWorkloadByTeacherId(currentTeacherId)
    } catch (err) {
      message.error(err.message, 10)
    }
    setIsLoading(false)
  }

  function convertToWorkloadTime(timeRangePicker: any[]) {
    return timeRangePicker.map(({ time }: { time: any[] }) => {
      const normalTimeList = time.map((t: any) =>
        t.toDate().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
        })
      )
      const [startTime, endTime] = normalTimeList
      return {
        startTime,
        endTime,
      }
    })
  }

  async function addWorkload(formValue: any) {
    Modal.loading({
      loadingText: 'กำลังเพิ่มภาระงาน',
      finishTitle: 'เพิ่มภาระงานสำเร็จ!',
      finishFailTitle: 'ไม่สามารถเพิ่มภาระงานได้',
      width: 400,
      onAsyncOk: async () => {
        try {
          const payload = {
            ...formValue,
            timeList: convertToWorkloadTime(formValue.timeList),
            section: Number(formValue.section),
            isCompensated: false,
            teacherId: currentTeacherId,
            academicYear,
            semester,
          }
          await http.post(`/workload`, payload)
          await getWorkloadByTeacherId(currentTeacherId)
        } catch (err) {
          console.log(err)
          throw err
        }
      },
    })
  }

  useEffect(() => {
    getWorkloadByTeacherId(currentTeacherId)
  }, [academicYear, semester])

  return {
    isLoading,
    workload,
    getWorkloadByTeacherId,
    editWorkload,
    deleteWorkload,
    addWorkload,
  }
}
