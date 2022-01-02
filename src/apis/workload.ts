import { http } from 'libs/http'
import { DayOfWeek, IAcademicTime } from 'constants/common'

// =============
// CRUD Endpoint
// =============

export interface IWorkload {
  workloadId: string
  roomId?: string
  subjectCode: string
  subjectName: string
  section: number
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  teacherList: string[]
}

export const getManyWorkload = async (
  query: {
    room?: string
    subject?: string
    compensation?: boolean
  } & IAcademicTime
) => {
  const { data } = await http.get<IWorkload[]>('/workload', {
    params: query,
  })
  return data
}

export const createOneWorkload = async (payload: any) => {
  await http.post(`/workload`, payload)
}

export const editOneWorkload = async (id: string, payload: any) => {
  await http.put(`/workload/${id}`, payload)
}

export const deleteOneWorkload = async (id: string) => {
  await http.delete(`/workload/${id}`)
}

// =====================
// Workload Compensation
// =====================

export const createOneCompensationWorkload = async (
  workloadId: string,
  payload: any
) => {
  await http.post(`/workload/${workloadId}/compensation`, payload)
}

export const downloadOneExcelFile = async (query: Record<string, any>) => {
  const { data } = await http.get('/workload/excel', {
    params: query,
  })
  return data
}

// ==============
// Workload Excel
// ==============

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
