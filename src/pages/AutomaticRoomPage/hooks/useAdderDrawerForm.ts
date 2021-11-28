import { useState } from 'react'

export const useAdderDrawerForm = () => {
  const [isOpenAdder, setIsOpenAdder] = useState(false)

  const openAdderDrawer = () => {
    setIsOpenAdder(true)
  }

  const closeAdderDrawer = () => {
    setIsOpenAdder(false)
  }

  return {
    isOpenAdder,
    openAdderDrawer,
    closeAdderDrawer,
  }
}
