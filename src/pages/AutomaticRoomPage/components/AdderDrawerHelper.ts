import { message } from 'antd'
import { useEffect, useState } from 'react'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import { getManyUnAssignedWorkload, IUnAssignedWorkload } from 'apis/workload'
import { ErrorCode } from 'constants/error'
import { Modify } from 'libs/utils'

type IUnAssignedWorkloadWithCheck = Modify<
  IUnAssignedWorkload,
  { checked: boolean }
>

export const useUnAssignedWorkload = () => {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [workloadList, setWorkloadList] = useState<
    IUnAssignedWorkloadWithCheck[]
  >([])

  const fetchUnAssignedWorkloadList = async () => {
    setIsLoading(true)
    try {
      const query = {
        academic_year: academicYear,
        semester,
      }
      const workloadList = await getManyUnAssignedWorkload(query)
      const workloadCheckList = workloadList.map((w) => ({
        ...w,
        checked: false,
      }))
      setWorkloadList(workloadCheckList)
    } catch (error) {
      setWorkloadList([])
      message.error(ErrorCode.R10)
      console.error(error)
    }
    setIsLoading(false)
  }

  const handleOnClose = (callback: () => void) => {
    const newWorkloadList = [...workloadList]
    newWorkloadList.forEach((w) => {
      w.checked = false
    })
    setWorkloadList(newWorkloadList)
    callback()
  }

  const handleOnChange = (workloadId: string, checked: boolean) => {
    const newWorkloadList = [...workloadList]
    newWorkloadList.forEach((w) => {
      if (w.workloadId === workloadId) {
        w.checked = checked
      }
    })
    setWorkloadList(newWorkloadList)
  }

  const handleOnSubmit = async (
    callback: (workloadIdList: string[]) => void
  ) => {
    const workloadIdList = workloadList
      .filter((w) => w.checked)
      .map((w) => w.workloadId)

    await callback(workloadIdList)
    fetchUnAssignedWorkloadList()
  }

  useEffect(() => {
    fetchUnAssignedWorkloadList()
  }, [academicYear, semester])

  return {
    isLoading,
    workloadList,
    handleOnChange,
    handleOnSubmit,
    handleOnClose,
  }
}
