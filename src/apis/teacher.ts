import { http } from 'libs/http'

export interface ITeacher {
  id: string
  name: string
  title: string
  executiveRole: string
  isActive: boolean
  isExternal: boolean
}

export const getManyTeacher = async (query?: Record<string, any>) => {
  const { data } = await http.get<ITeacher[]>('/teacher', {
    params: query,
  })
  return data
}
