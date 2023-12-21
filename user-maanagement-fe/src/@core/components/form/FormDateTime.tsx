import React from 'react'
import FormControl from '@mui/material/FormControl'
import { useForm, Controller, useFormContext } from 'react-hook-form'
import { FormHelperText, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import FormGrid from './FormGrid';


type PropsType = {
    name: string
    label: string
    md?: number
}

export default function FormDateTime({name, label, md}: PropsType) {
    const {control} = useFormContext()
    return (
    <FormGrid md={md}>
        <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: {error} }) => {
            return (
            <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                label={label}
                value={value || null}
                onChange={onChange}
                inputFormat="DD/MM/YYYY HH:mm"
                renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </>
            )
        }}
        />
        
    </FormGrid>


  )
}
