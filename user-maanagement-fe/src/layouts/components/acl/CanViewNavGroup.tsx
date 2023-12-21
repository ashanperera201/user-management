
import { ReactNode } from 'react'
import { NavGroup } from 'src/@core/layouts/types'

interface Props {
  navGroup?: NavGroup
  children: ReactNode
}

const CanViewNavGroup = (props: Props) => {
  // ** Props
  const { children } = props

  // ** Hook
  // const ability = useContext(AbilityContext)

  // const checkForVisibleChild = (arr: NavLink[] | NavGroup[]): boolean => {
  //   return arr.some((i: NavGroup) => {
  //     if (i.children) {
  //       return checkForVisibleChild(i.children)
  //     } else {
  //       return ability?.can(i.action, i.subject)
  //     }
  //   })
  // }

  // return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null
  return <>{children}</>
}

export default CanViewNavGroup
