
import { useEffect, useCallback, useState, ReactElement, MouseEvent } from 'react'

import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CustomChip from 'src/@core/components/mui/chip'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import { fetchData } from 'src/redux/apps/user'
import { RootState, AppDispatch } from 'src/redux'
import { UsersType } from 'src/types/apps/userTypes'
import { ThemeColor } from 'src/@core/layouts/types'
import TableHeader from 'src/views/apps/roles/TableHeader'
import { connect } from 'react-redux'
import { IRole } from 'src/@core/interfaces/role.interface'
import { createStructuredSelector } from 'reselect'
import { deleteRole, setUserRoleList } from '../../../redux/apps/roles/role-slice'
import { selectRoleList } from '../../../redux/apps/roles/role-selector'
import { deleteRoleAsync, fetchRolesAsync } from 'src/@core/services/role.service'
import toast from 'react-hot-toast'


const RowOptions = (props: any) => {
  const { user, onEditHandler, onDeleteHandler } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const onActionHandler = (isEdit: boolean, role: any): void => {
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

const RoleTable = (props: any) => {
  const { roleList, setUserRoleList, deleteRole } = props;

  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [role, setRole] = useState<any>();

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'roleCode',
      headerName: 'Role Code',
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'roleName',
      headerName: 'Role Name',
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'description',
      headerName: 'Description',
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => <RowOptions user={row} onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler} />
    }
  ]

  useEffect(() => {
    fetchUserRole();
  }, []);

  const onEditHandler = (role: any): void => {
    setRole(role);
  }

  const onDeleteHandler = async (role: IRole): Promise<void> => {
    // ON DELETION.
    const serviceResult = await deleteRoleAsync([role._id]);
    if (serviceResult && serviceResult.data) {
      toast.success('Successfully deleted.');
      deleteRole(role);
    }
  }

  const fetchUserRole = async (): Promise<void> => {

    try {
      const roleResult = await fetchRolesAsync();
      const { data } = roleResult.data;
      setUserRoleList(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  const closeHandler = (): void => {
    setRole(null);
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} role={role} onClose={closeHandler} />
          <DataGrid
            autoHeight
            rows={roleList}
            columns={columns}
            pageSize={pageSize}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

const mapStateToProps: any = createStructuredSelector({
  roleList: selectRoleList,
})

const mapDispatchToProps: any = (dispatch: any) => ({
  setUserRoleList: (roleList: IRole[]) => dispatch(setUserRoleList(roleList)),
  deleteRole: (role: IRole) => dispatch(deleteRole(role))
})

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(RoleTable)
