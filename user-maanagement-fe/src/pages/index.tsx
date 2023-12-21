import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'

export const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl'
  else return '/dashboards'
}

const Home = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user && auth.user.roles && auth.user.roles.length > 0) {
      // TODO : CHANGE THIS LATER.
      // const homeRoute = getHomeRoute(auth.user.role)
      router.replace('/dashboards')
    }
  }, [])

  return <Spinner />
}

export default Home
