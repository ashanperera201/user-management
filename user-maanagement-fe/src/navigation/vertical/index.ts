import { VerticalNavItemsType } from 'src/@core/layouts/types'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import { CameraOutline } from 'mdi-material-ui'
import WifiChannelOutlinedIcon from '@mui/icons-material/WifiChannelOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import AddToHomeScreenOutlinedIcon from '@mui/icons-material/AddToHomeScreenOutlined'
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'User',
      icon: AccountOutline,
      children: [
        {
          title: 'List',
          path: '/apps/users'
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
