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

import { IPermission } from 'src/@core/interfaces/permission.interface'
import httpApiKit from 'src/@core/helpers/axios-http-kit'
import { asynPermissionDestroy, asynPermissionIndex, asynPermissionStore, asynPermissionUpdate } from 'src/store/apps/permissions/permission-slice'
import FormDate from 'src/@core/components/form/FormDate'
import FormDateTime from 'src/@core/components/form/FormDateTime'
import { asynChannelIndex } from 'src/store/apps/channels/channel-slice'
import FormFile from 'src/@core/components/form/FormFile'
import FormDialog from 'src/@core/components/form/FormDialog'
import FormToggle from 'src/@core/components/form/FormToggle'
import FormCheckBox from 'src/@core/components/form/FormCheckBox'



interface CellType {
  row: IPermission
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
    field: 'permissionName',
    headerName: 'Permissoin Name',
    renderCell: ({ row }: CellType) => <CellPrimary data={row.permissionName}/>
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <FormRowOptions id={row._id} payload={row} handleDelete={asynPermissionDestroy}/>
  }
]


const SideBar = () => {

  const permissionStore = useSelector((state: RootState) => state.permissions)

  const dispatch = useDispatch<AppDispatch>()


  useEffect(()=>{
    if(permissionStore.permissionList.length == 0) dispatch(asynPermissionIndex(null))
  }, [])

  
  const schema = yup.object().shape({
    permissionName: yup.string().required(),
  })
  



  const defaultValues: IPermission = {
    _id: '',
    permissionCode: '',
    permissionName: '',
    description: '',
    isActive: false,
    createdBy: '',
    createdDate: '',
    modifiedOn: '',
  }

    
  return (
    <FormDialog title='Add Permission'>
        <Form 
          defaultValues={defaultValues} 
          schema={schema} 
          handleStore={asynPermissionStore} 
          handleUpdate={asynPermissionUpdate}
        >
          <FormInput name='permissionCode' label='Permission Code'/>
          <FormInput name='permissionName' label='Permission Name'/>
          <FormInput name='description' label='Description'/>
          <FormInput name='createdBy' label='Created By'/>
          <FormCheckBox name='isActive' label='Active'/>
        </Form>
    </FormDialog>
  )
}

const ChannelList = () => {

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.permissions)
  useEffect(() => {
    dispatch(asynPermissionIndex(null))
  }, [])

  return (
    <FormTable 
      handleDelete={asynPermissionDestroy} 
      title='Permission' 
      rows={store.permissionList} 
      columns={columns} 
      drawer={<SideBar />}
    />

  )
}

export default ChannelList
