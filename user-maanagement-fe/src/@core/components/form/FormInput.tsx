import React from 'react'
import FormControl from '@mui/material/FormControl'
import { useForm, Controller, useFormContext } from 'react-hook-form'
import { FormHelperText, Grid, TextField } from '@mui/material';
import FormGrid from './FormGrid';

type PropsType = {
    name: string
    label: string
    type?: string
    placeholder? : string
    md? : number
}

export default function FormInput({name, label, placeholder, type = 'text', md}: PropsType) {
    const {control} = useFormContext()
    return (
        <FormGrid md={md}>
                <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange }, fieldState: {error} }) => {
                    return (
                    <>
                        <TextField
                            value={value}
                            type={type}
                            label={label}
                            placeholder={placeholder}
                            onChange={onChange}
                            error={Boolean(error)}                    
                        />
                        {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
                    </>
                    )
                }}
                />        
        </FormGrid>

  )
}
