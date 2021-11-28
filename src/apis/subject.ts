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

export const getManySubject = async () => {
  const { data } = await http.get<ISubject[]>('/subject')
  return data
}
