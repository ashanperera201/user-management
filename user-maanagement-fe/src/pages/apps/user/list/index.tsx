import { useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useDispatch, useSelector } from 'react-redux'


import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { fetchData } from 'src/redux/apps/user'
import { RootState, AppDispatch } from 'src/redux'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { deleteUser, setUserList } from '../../../../redux/apps/user/user-slice'
import { selectUserList } from '../../../../redux/apps/user/user-selector';
import { IUser } from 'src/@core/interfaces/user.interface'
import { getUserDetailsList, userDelete } from 'src/@core/services/user.service'
import toast from 'react-hot-toast'


interface UserRoleType {
  [key: string]: ReactElement
}

interface UserStatusType {
  [key: string]: ThemeColor
}

const userRoleObj: UserRoleType = {
  admin: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
  author: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
  editor: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
  maintainer: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />,
  subscriber: <AccountOutline sx={{ mr: 2, color: 'primary.main' }} />
}

interface CellType {
  row: any
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const renderClient = (row: any) => {
  if (row.profile && row.profile.length) {
    return (
      <CustomAvatar src={row.profile} sx={{ mr: 3, width: 34, height: 34 }} />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.fullName ? row.fullName : `${row.firstName} ${row.lastName}`)}
      </CustomAvatar>
    )
  }
}

const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}))

const RowOptions = ({ user, onEditHandler, onDeleteHandler }: { user: IUser, onEditHandler(user: IUser): void, onDeleteHandler(user: IUser): void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const onActionHandler = (isEdit: boolean, user: IUser): void => {
    setAnchorEl(null)
    if (isEdit) {
      onEditHandler(user);
    } else {
      onDeleteHandler(user);
    }
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={() => onActionHandler(true, user)}>
          <PencilOutline fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => onActionHandler(false, user)}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const UserList = (props: any) => {
  const { setUserList, userList, deleteUser } = props;
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const [selectedUsers, setSelectedUsers] = useState<any>([]);

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'fullName',
      headerName: 'User',
      renderCell: ({ row }: CellType) => {
        const { _id, firstName, lastName, fullName, userName } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {fullName}
              </Typography>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                @{userName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'role',
      minWidth: 150,
      headerName: 'Role',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.roles[0]?.roleCode ? row.roles[0]?.roleCode : ''}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.isActive ? 'Active' : 'In Active'}
            color={row.isActive ? 'success' : 'error'}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions user={row} onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} />
    }
  ];

  useEffect(() => {
    fetchUserDetails();
  }, [])

  const onEditHandler = (user: IUser): void => {
    setUser(user);
    setAddUserOpen(!addUserOpen);
  }

  const onDeleteHandler = async (user: IUser): Promise<void> => {
    // ON DELETION.
    const serviceResult = await userDelete([user._id]);
    if (serviceResult && serviceResult.data) {
      toast.success('Successfully deleted.');
      deleteUser(user);
    }
  }


  const fetchUserDetails = async () => {
    try {
      const { data } = (await getUserDetailsList())!.data;
      setUserList(data);

    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} selectedRecords={selectedUsers} />
          <DataGrid
            autoHeight
            rows={userList}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row._id}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            onSelectionModelChange={(newSelection: GridSelectionModel) => {
              console.log(newSelection);
              
              setSelectedUsers(newSelection);
            }}
          />
        </Card>
      </Grid>
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} fetchBack={fetchUserDetails} user={user} />
    </Grid>
  )
}

const mapStateToProps: any = createStructuredSelector({
  userList: selectUserList,
})

const mapDispatchToProps: any = (dispatch: any) => ({
  setUserList: (userList: IUser[]) => dispatch(setUserList(userList)),
  deleteUser: (user: IUser) => dispatch(deleteUser(user))
})

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(UserList);
