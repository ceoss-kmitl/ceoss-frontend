import { AUTH_KEY, IProfile } from 'contexts/AuthContext'
import { http } from 'libs/http'
import { isEmpty } from 'lodash'

export interface ILoginResult {
  imageUrl: string
  email: string
  accessToken: string
}

export const googleLogin = async (code: string) => {
  const { data } = await http.post<ILoginResult>('/account/google-login', {
    code,
  })
  return data
}

export interface IRefreshResult {
  accessToken: string
}

export const googleRefresh = async () => {
  const auth = localStorage.getItem(AUTH_KEY) || '{}'
  const profile: IProfile = JSON.parse(auth)
  if (isEmpty(profile)) {
    return Promise.reject('Something went wrong!')
  }
  const { data } = await http.post<IRefreshResult>('/account/google-refresh', {
    email: profile.email,
    accessToken: profile.accessToken,
  })
  return data
}

export const googleLogout = async () => {
  const auth = localStorage.getItem(AUTH_KEY) || '{}'
  const profile: IProfile = JSON.parse(auth)

  await http.post('/account/google-logout', {
    email: profile.email || '',
    accessToken: profile.accessToken || '',
  })
}
