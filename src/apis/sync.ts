import { http } from 'libs/http'

interface ISyncResult {
  syncCount: number
  result: any[]
}

export const syncTeacher = async (payload: Record<string, string>[]) => {
  const { data } = await http.post<ISyncResult>('/sync/teacher', {
    data: payload,
  })
  return data
}

export const syncSubject = async (payload: Record<string, string>[]) => {
  const { data } = await http.post<ISyncResult>('/sync/subject', {
    data: payload,
  })
  return data
}

export const syncRoom = async (payload: Record<string, string>[]) => {
  const { data } = await http.post<ISyncResult>('/sync/room', {
    data: payload,
  })
  return data
}
