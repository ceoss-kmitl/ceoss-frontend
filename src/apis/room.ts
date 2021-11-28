import { http } from 'libs/http'

export interface IRoom {
  id: string
  name: string
  capacity: number
}

export const getManyRoom = async () => {
  const { data } = await http.get<IRoom[]>('/room')
  return data
}
