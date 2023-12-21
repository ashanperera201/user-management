
import { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Close from 'mdi-material-ui/Close'
import { registerUserAsync, basicUserUpdate } from 'src/@core/services/user.service'

import { useDispatch } from 'react-redux'
import { IUser } from 'src/@core/interfaces/user.interface'
import { AppDispatch } from 'src/redux'
import { addUser, updateUser } from 'src/redux/apps/user/user-slice'

interface SidebarAddUserType {
  open?: boolean
  toggle: () => void
  fetchBack?: () => void
  addUserToState?: (user: IUser) => void;
  user?: any;
}

interface UserData {
  firstName: string,
  lastName: string,
  email: string
  company: string
  country: string
  contact: number
  fullName: string
  userName: string
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  email: yup.string().email().required(),
  userName: yup
    .string()
    .min(3, obj => showErrors('Username', obj.value.length, obj.min))
    .required(),
  contact: yup
    .number()
    .typeError('Contact Number field is required')
    .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
    .required(),
})



const SidebarAddUser = (props: SidebarAddUserType) => {

  const { open, toggle, user } = props;

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    contact: '',
  }

  const { reset, control, setValue, handleSubmit, formState: { errors }, } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(schema) })
  const [plan, setPlan] = useState<string>('basic')
  const [role, setRole] = useState<string>('subscriber')
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user) {
      setValue('firstName', user?.firstName ?? '');
      setValue('lastName', user?.lastName ?? '');
      setValue('contact', user?.contactNumber ?? '');
      setValue('email', user?.email ?? '');
      setValue('userName', user?.userName ?? '');
    }
  }, [user])



  const onSubmit = async (data: UserData) => {
    try {

      if (user) {
        // UPDATE
        const userUpdatePayload = {
          _id: user._id,
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          contactNumber: data.contact,
          email: data.email,
          createdDate: user.createdDate,
          createdBy: user.createdBy,
        }

        const updateResult = await basicUserUpdate(userUpdatePayload);
        if (updateResult && updateResult.data && updateResult.data.statusCode === 200) {
          toast.success('Successfully user updated.')
          toggle()
          reset()

          dispatch(updateUser({
            _id: user._id,
            userName: data.userName,
            fullName: data.firstName,
            firstName: data.lastName,
            lastName: data.lastName,
            email: data.email,
            secondaryEmail: '',
            profile: '',
            address: '',
            contactNumber: data.contact.toString(),
            countryCode: '',
            roles: [],
            isActive: user.isActive,
            createdDate: user.createdDate,
            createdBy: user.createdBy,
          }));
        }

      } else {
        // SAVE
        const userSavePayload = {
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          password: "default",
          email: data.email,
          secondaryEmail: "",
          contactNumber: data.contact,
          roles: [],
          isActive: true,
        }

        const serviceResult = await registerUserAsync(userSavePayload);
        if (serviceResult && serviceResult.data) {
          toast.success('Successfully user saved.')
          toggle()
          reset()
          dispatch(addUser(serviceResult.data.data));
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('contact', '')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='First Name'
                  onChange={onChange}
                  placeholder='First Name'
                  error={Boolean(errors.firstName)}
                />
              )}
            />
            {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Last Name'
                  onChange={onChange}
                  placeholder='Last Name'
                  error={Boolean(errors.lastName)}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='userName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='userName'
                  onChange={onChange}
                  error={Boolean(errors.userName)}
                />
              )}
            />
            {errors.userName && <FormHelperText sx={{ color: 'error.main' }}>{errors.userName.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  placeholder='Email'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='contact'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Contact'
                  onChange={onChange}
                  placeholder='Contact'
                  error={Boolean(errors.contact)}
                />
              )}
            />
            {errors.contact && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Select Role</InputLabel>
            <Select
              fullWidth
              value={role}
              id='select-role'
              label='Select Role'
              labelId='role-select'
              onChange={e => setRole(e.target.value)}
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='author'>Author</MenuItem>
              <MenuItem value='editor'>Editor</MenuItem>
              <MenuItem value='maintainer'>Maintainer</MenuItem>
              <MenuItem value='subscriber'>Subscriber</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              {
                user ? 'Update' : 'Submit'
              }
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser;
