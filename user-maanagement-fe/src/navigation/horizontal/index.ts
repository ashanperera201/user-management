// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOutline from 'mdi-material-ui/LockOutline'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'User',
      icon: AccountOutline,
      children: [
        {
          title: 'List',
          path: '/apps/user/list'
        }
      ]
    },
    {
      title: 'Roles & Permissions',
      icon: LockOutline,
      children: [
        {
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: '/apps/permissions'
        }
      ]
    } 
  ]
}

export default navigation
