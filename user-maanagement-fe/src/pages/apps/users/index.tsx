import React, { useEffect, useState } from 'react'

import * as yup from 'yup'
import FormInput from 'src/@core/components/form/FormInput'
import FormSelect from 'src/@core/components/form/FormSelect'
import Form from 'src/@core/components/form/Form'
import FormDrawer from 'src/@core/components/form/FormDrawer'
import {CellBasic, CellPrimary, CellUserName} from 'src/@core/components/table/cell/Cell'

import { useDispatch, useSelector } from 'react-redux'

import { RootState, AppDispatch } from 'src/redux'

import FormTable from 'src/@core/components/form/FormTable'
import FormRowOptions from 'src/@core/components/form/FormRowOptoins'

import { IUser } from 'src/@core/interfaces/user.interface'
import httpApiKit from 'src/@core/helpers/axios-http-kit'
import { asynUserDestroy, asynUserIndex, asynUserStore, asynUserUpdate } from 'src/store/apps/users/user-slice'
import FormDate from 'src/@core/components/form/FormDate'
import FormDateTime from 'src/@core/components/form/FormDateTime'
import { asynChannelIndex } from 'src/store/apps/channels/channel-slice'
import FormFile from 'src/@core/components/form/FormFile'
import FormDialog from 'src/@core/components/form/FormDialog'
import { asynRoleIndex } from 'src/store/apps/roles/role-slice'
import FormCheckBox from 'src/@core/components/form/FormCheckBox'



interface CellType {
  row: IUser
}

const columns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'fullName',
    headerName: 'User',
    renderCell: ({ row }: CellType) => <CellUserName row={row}/>
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => <CellPrimary data={row.email}/>
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <FormRowOptions id={row._id} payload={row} handleDelete={asynUserDestroy}/>
  }
]


const SideBar = () => {

  const userState = useSelector((state: RootState) => state.users)
  const roleStore = useSelector((state: RootState) => state.roles)

  const dispatch = useDispatch<AppDispatch>()


  useEffect(()=>{
    if(userState.userList.length == 0) dispatch(asynUserIndex(null))
    if(roleStore.roleList.length == 0) dispatch(asynRoleIndex(null))
  }, [])

  
  const schema = yup.object().shape({
    userName: yup.string().required(),
  })
  



  const defaultValues = {
    _id: '',
    userName: '',
    firstName: '',
    email: '',
    roles: [],
    isActive: false,
  }

    
  return (
    <FormDialog title='Add User'>
        <Form 
          defaultValues={defaultValues} 
          schema={schema} 
          handleStore={asynUserStore} 
          handleUpdate={asynUserUpdate}
        >
          <FormInput name='userName' label='User Name'/>
          <FormInput name='firstName' label='First Name'/>
          <FormInput name='email' label='Email'/>
          <FormSelect multiple name='roles' label='Roles' options={roleStore.roleList} displayValue='roleName'/>
          <FormCheckBox name='isActive' label='Active'/>

        </Form>
    </FormDialog>
  )
}

const ChannelList = () => {

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.users)
  useEffect(() => {
    dispatch(asynUserIndex(null))
  }, [])

  return (
    <FormTable 
      handleDelete={asynUserDestroy} 
      title='User' 
      rows={store.userList} 
      columns={columns} 
      drawer={<SideBar />}
    />

  )
}

export default ChannelList
