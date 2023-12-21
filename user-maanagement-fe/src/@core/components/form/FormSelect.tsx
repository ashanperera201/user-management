import React from 'react'
import FormControl from '@mui/material/FormControl'
import { useForm, Controller, useFormContext } from 'react-hook-form'
import { FormHelperText, InputLabel, MenuItem, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormGrid from './FormGrid';


type PropsType = {
    name: string
    label: string
    placeholder? : string
    options: any
    displayValue: string
    multiple?: boolean
    md? : number
}

export default function FormSelect({name, label, placeholder, options, displayValue, multiple = false, md}: PropsType) {
    const {control} = useFormContext()
    return (

    <>
        <FormGrid md={md}>
            <Controller
              name={name}
              control={control}
              render={({ field: { value, onChange }, fieldState: {error} }) => {
                return (

                <>
                  <InputLabel>{label}</InputLabel>
                  <Select
                  multiple={multiple}
                  value={multiple ? (value ? (value.map((item:any) => item._id ?? item)) : []) : value}
                  label={label}
                  onChange={onChange}
                  error={Boolean(error)}
                  >
                    {options.map((data: any) => (
                        <MenuItem key={data._id} value={data._id}>{data[displayValue]}</MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
                </>
                )
              }}
            />
        </FormGrid>

    </>

  )
}
