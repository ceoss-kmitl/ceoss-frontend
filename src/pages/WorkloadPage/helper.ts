import { useState, useEffect } from 'react'
import { getCurrentAcademicYear } from 'libs/datetime'
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
      setWorkload(data)
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

  async function discardWorkload(id: string) {
    Modal.warning({
      title: 'ยืนยันการนำออก',
      description: 'คุณต้องการนำภาระงานนี้ออกหรือไม่',
      finishTitle: 'นำภาระงานออกสำเร็จ',
      finishFailTitle: 'ไม่สามารถนำภาระงานออกได้',
      width: 340,
      onAsyncOk: async () => {
        setIsLoading(true)
        try {
          await http.delete(`/workload/${id}`)
          await getWorkloadByTeacherId(currentTeacherId)
        } catch (err) {
          setIsLoading(false)
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
    discardWorkload,
  }
}
