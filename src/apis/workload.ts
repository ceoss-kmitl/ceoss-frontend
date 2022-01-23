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

// ====================
// Workload x Assistant
// ====================

export interface IEditAssistantListPayload {
  assistantList: {
    assistantId: string
    assistantName: string
    dayList: string[]
  }[]
  workloadIdList: string[]
}

export const editManyAssistantWorkload = async (
  payload: IEditAssistantListPayload
) => {
  await http.put('/workload/assistant', payload)
}
