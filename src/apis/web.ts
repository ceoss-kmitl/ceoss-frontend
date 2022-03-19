import { http } from 'libs/http'

export type IWeb = {
  id: string
  url: string
}

export type IUpsertWeb = {
  webList: IWeb[]
}

export const getManyWeb = async () => {
  const { data } = await http.get<IWeb[]>('/web')
  return data
}

export const upsertManyWeb = async (payload: IUpsertWeb) => {
  await http.put('/web', payload)
}
