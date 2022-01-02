import { Dayjs } from 'dayjs'
import qs from 'qs'

import { http } from 'libs/http'
import { Modify } from 'libs/utils'
import {
  DayOfWeek,
  Degree,
  IAcademicTime,
  WorkloadType,
} from 'constants/common'

// =============
// CRUD Endpoint
// =============

export interface ITeacher {
  id: string
  name: string
  title: string
  executiveRole: string
  isActive: boolean
  isExternal: boolean
}

export const getManyTeacher = async (query?: Partial<ITeacher>) => {
  const { data } = await http.get<ITeacher[]>('/teacher', {
    params: query,
  })
  return data
}

export const createOneTeacher = async (teacher: ITeacher) => {
  await http.post('/teacher', teacher)
}

export const editOneTeacher = async (teacher: ITeacher) => {
  const { id, ...payload } = teacher
  await http.put(`/teacher/${id}`, payload)
}

export const deleteOneTeacher = async (id: string) => {
  await http.delete(`/teacher/${id}`)
}

// ==================
// Teacher x Worklaod
// ==================

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

export const getManyWorkloadOfTeacher = async (
  teacherId: string,
  query?: IAcademicTime & { compensation?: boolean }
) => {
  const { data } = await http.get<IWorkloadOfTeacher[]>(
    `/teacher/${teacherId}/workload`,
    { params: query }
  )
  return data
}

// =============
// Teacher Excel
// =============

export const downloadOneExcelFile = async (
  teacherId: string,
  query: IAcademicTime
) => {
  const { data } = await http.get(`/teacher/${teacherId}/workload/excel`, {
    params: query,
  })
  return data
}

export const downloadOneExcelExternalFile = async (
  teacherId: string,
  query: Record<string, any>
) => {
  console.log('fasdfs', query)

  const { data } = await http.get(
    `/teacher-external/${teacherId}/workload/excel`,
    {
      params: query,
      paramsSerializer: qs.stringify,
    }
  )
  return data
}
