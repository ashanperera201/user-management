import React, { useContext, useEffect } from 'react'

import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

import Close from 'mdi-material-ui/Close'

import {useDispatch, useSelector} from 'react-redux'

import {AppDispatch, RootState} from 'src/redux'

import { modalClose } from 'src/store/crud-slice'
import { FormTypeContext } from 'src/@core/context/FormTypeContext'


export default function FormDrawer({children, title}: any) {
    const store = useSelector((state: RootState) => state.crud)

    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => {
        dispatch(modalClose())
      }

    const Header = styled(Box)<BoxProps>(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3, 4),
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.default
    }))


    const {setType} = useContext(FormTypeContext)
    useEffect(() => {
      setType('drawer')
    }, [])
  
    
    return (
        <Drawer
            open={store.type == '' ? false: true}
            anchor='right'
            variant='temporary'
            onClose={handleClose}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
        >
            <Header>
            <Typography variant='h6'>{title}</Typography>
            <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
            </Header>
            <Box sx={{ p: 5 }}>
                {children}
            </Box>
        </Drawer>

    )
}
