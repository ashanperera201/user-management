// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { userDelete } from 'src/@core/services/user.service';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/redux'
import { deleteAllUsers } from 'src/redux/apps/user/user-slice';
import { useTheme } from '@mui/material/styles';
import { modalCreate } from 'src/store/crud-slice';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { useCallback, useState } from 'react';
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import PageHeader from '../page-header';


interface TableHeaderProps {
  title: string
  rows: any
  columns: any
  drawer: any
  handleDelete: any
}

const FormTable = (props: TableHeaderProps) => {
  const { title, rows, columns, drawer, handleDelete } = props;
  
  const dispatch = useDispatch<AppDispatch>()

  const deleteSelectedRecords = async (): Promise<void> => {
    if (selectedRecords) {
      toast.success('Successfully deleted.');
      dispatch(handleDelete(selectedRecords));
    }
  }

  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [value, setValue] = useState<string>('')

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  return (
    <Grid container spacing={6}>
        {/* <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Permissions List</Typography>}
            subtitle={
              <Typography variant='body2'>
                Each category (Basic, Professional, and Business) includes the four predefined roles shown below.
              </Typography>
            }
          />
        </Grid> */}

      <Grid item xs={12}>
        <Card>
            <>
              <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h5'>
                  {title} Details
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField
                    size='small'
                    value={value}
                    sx={{ mr: 6, mb: 2 }}
                    placeholder={`Search ${title}`}
                    onChange={e => handleFilter(e.target.value)}
                  />

                  <Button sx={{ mb: 2 }} onClick={
                    ()=>{
                      dispatch(modalCreate())
                    }
                    } variant='contained'>
                    Add {title}
                  </Button>
                  {
                    (selectedRecords && selectedRecords.length > 0) && (
                      <Button sx={{ mb: 2, ml: 3 }} onClick={deleteSelectedRecords} variant='contained' color={'error'}>
                        Delete Selected
                      </Button>
                    )
                  }
                </Box>
              </Box>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}
                checkboxSelection
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                onSelectionModelChange={(newSelection: GridSelectionModel) => {
                  console.log(newSelection);
                  setSelectedRecords(newSelection);
                }}
              />
            </>
        </Card>
      </Grid>
      {drawer}
    </Grid>
  )
}

export default FormTable
