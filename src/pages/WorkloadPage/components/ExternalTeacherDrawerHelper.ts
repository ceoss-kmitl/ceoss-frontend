import { useState } from 'react'

export function useDocumentDetail() {
  const [day, setDay] = useState<any[]>([])

  return { day, setDay }
}
