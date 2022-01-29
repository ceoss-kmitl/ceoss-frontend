import { createContext, useContext, useState, useEffect } from 'react'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'

import { Notification } from 'components/Notification'

interface IProfile {
  email: string
  name: string
  imageUrl: string
  googleTokenId: string
}

interface IAuthContext {
  profile: IProfile | null
  signInGoogle: () => void
  signOutGoogle: () => void
}

const AuthContext = createContext<IAuthContext>({
  profile: null,
  signInGoogle: () => {},
  signOutGoogle: () => {},
})

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IProfile | null>(null)

  const { signIn } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    cookiePolicy: 'single_host_origin',
    onSuccess: (res) => {
      if ('profileObj' in res) {
        const { profileObj, tokenId } = res
        setData({
          name: profileObj.name,
          email: profileObj.email,
          imageUrl: profileObj.imageUrl,
          googleTokenId: tokenId,
        })
      }
    },
    onFailure: (error) =>
      Notification.error({
        message: 'ลงชื่อเข้าใช้ไม่สำเร็จ',
        seeMore: error,
      }),
    isSignedIn: true,
  })

  const { signOut } = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {
      setData(null)
    },
    onFailure: () => {
      Notification.error({
        message: 'ออกจากระบบไม่สำเร็จ',
      })
    },
  })

  // Load data from local storage
  useEffect(() => {
    const auth = localStorage.getItem('auth') || ''
    const parsedAuth = JSON.parse(auth) || null
    setData(parsedAuth)
  }, [])

  // Save data to local storage
  useEffect(() => {
    const stringAuth = JSON.stringify(data)
    localStorage.setItem('auth', stringAuth)
  }, [data])

  return (
    <AuthContext.Provider
      value={{
        profile: data,
        signInGoogle: signIn,
        signOutGoogle: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
