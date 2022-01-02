import { IAcademicTime } from 'constants/common'
import { http } from 'libs/http'

import { IWorkloadOfTeacher } from './workload'

export interface IRoom {
  id: string
  name: string
  capacity: number
}

export interface IAvailableRoom {
  roomId: string
  roomName: string
}

export const getManyWorkloadOfRoom = async (
  roomId: string,
  query?: IAcademicTime & { compensation?: boolean }
) => {
  const { data } = await http.get<IWorkloadOfTeacher[]>(
    `/room/${roomId}/workload`,
    {
      params: query,
    }
  )
  return data
}

export const getManyAvailableRoom = async (
  query: {
    compensatedDate: Date
    startTime: string
    endTime: string
  } & IAcademicTime
) => {
  const { data } = await http.get<IAvailableRoom[]>(
    '/room/available-workload',
    { params: query }
  )
  return data
}

export const createManyWorkloadOfRoom = async (
  roomId: string,
  payload: { workloadIdList: string[] }
) => {
  await http.post(`/room/${roomId}/workload`, payload)
}

export const deleteOneWorkloadOfRoom = async (
  roomId: string,
  workloadId: string
) => {
  await http.delete(`/room/${roomId}/workload/${workloadId}`)
}

export const triggerManyRoomAutoAssign = async (query: any) => {
  await http.get('/room/auto-assign', {
    params: query,
  })
}

export const triggerManyRoomResetAssign = async (query: any) => {
  await http.delete('/room/reset-assign', {
    params: query,
  })
}

export const downloadOneExcelFile = async (query: any) => {
  const { data } = await http.get('/room/excel', {
    params: query,
  })
  return data
}

// =============
// CRUD Endpoint
// =============

export const getManyRoom = async () => {
  const { data } = await http.get<IRoom[]>('/room')
  return data
}

export const createOneRoom = async (room: IRoom) => {
  await http.post('/room', room)
}

export const editOneRoom = async (room: IRoom) => {
  const { id, ...payload } = room
  await http.put(`/room/${id}`, payload)
}

export const deleteOneRoom = async (id: string) => {
  await http.delete(`/room/${id}`)
}
