import React from 'react';
import {Autocomplete, Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form';
import FormGrid from './FormGrid';



type PropsType = {
    children?: React.ReactNode
    name: string
    label: string
    md?: number
}


const FormCheckBox = ({ children, name, label, md } : PropsType) =>{
    const {control, setValue} = useFormContext()

    return (
        <FormGrid md={md}>

            <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: {error} }) => 
                (
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={value} 
                                onChange={onChange}
                            />
                        } 
                        label={label} 
                    />
                )
            }
            />
        </FormGrid>
     );
}


export default FormCheckBox
