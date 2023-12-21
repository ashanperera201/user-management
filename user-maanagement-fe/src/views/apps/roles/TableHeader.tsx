import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import ExportVariant from 'mdi-material-ui/ExportVariant'
import RoleFormView from './RoleFormView'
import { IRole } from 'src/@core/interfaces/role.interface'
import Typography from '@mui/material/Typography'

interface TableHeaderProps {
  plan: string
  value: string
  role?: IRole
  onClose(): void
  handleFilter: (val: string) => void
  handlePlanChange: (e: SelectChangeEvent) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { plan, handlePlanChange, handleFilter, value, role, onClose } = props

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (role) {
      setOpen(!open);
    }

    return () => {
      setOpen(false);
    }
  }, [role]);

  const closeHandler = (): void => {
    setOpen(!open);
    onClose();
  }

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant='h5'>
        User Roles
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search Role'
          sx={{ mr: 6, mb: 2 }}
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} onClick={() => setOpen(!open)} variant='contained'>
          Add Role
        </Button>
      </Box>
      <RoleFormView open={open} handleClose={closeHandler} role={role} />
    </Box>
  )
}

export default TableHeader
