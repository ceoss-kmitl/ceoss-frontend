import { DayOfWeek, DocumentPattern, IAcademicTime } from 'constants/common'
import { http } from 'libs/http'

// =============
// CRUD Endpoint
// =============

export interface ISubject {
  id: string
  code: string
  name: string
  isRequired: boolean
  credit: number
  lectureHours: number
  labHours: number
  independentHours: number
  curriculumCode: string
  isInter: boolean
}

export const getManySubject = async () => {
  const { data } = await http.get<ISubject[]>('/subject')
  return data
}

export const createOneSubject = async (subject: ISubject) => {
  await http.post('/subject', subject)
}

export const editOneSubject = async (subject: ISubject) => {
  const { id, ...payload } = subject
  await http.put(`/subject/${id}`, payload)
}

export const deleteOneSubject = async (id: string) => {
  await http.delete(`/subject/${id}`)
}

// ==================
// Subject x Workload
// ==================

export interface ICompensated {
  section: number
  compensatedList: {
    compensatedId: string
    originalDate: string
    originalTimeList: { start: string; end: string }[]
    compensatedDate: string
    compensatedTimeList: { start: string; end: string }[]
    originalRoom: string
    compensatedRoom: string
  }[]
}

export const getManyCompensatedOfSubject = async (
  subjectId: string,
  query: any
) => {
  const { data } = await http.get<ICompensated[]>(
    `/subject/${subjectId}/compensation-workload`,
    {
      params: query,
    }
  )
  return data
}

// =================
// Subject x Section
// =================

export interface ISection {
  section: number
  datetime: {
    dayOfWeek: DayOfWeek
    timeList: string[]
  }
  workloadIdList: string[]
  dayList: string[]
  assistantList: {
    id: string
    name: string
  }[]
  teacherList: {
    id: string
    name: string
  }[]
}

export const getManySectionOfSubject = async (
  id: string,
  query: IAcademicTime
) => {
  const { data } = await http.get<ISection[]>(`/subject/${id}/section`, {
    params: query,
  })
  return data
}

// =======================
// Subject assistant excel
// =======================

export const downloadOneAssistantExcelFile = async (
  subjectId: string,
  section: number,
  query: IAcademicTime & {
    documentDate: string
    documentPattern: DocumentPattern
    approvalNumber: string
    approvalDate: string
    teacherId: string
  }
) => {
  const { data } = await http.get(
    `/subject/${subjectId}/section/${section}/assistant/excel`,
    {
      params: query,
    }
  )
  return data
}
