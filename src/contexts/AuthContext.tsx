import { createContext, useContext, useState, useEffect } from 'react'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { OAuth2Client } from 'google-auth-library'

import { http } from 'libs/http'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

const oAuth2 = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
})

export interface IProfile {
  email: string
  name: string
  imageUrl: string
  accessToken: string
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

export const AUTH_KEY = 'auth'

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IProfile | null>(null)

  const { signIn, loaded } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    cookiePolicy: 'single_host_origin',
    onSuccess: (res) => {
      if ('profileObj' in res) {
        const { profileObj, accessToken } = res
        const profile = {
          name: profileObj.name,
          email: profileObj.email,
          imageUrl: profileObj.imageUrl,
          accessToken,
        }
        localStorage.setItem(AUTH_KEY, JSON.stringify(profile))
        setData(profile)
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
    isSignedIn: false,
    autoLoad: false,
  })

  const { signOut } = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess: async () => {
      try {
        await http.post('/account/signout')
        localStorage.removeItem(AUTH_KEY)
        setData(null)
      } catch (error) {
        Notification.error({
          message: ErrorCode.U00,
          seeMore: error,
        })
      }
    },
    onFailure: () => {
      Notification.error({
        message: ErrorCode.U01,
      })
    },
  })

  const checkAccessToken = async (profile: IProfile) => {
    if (!profile) return

    try {
      await oAuth2.getTokenInfo(profile?.accessToken || '')
      setData(profile)
    } catch (error) {
      Notification.error({
        message: ErrorCode.U03,
        seeMore: error,
      })
      localStorage.removeItem(AUTH_KEY)
      setData(null)
    }
  }

  // Load data from local storage
  useEffect(() => {
    if (loaded) {
      const auth = localStorage.getItem(AUTH_KEY) || '{}'
      const profile: IProfile = JSON.parse(auth)
      if (profile.accessToken) {
        checkAccessToken(profile)
      }
    }
  }, [loaded])

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
