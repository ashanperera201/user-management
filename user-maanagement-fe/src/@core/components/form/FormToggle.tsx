import React from 'react';
import {Autocomplete, Box, FormControl, Grid, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form';
import FormGrid from './FormGrid';




const FormToggle = ({ children, name, xs = 12, md, options, ...props } : any) =>{
    const {control, setValue} = useFormContext()
    const handleChange = (e: any, value: any) => {   
        setValue(name, value == 'active' ? true : false)
    }
    return (
        <FormGrid md={md}>
            <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: {error} }) => 
                (
                    <>
                        <ToggleButtonGroup
                        size='small'
                        value={value == true ? 'active' : 'inactive'}
                        exclusive
                        onChange={handleChange}
                        >
                        <ToggleButton value='active' aria-label="active">
                        Active
                        </ToggleButton>
                        <ToggleButton value='inactive' aria-label="inactive">
                        Inactive
                        </ToggleButton>
                        </ToggleButtonGroup>
                    </>
                )
            }
            />
        </FormGrid>

     );
}


export default FormToggle
