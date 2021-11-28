import { useState } from 'react'

export const useExtDrawerForm = () => {
  const [isOpenExt, setIsOpenExt] = useState(false)

  const openExtDrawer = () => {
    setIsOpenExt(true)
  }

  const closeExtDrawer = () => {
    setIsOpenExt(false)
  }

  return {
    isOpenExt,
    openExtDrawer,
    closeExtDrawer,
  }
}
