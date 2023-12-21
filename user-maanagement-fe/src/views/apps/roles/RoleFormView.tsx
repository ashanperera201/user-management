import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/redux'

import { addUserRole, updateRole } from '../../../redux/apps/roles/role-slice'
import { saveRolesAsync, updateRoleAsync } from '../../../@core/services/role.service'
import { IRole } from 'src/@core/interfaces/role.interface'

const permissions = [
    'User Management',
    'Content Management',
    'Disputes Management',
    'Database Management',
    'Financial Management',
    'Reporting',
    'API Control',
    'Repository Management',
    'Payroll'
]

const RoleFormView = (props: any): JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const { open, handleClose, role } = props;
    const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')

    const defaultValues: any = {
        roleName: '',
        roleCode: '',
        roleDescription: ''
    }

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm(defaultValues)

    useEffect(() => {
        if (role) {
            setValue('roleName', role.roleName)
            setValue('roleCode', role.roleCode)
            setValue('roleDescription', role.description)
        }
    }, [role])

    const onSubmit = async (roleRef: any): Promise<void> => {
        if (role) {
            // UPDATE
            const roleRefClone: IRole = JSON.parse(JSON.stringify(role));
            roleRefClone.roleName = roleRef.roleName;
            roleRefClone.roleCode = roleRef.roleCode;
            roleRefClone.description = roleRef.roleDescription;

            try {
                const { data } = (await updateRoleAsync(roleRefClone))?.data;
                if (data) {
                    dispatch(updateRole(roleRefClone));
                    reset();
                    handleClose();
                    toast.success('Successfully updated.')
                }
            } catch (error: any) {
                toast.error(error.response.data.errors);
            }

        } else {
            // SAVE
            const savePayload = {
                roleName: roleRef.roleName,
                roleCode: roleRef.roleCode,
                description: roleRef.roleDescription,
                permissions: [],
                isActive: true,
                createdBy: "sys"
            }

            try {
                const { data } = (await saveRolesAsync(savePayload))?.data;
                if (data) {
                    dispatch(addUserRole(data));
                    reset();
                    handleClose();
                    toast.success('Successfully saved.')
                }
            } catch (error: any) {
                toast.error(error.response.data.errors);
            }
        }
    }

    return (
        <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <Typography variant='h4' component='span'>
                        {`${dialogTitle} Role`}
                    </Typography>
                    <Typography variant='body2'>Set Role Permissions</Typography>
                </DialogTitle>
                <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
                    <Box sx={{ my: 4 }}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <Controller
                                name='roleName'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        value={value}
                                        label='Role Name'
                                        onChange={onChange}
                                        error={Boolean(errors.roleName)}
                                        placeholder='Enter Role Name'
                                    />
                                )}
                            />
                            {errors.roleName && (
                                <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid role name</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <Controller
                                name='roleCode'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        value={value}
                                        label='Role Code'
                                        onChange={onChange}
                                        error={Boolean(errors.roleCode)}
                                        placeholder='Enter Role Code'
                                    />
                                )}
                            />
                            {errors.roleCode && (<FormHelperText sx={{ color: 'error.main' }}>Please enter a valid role code</FormHelperText>)}
                        </FormControl>
                        <FormControl fullWidth>
                            <Controller
                                name='roleDescription'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        value={value}
                                        label='Role Description'
                                        onChange={onChange}
                                        placeholder='Enter Role Description'
                                    />
                                )}
                            />
                        </FormControl>
                    </Box>
                    <Typography variant='h6'>Role Permissions</Typography>
                    <TableContainer>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: '0 !important' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                fontSize: '0.875rem',
                                                alignItems: 'center',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            Administrator Access
                                            <Tooltip placement='top' title='Allows a full access to the system'>
                                                <InformationOutline sx={{ ml: 1, fontSize: '1rem' }} />
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <FormControlLabel
                                            label='Select All'
                                            control={<Checkbox size='small' />}
                                            sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {permissions.map((i, index: number) => {
                                    return (
                                        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: 0 } }}>
                                            <TableCell sx={{ fontWeight: 600, color: theme => `${theme.palette.text.primary} !important` }}>
                                                {i}
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox size='small' />} label='Read' />
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox size='small' />} label='Write' />
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox size='small' />} label='Create' />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
                    <Box className='demo-space-x'>
                        <Button size='large' type='submit' variant='contained'>
                            {role ? 'Update' : 'Submit'}
                        </Button>
                        <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                            Discard
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default RoleFormView;