import React, { useContext } from 'react'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import { useForm, Controller } from 'react-hook-form'
import { savePermissionAsync, updatePermissionAsync } from '../../../@core/services/permission.service'
import { addPermission, updatePermission } from '../../../redux/apps/permissions/permission-slice';

import toast from 'react-hot-toast'

import {useDispatch, useSelector} from 'react-redux'

import {AppDispatch, RootState} from 'src/redux'

import { modalClose } from 'src/store/crud-slice'
import FormTypeContextProvider, { FormTypeContext } from 'src/@core/context/FormTypeContext'



export default function FormDialog({children, title}: any) {
    const store = useSelector((state: RootState) => state.crud)

    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => {
        dispatch(modalClose())
      }

      const {setType} = useContext(FormTypeContext)
      useEffect(() => {
        setType('dialog')
      }, [])


  return (
        <Dialog 
            fullWidth 
            maxWidth='md' 
            onClose={handleClose}
            open={store.type == '' ? false: true}
        >
            <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
                <Typography variant='h4' component='span' sx={{ mb: 2 }}>
                    {title}
                </Typography>
                {/* <Typography variant='body2'>Permissions you may use and assign to your users.</Typography> */}
            </DialogTitle>
            <DialogContent 
                sx={{ pb: 12, mx: 'auto' }}
            >
                <Box sx={{mt: 4}}>
                   {children}
                </Box>
            </DialogContent>
        </Dialog>

  )
}
