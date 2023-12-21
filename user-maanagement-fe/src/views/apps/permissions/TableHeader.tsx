
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
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'
import { AppDispatch } from 'src/redux'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
  permission?: any
  onModalClose?: any
}

const TableHeader = (props: TableHeaderProps) => {
  const { value, handleFilter, permission, onModalClose } = props
  const [open, setOpen] = useState<boolean>(false)

  const { control, setValue, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: { permissionName: '', permissionCode: '', description: '' } });

  useEffect(() => {
    if (permission) {
      setOpen(!open);
      setValue('permissionName', permission.permissionName)
      setValue('permissionCode', permission.permissionCode)
      setValue('description', permission.description)
    }

    return () => {
      setOpen(false);
    }
  }, [permission])

  const dispatch = useDispatch<AppDispatch>();

  const handleDialogToggle = () => {
    setOpen(!open)

    if (permission) {
      onModalClose();
    }
  }

  const onSubmit = async (permissionPayload: any): Promise<void> => {

    if (permission) {
      const permissionRef = JSON.parse(JSON.stringify(permission));
      permissionRef.permissionCode = permissionPayload.permissionCode;
      permissionRef.permissionName = permissionPayload.permissionName;
      permissionRef.description = permissionPayload.description;

      try {
        const updatedResponse = (await updatePermissionAsync(permissionRef)).data
        if (updatedResponse && updatedResponse.data) {
          dispatch(updatePermission(permissionRef));
          setOpen(false);
          reset();
          toast.success('Successfully updated.');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const payload = {
        permissionCode: permissionPayload.permissionCode,
        permissionName: permissionPayload.permissionName,
        description: permissionPayload.description,
        isActive: true,
        createdBy: "system"
      }

      try {
        const savedResponse = (await savePermissionAsync(payload)).data;
        if (savedResponse && savedResponse.data) {
          dispatch(addPermission(savedResponse.data));
          setOpen(false);
          reset();
          toast.success('Successfully saved.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2.5 }}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2.5 }} variant='contained' onClick={handleDialogToggle}>
          Add Permission
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h4' component='span' sx={{ mb: 2 }}>
            Add New Permission
          </Typography>
          <Typography variant='body2'>Permissions you may use and assign to your users.</Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 12, mx: 'auto' }}>
          <Box component='form' sx={{ mt: 4 }} onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{ mb: 3 }}>
              <Controller
                name='permissionName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label='Permission Name'
                    onChange={onChange}
                    error={Boolean(errors.permissionName)}
                    placeholder='Enter Permission Name'
                  />
                )}
              />
              {errors.permissionName && (
                <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid permission name</FormHelperText>
              )}
            </FormGroup>
            <FormGroup sx={{ mb: 3 }}>
              <Controller
                name='permissionCode'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label='Permission Name'
                    onChange={onChange}
                    error={Boolean(errors.permissionCode)}
                    placeholder='Enter Permission Code'
                  />
                )}
              />
              {errors.permissionCode && (
                <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid permission code</FormHelperText>
              )}
            </FormGroup>
            <FormGroup>
              <Controller
                name='description'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label='Description'
                    onChange={onChange}
                    placeholder='Enter Permission Description'
                  />
                )}
              />
            </FormGroup>
            <Box className='demo-space-x' sx={{ '&>:last-child': { mr: 0 } }}>
              <Button size='large' type='submit' variant='contained'>
                Create Permission
              </Button>
              <Button size='large' variant='outlined' color='secondary' onClick={handleDialogToggle}>
                Discard
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
