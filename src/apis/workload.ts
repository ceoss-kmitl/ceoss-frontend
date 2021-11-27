import { http } from 'libs/http'
import { DayOfWeek, Degree, WorkloadType } from 'constants/enum'

export interface IWorkloadOfTeacher {
  workloadList: {
    id: string
    subjectId: string
    code: string
    name: string
    section: number
    type: WorkloadType
    fieldOfStudy: string
    degree: Degree
    classYear: number
    dayOfWeek: DayOfWeek
    startSlot: number
    endSlot: number
    timeList: {
      start: string
      end: string
    }[]
    teacherList: {
      teacherId: string
      weekCount: number
      isClaim: boolean
    }[]
    isClaim: boolean
  }[]
}

export const getManyWorkloadOfTeacher = async (
  teacherId: string,
  query?: Record<string, any>
) => {
  const { data } = await http.get<IWorkloadOfTeacher[]>(
    `/workload/teacher/${teacherId}`,
    {
      params: query,
    }
  )
  return data
}

export const createOneWorkload = async (payload: any) => {
  await http.post<string>(`/workload`, payload)
}

/**
 * NOTE: Can edit only teacherList of the workload
 */
export const editOneWorkload = async (id: string, payload: any) => {
  await http.put(`/workload/${id}`, payload)
}

export const deleteOneWorkload = async (id: string) => {
  await http.delete(`/workload/${id}`)
}

export const downloadOneExcelFile = async (query: Record<string, any>) => {
  const { data } = await http.get('/workload/excel', {
    params: query,
  })
  return data
}

export const downloadOneExcelExternalFile = async (
  query: Record<string, any>
) => {
  const { data } = await http.get('/workload/excel-external', {
    params: query,
  })
  return data
}

export const downloadOneExcel5File = async (query: Record<string, any>) => {
  const { data } = await http.get('/workload/excel-5', {
    params: query,
  })
  return data
}
