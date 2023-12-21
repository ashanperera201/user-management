import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PageHeader from 'src/@core/components/page-header'
import Table from 'src/views/apps/roles/RoleTable'
import RoleCards from 'src/views/apps/roles/RoleCards'

const RolesComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default RolesComponent
