import { createContext, useContext, useState, useEffect } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { isEmpty } from 'lodash'

import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'
import { googleLogin, googleLogout } from 'apis/auth'

export interface IProfile {
  email: string
  imageUrl: string
  accessToken: string
}

interface IAuthContext {
  profile: IProfile | null
  signInGoogle: () => void
  signOutGoogle: () => void
  isLoaded: boolean
}

const AuthContext = createContext<IAuthContext>({
  profile: null,
  signInGoogle: () => {},
  signOutGoogle: () => {},
  isLoaded: false,
})

export const AUTH_KEY = 'CEOSS_AUTH'

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IProfile | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    cookiePolicy: 'single_host_origin',
    accessType: 'offline',
    responseType: 'code',
    isSignedIn: false,
    autoLoad: false,
    onSuccess: async (res) => {
      if ('code' in res) {
        const { code = '' } = res
        try {
          const profile = await googleLogin(code)
          localStorage.setItem(AUTH_KEY, JSON.stringify(profile))
          setData(profile)
        } catch (error) {
          Notification.error({
            message: 'เกิดข้อผิดพลาดขณะลงชื่อเข้าใช้งาน',
          })
        }
      }
    },
    onFailure: (error) => {
      Notification.error({
        message: ErrorCode.U02,
        seeMore: error,
      })
      setData(null)
      localStorage.removeItem(AUTH_KEY)
    },
  })

  const customSignOut = async () => {
    try {
      await googleLogout()
      localStorage.removeItem(AUTH_KEY)
      setData(null)
    } catch (error) {
      console.error(error)
    }
  }

  // Load data from local storage
  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY) || '{}'
    const profile: IProfile = JSON.parse(auth)
    setData(isEmpty(profile) ? null : profile)
    setIsLoaded(true)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        profile: data,
        signInGoogle: signIn,
        signOutGoogle: customSignOut,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
