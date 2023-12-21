import React, { useEffect, useState } from 'react'

import * as yup from 'yup'
import FormInput from 'src/@core/components/form/FormInput'
import FormSelect from 'src/@core/components/form/FormSelect'
import Form from 'src/@core/components/form/Form'
import FormDrawer from 'src/@core/components/form/FormDrawer'
import {CellBasic, CellPrimary} from 'src/@core/components/table/cell/Cell'

import { useDispatch, useSelector } from 'react-redux'

import { RootState, AppDispatch } from 'src/redux'

import FormTable from 'src/@core/components/form/FormTable'
import FormRowOptions from 'src/@core/components/form/FormRowOptoins'

import { IRole } from 'src/@core/interfaces/role.interface'
import httpApiKit from 'src/@core/helpers/axios-http-kit'
import { asynRoleDestroy, asynRoleIndex, asynRoleStore, asynRoleUpdate } from 'src/store/apps/roles/role-slice'
import FormDate from 'src/@core/components/form/FormDate'
import FormDateTime from 'src/@core/components/form/FormDateTime'
import { asynChannelIndex } from 'src/store/apps/channels/channel-slice'
import FormFile from 'src/@core/components/form/FormFile'
import FormDialog from 'src/@core/components/form/FormDialog'
import { asynPermissionIndex } from 'src/store/apps/permissions/permission-slice'
import FormCheckBox from 'src/@core/components/form/FormCheckBox'



interface CellType {
  row: IRole
}

const columns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'id',
    headerName: 'Id',
    renderCell: ({ row }: CellType) => <CellPrimary data={row._id}/>
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'roleName',
    headerName: 'Role Name',
    renderCell: ({ row }: CellType) => <CellPrimary data={row.roleName}/>
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <FormRowOptions id={row._id} payload={row} handleDelete={asynRoleDestroy}/>
  }
]


const SideBar = () => {

  const roleStore = useSelector((state: RootState) => state.roles)
  const permissionStore = useSelector((state: RootState) => state.permissions)

  const dispatch = useDispatch<AppDispatch>()


  useEffect(()=>{
    if(roleStore.roleList.length == 0) dispatch(asynRoleIndex(null))
    if(permissionStore.permissionList.length == 0) dispatch(asynPermissionIndex(null))
  }, [])

  
  const schema = yup.object().shape({
    roleName: yup.string().required(),
  })
  



  const defaultValues: IRole = {
    _id: '',
    roleCode: '',
    roleName: '',
    description: '',
    permissions: [],
    isActive: false,
    createdBy: '',
    createdDate: '',
    modifiedOn: '',
  
  }

    
  return (
    <FormDialog title='Add Role'>
        <Form 
          defaultValues={defaultValues} 
          schema={schema} 
          handleStore={asynRoleStore} 
          handleUpdate={asynRoleUpdate}
        >
          <FormInput name='roleCode' label='Role Code'/>
          <FormInput name='roleName' label='Role Name'/>
          <FormInput name='createdBy' label='Created By'/>
          <FormSelect multiple name='permissions' label='Permissions' options={permissionStore.permissionList} displayValue='permissionName'/>
          <FormCheckBox name='isActive' label='Active'/>
        </Form>
    </FormDialog>
  )
}

const ChannelList = () => {

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.roles)
  useEffect(() => {
    dispatch(asynRoleIndex(null))
  }, [])

  return (
    <FormTable 
      handleDelete={asynRoleDestroy} 
      title='Role' 
      rows={store.roleList} 
      columns={columns} 
      drawer={<SideBar />}
    />

  )
}

export default ChannelList
