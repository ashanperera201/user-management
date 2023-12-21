import { FormControl, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { FormTypeContext } from 'src/@core/context/FormTypeContext'
FormControl

type PropsType = {
  children: React.ReactNode
  md? : number
}


export default function FormGrid({children, md}: PropsType) {
  const {type} = useContext(FormTypeContext)
  console.log('type', type)

  return (
    <Grid item sm={12} md={md ?? (type == 'dialog' ? 6 : 12)} spacing={2}>
        <FormControl fullWidth sx={{ mb: 3 }}>
            {children}
        </FormControl>
    </Grid>

  )
}
