
import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'

// ** Axios
// import axios from 'axios'

// ** Config
// import authConfig from 'src/configs/auth'
import { decodeJwtToken, onUserLoginAsync } from '../@core/services/auth.service';
import { registerUserAsync } from '../@core/services/user.service';
import { getUserAsync } from '../@core/services/user.service';

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true);
      setLoading(true)
      const accessToken = window.localStorage.getItem('access-token')!
      if (accessToken) {
        const tokenResult: any = decodeJwtToken(accessToken);
        if (tokenResult) {
          fetchUser(tokenResult?.userId)
        }
      } else {
        setLoading(false)
        handleLogout()
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const payload = {
      userEmail: params.email,
      password: params.password,
    }

    onUserLoginAsync(payload).then(serviceRes => {
      if (serviceRes) {
        const { data } = serviceRes?.data;
        localStorage.setItem('access-token', data?.accessToken);
        const tokenResult: any = decodeJwtToken(data?.accessToken);
        if (tokenResult) {
          fetchUser(tokenResult?.userId, errorCallback);
        }
      }
    }).catch((error: any) => {
      if (errorCallback) errorCallback(error?.response?.data?.errors);
    });
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('access-token')
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    registerUserAsync(params).then((serviceRes: any) => {
      if (serviceRes) {
        router.replace('/login');
      }
    }).catch((error: any) => {
      if (errorCallback) {
        errorCallback(error?.response?.data?.errors);
      }
    });
  }

  const fetchUser = (userId: string, errorCallback?: ErrCallbackType) => {
    getUserAsync(userId).then((userResult: any) => {
      if (userResult) {
        const { data } = userResult?.data;

        localStorage.setItem('userData', JSON.stringify(data))
        const returnUrl = router.query.returnUrl
        console.log(data)
        setUser({ ...data });
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        if (redirectURL) {
          router.replace(redirectURL as string)
        } else {
          router.replace('/dashboards');
        }
        setLoading(false);
      }
    }).catch((error: any) => {
      if (errorCallback) errorCallback(error?.response?.data?.errors);
      localStorage.removeItem('userData')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('access-token')
      setUser(null)
      setLoading(false)
    })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
