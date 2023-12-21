import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'

export const CellBasic = ({data} : any) => {
    return (
        <Typography noWrap variant='body2'>
          {data}
        </Typography>
      )
}

export const CellPrimary = ({data} : any) => {
  return (
    <Typography
      noWrap
      sx={{ color: 'text.primary', textDecoration: 'none' }}
    >
      {data}
    </Typography>
  )
}

export const CellMultyRow = ({link, id, primary, secondary}: any) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
      <Link href={`${link}/${id}`} passHref>
        <Typography
          noWrap
          component='a'
          variant='subtitle2'
          sx={{ color: 'text.primary', textDecoration: 'none' }}
        >
          {primary}
        </Typography>
      </Link>
      <Link href={`${link}/${id}`} passHref>
        <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
          {secondary}
        </Typography>
      </Link>
    </Box>
  </Box>
)



export const CellUserName = ({row} : any) => {


  const renderClient = (row: any) => {
    if (row.profile && row.profile.length) {
      return (
        <CustomAvatar src={row.profile} sx={{ mr: 3, width: 34, height: 34 }} />
      )
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
        >
          {getInitials(row.fullName ? row.fullName : `${row.firstName} ${row.lastName}`)}
        </CustomAvatar>
      )
    }
  }
  



  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {renderClient(row)}
    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
      <Typography
        noWrap
        component='a'
        variant='subtitle2'
        sx={{ color: 'text.primary', textDecoration: 'none' }}
      >
        {row.fullName}
      </Typography>
      <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
        @{row.userName}
      </Typography>
    </Box>
  </Box>

  )
}

