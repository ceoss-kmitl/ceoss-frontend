import { Dayjs } from 'dayjs'

import { http } from 'libs/http'
import { Modify } from 'libs/utils'
import {
  DayOfWeek,
  Degree,
  IAcademicTime,
  WorkloadType,
} from 'constants/common'

export interface IRawWorkloadOfTeacher {
  id: string
  subjectId: string
  roomId?: string
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
}

export type IRawWorkloadOfTeacherWithDayjs = Modify<
  IRawWorkloadOfTeacher,
  { timeList: Dayjs[][] }
>

export interface IWorkloadOfTeacher {
  workloadList: IRawWorkloadOfTeacher[]
}

export type IWorkloadOfTeacherWithDayjs = Modify<
  IWorkloadOfTeacher,
  { workloadList: IRawWorkloadOfTeacherWithDayjs[] }
>

export interface IWorkload {
  workloadId: string
  subjectCode: string
  subjectName: string
  section: number
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  teacherList: string[]
}

// =============
// CRUD Endpoint
// =============

export const getManyWorkload = async (
  query: { room?: string } & IAcademicTime
) => {
  const { data } = await http.get<IWorkload[]>('/workload', {
    params: query,
  })
  return data
}

export const createOneWorkload = async (payload: any) => {
  await http.post(`/workload`, payload)
}

export const getManyWorkloadOfTeacher = async (
  teacherId: string,
  query?: IAcademicTime
) => {
  const { data } = await http.get<IWorkloadOfTeacher[]>(
    `/teacher/${teacherId}/workload`,
    {
      params: query,
    }
  )
  return data
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
  payload: any,
  query: Record<string, any>
) => {
  const { data } = await http.post('/workload/excel-external', payload, {
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
