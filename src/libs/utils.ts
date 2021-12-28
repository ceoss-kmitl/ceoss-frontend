import { saveAs } from 'file-saver'

export function isNull(target: any) {
  return target === null
}

export const saveFile = (data: any) => {
  const bufferArray = [new Uint8Array(data.buffer).buffer]
  const blob = new Blob(bufferArray, { type: data.fileType })
  saveAs(blob, data.fileName)
}

export type Modify<T, R> = Omit<T, keyof R> & R
