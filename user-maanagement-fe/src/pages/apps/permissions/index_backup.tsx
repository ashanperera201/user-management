import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import { connect } from 'react-redux'
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/apps/permissions/TableHeader'
import { createStructuredSelector } from 'reselect'
import { selectPermissionList } from '../../../redux/apps/permissions/permission-selector'
import { setPermissionList, deletePermission } from '../../../redux/apps/permissions/permission-slice'
import { IPermission } from 'src/@core/interfaces/permission.interface'
import { fetchPermissionsAsync, deletePermissionAsync } from 'src/@core/services/permission.service'
import toast from 'react-hot-toast'


const PermissionsTable = (props: any) => {

  const { setPermissionList, permissionList, deletePermission } = props;

  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [permission, setPermission] = useState<IPermission | null>();

  useEffect(() => {
    fetchPermissions();
  }, [])

  const fetchPermissions = async (): Promise<void> => {
    try {
      const { data } = (await fetchPermissionsAsync()).data;
      if (data) {
        setPermissionList(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])


  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'permissionCode',
      headerName: 'Permission Code',
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'permissionName',
      headerName: 'Permission Name',
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
      renderCell: (row: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => onEditHandler(row)}>
            <PencilOutline />
          </IconButton>
          <IconButton onClick={() => onDeleteHandler(row)}>
            <DeleteOutline />
          </IconButton>
        </Box>
      )
    }
  ]

  const onEditHandler = (payload: any): void => {
    const { row } = payload;
    setPermission(row)
  }

  const onDeleteHandler = async (payload: any): Promise<void> => {
    const { row } = payload;

    const serviceResult: any = await deletePermissionAsync([row._id]);
    if (serviceResult && serviceResult.data) {
      toast.success('Successfully deleted.');
      deletePermission(row);
    }
  }

  const onModalClose = (): void => {
    setPermission(null);
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Permissions List</Typography>}
            subtitle={
              <Typography variant='body2'>
                Each category (Basic, Professional, and Business) includes the four predefined roles shown below.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} permission={permission} onModalClose={onModalClose} />
            <DataGrid
              autoHeight
              rows={permissionList}
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
    </>
  )
}


const mapStateToProps: any = createStructuredSelector({
  permissionList: selectPermissionList,
})

const mapDispatchToProps: any = (dispatch: any) => ({
  setPermissionList: (permissionList: IPermission[]) => dispatch(setPermissionList(permissionList)),
  deletePermission: (user: IPermission) => dispatch(deletePermission(user))
})


export default connect<any, any>(mapStateToProps, mapDispatchToProps)(PermissionsTable)
