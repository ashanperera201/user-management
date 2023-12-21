
import { ReactNode } from 'react'

// ** Types
import { NavLink } from 'src/@core/layouts/types'

interface Props {
  navLink?: NavLink
  children: ReactNode
}

const CanViewNavLink = (props: Props) => {
  // ** Props
  const { children } = props

  // return ability && ability.can(navLink?.action, navLink?.subject) ? <>{children}</> : null
  return <>{children}</>;
}

export default CanViewNavLink
