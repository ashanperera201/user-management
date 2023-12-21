// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { userDelete } from 'src/@core/services/user.service';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/redux'
import { deleteAllUsers } from 'src/redux/apps/user/user-slice';
import { useTheme } from '@mui/material/styles';
interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
  selectedRecords?: string[]
}

const TableHeader = (props: TableHeaderProps) => {
  const { handleFilter, toggle, value, selectedRecords } = props;
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>()

  const deleteSelectedUsers = async (): Promise<void> => {
    if (selectedRecords) {
      const serviceResult = await userDelete(selectedRecords);
      if (serviceResult && serviceResult.data) {
        toast.success('Successfully deleted.');
        dispatch(deleteAllUsers(selectedRecords));
      }
    }
  }

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant='h5'>
        User Details
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search User'
          onChange={e => handleFilter(e.target.value)}
        />

        <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          Add User
        </Button>
        {
          (selectedRecords && selectedRecords.length > 0) && (
            <Button sx={{ mb: 2, ml: 3 }} onClick={deleteSelectedUsers} variant='contained' color={'error'}>
              Delete Selected
            </Button>
          )
        }

      </Box>
    </Box>
  )
}

export default TableHeader
