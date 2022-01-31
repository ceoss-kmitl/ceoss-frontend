import { useEffect, useState } from 'react'

import { useAcademicYear } from 'contexts/AcademicYearContext'
import { getManyWorkload, IWorkload } from 'apis/workload'
import { ErrorCode } from 'constants/error'
import { Notification } from 'components/Notification'

type IUnAssignedWorkloadWithCheck = IWorkload & { checked: boolean }

export const useUnAssignedWorkload = (refetchWhenValueChange = <any>[]) => {
  const { academicYear, semester } = useAcademicYear()

  const [isLoading, setIsLoading] = useState(false)
  const [workloadList, setWorkloadList] = useState<
    IUnAssignedWorkloadWithCheck[]
  >([])

  const fetchUnAssignedWorkloadList = async () => {
    setIsLoading(true)
    try {
      const workloadList = await getManyWorkload({
        academicYear,
        semester,
        room: 'NULL',
        requiredRoom: true,
      })
      const workloadCheckList = workloadList.map((w) => ({
        ...w,
        checked: false,
      }))
      setWorkloadList(workloadCheckList)
    } catch (error) {
      setWorkloadList([])
      Notification.error({
        message: ErrorCode.R10,
        seeMore: error,
      })
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

    callback(workloadIdList)
  }

  useEffect(() => {
    fetchUnAssignedWorkloadList()
  }, [academicYear, semester, ...refetchWhenValueChange])

  return {
    isLoading,
    workloadList,
    handleOnChange,
    handleOnSubmit,
    handleOnClose,
  }
}
