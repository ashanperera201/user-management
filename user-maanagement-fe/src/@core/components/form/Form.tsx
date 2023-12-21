import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from './FormInput'
import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux'
import { IChannel } from 'src/@core/interfaces/channel.interface'
import { useSelector } from 'react-redux'
import { modalClose } from 'src/store/crud-slice'
import toast from 'react-hot-toast'
import Grid from '@mui/material/Grid'; 

export default function Form({defaultValues, schema, children, handleStore, handleUpdate}: any) {

    const crud = useSelector((state: RootState) => state.crud)
  
    useEffect(()=>{
        (crud.type == '') && reset()

        const data = crud.data
        // @ts-ignore
        for (let key in data) {
          // @ts-ignore
          setValue(key, data[key])
        }

        console.log('data', data)
  
    }, [crud])

    const methods = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
      
    const handleClose = () => {
        dispatch(modalClose())
    }

    const {reset, handleSubmit, setValue} = methods

    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = async (data: any) => {
        console.log('data', data)
        await dispatch((crud.type == 'edit') ? await handleUpdate(data) : handleStore(data))
        toast.success('Successfully Saved.')
        handleClose()
    }
      
    return (
        <FormProvider {...methods}>
            <Grid container spacing={2}>
                {children}
                <Grid item sm={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                        <Button type='reset' size='large' variant='outlined' color='secondary' onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button onClick={handleSubmit(onSubmit)} size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                        Submit
                        </Button>
                    </Box>

                </Grid>
            </Grid>

        </FormProvider>

    )
}
