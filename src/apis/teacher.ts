import { http } from 'libs/http'

export interface ITeacher {
  id: string
  name: string
  title: string
  executiveRole: string
  isActive: boolean
  isExternal: boolean
}

// =============
// CRUD Endpoint
// =============

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
