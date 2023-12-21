import React, { useEffect, useState } from 'react';
import {Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { Controller, useFormContext, useForm, useFormState } from 'react-hook-form';
import httpApiKit, { baseUrl } from 'src/@core/helpers/axios-http-kit';
import { DeleteCircleOutline, Trumpet } from 'mdi-material-ui';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux';
import Link from 'next/link';

import Image from 'next/image';
import FormGrid from './FormGrid';



const FormFile = ({ children, name, label, md} : any) =>{
    const {control, setValue, getValues} = useFormContext()

    const [images, setImages] = useState<any>([])

    const store: any = useSelector((state: RootState) => state.crud)

    useEffect(()=>{
        console.log('store reset')
        setImages((store.type == 'edit') ? [...((store.data)[name])]: [])
    }, [store])

    const handleChange = async (e: any) => {
        let files = e.target.files
        if(files.length > 0){
            const newImages: any[] = []
            for (const key of Object.keys(files)) {
                const file = files[key]
                const formData = new FormData();
                const fileName = `${file.name.split('.').slice(0, -1).join('.')}-${Date.now()}`
                const ext = file.name.split('.').pop()

                formData.append('fileName', fileName);
                formData.append('title', fileName);
                formData.append('fileUploadPath', 'event');
                formData.append('createdBy', 'createdBy');
                formData.append('file', file, `${fileName}.${ext}`);
    
        
                httpApiKit.post('/api/file-upload/save', formData).then(response => {      
                    newImages.push(response.data.data._id)
                    console.log('name', name)
                    setImages([...images, ...newImages])
                    setValue(name, [...images, ...newImages])        
                });
            }


        }
    }

    const handleDelete = async (id: string) => {
        images.splice(images.indexOf(id), 1)
        setValue(name, [...images])        
        setImages([...images])
    }

    return (
        <>
        <FormGrid md={md}>
            <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: {error} }) => 
                (
                    <>
                        <Button
                            size='large'
                            variant="outlined"
                            component="label"
                        >
                            {label}
                            <input
                                multiple
                                type="file"
                                hidden
                                onChange={handleChange}
                                />
                        </Button>                        
                        {error && <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>}
                    </>
                )   
            }
            />
        </FormGrid>
        {images && (
                    <ImageList cols={4}>
                        {images.map((image: string) => (
                            <ImageListItem 
                            key={image}>
                            <img
                                src={`${baseUrl}/api/file-upload/${image}`}
                                srcSet={`${baseUrl}/api/file-upload/${image}`}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                actionIcon={
                                    <IconButton
                                        onClick={()=> handleDelete(image)}
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)', padding: '5px'}}
                                    >
                                        <DeleteCircleOutline />
                                    </IconButton>
                                }
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>

            )}


        </>

     );
}


export default FormFile
