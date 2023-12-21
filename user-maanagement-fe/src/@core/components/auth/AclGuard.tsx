
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import type { ACLObj } from 'src/configs/acl'

// import { AbilityContext } from 'src/layouts/components/acl/Can'
// import { buildAbilityFor } from 'src/configs/acl'
// import NotAuthorized from 'src/pages/401'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import { useAuth } from 'src/hooks/useAuth'

interface AclGuardProps {
  children: ReactNode
  guestGuard: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { children, guestGuard } = props

  // const [ability, setAbility] = useState<AppAbility | undefined>(undefined)

  // ** Hooks
  // const auth = useAuth()
  const router = useRouter()

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>
  }

  // User is logged in, build ability for the user based on his role
  // if (auth.user && auth.user.roles && !ability) {
  //   setAbility(buildAbilityFor(auth.user.roles, aclAbilities.subject))
  // }

  // Check the access of current user and render pages
  // if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
  // return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  return <>{children}</>

  // }

  // Render Not Authorized component if the current user has limited access
  // return (
  //   <BlankLayout>
  //     <NotAuthorized />
  //   </BlankLayout>
  // )
}

export default AclGuard
