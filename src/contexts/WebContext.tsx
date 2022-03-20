import { createContext, useContext, useState } from 'react'

import { IWeb } from 'apis/web'

type IWebContext = {
  webList: IWeb[]
  updateWebList: (webList: IWeb[]) => void
}

const WebContext = createContext<IWebContext>({
  webList: [],
  updateWebList: () => {},
})

export const WebProvider: React.FC = ({ children }) => {
  const [webList, setWebList] = useState<IWeb[]>([])

  const updateWebList = (webList: IWeb[]) => {
    setWebList(webList)
  }

  return (
    <WebContext.Provider
      value={{
        webList,
        updateWebList,
      }}
    >
      {children}
    </WebContext.Provider>
  )
}

export const useWebContext = () => useContext(WebContext)
