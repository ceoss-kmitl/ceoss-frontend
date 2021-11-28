import { http } from 'libs/http'

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

export interface ICompensated {
  section: number
  compensatedList: {
    compensatedId: string
    originalDate: string
    originalTimeList: { start: string; end: string }[]
    compensatedDate: string
    compensatedTimeList: { start: string; end: string }[]
    room: string
  }[]
}

export const getManySubject = async () => {
  const { data } = await http.get<ISubject[]>('/subject')
  return data
}

export const getManyCompensatedOfSubject = async (
  subjectId: string,
  query: any
) => {
  const { data } = await http.get<ICompensated[]>(
    `/subject/${subjectId}/compensated`,
    {
      params: query,
    }
  )
  return data
}

export const createOneCompensatedOfSubject = async (
  subjectId: string,
  payload: any
) => {
  await http.post(`/subject/${subjectId}/compensated`, payload)
}

export const deleteOneCompensated = async (compensatedId: string) => {
  await http.delete(`/subject/compensated/${compensatedId}`)
}
