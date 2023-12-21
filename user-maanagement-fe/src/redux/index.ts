// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import userInfo from 'src/redux/apps/user/user-slice'
import roleInfo from 'src/redux/apps/roles/role-slice'
import user from 'src/redux/apps/user'
import permissionInfo from 'src/redux/apps/permissions/permission-slice'
// import permissions from 'src/redux/apps/permissions'
import crud from 'src/store/crud-slice'
import permissions from 'src/store/apps/permissions/permission-slice'
import roles from 'src/store/apps/roles/role-slice'
import users from 'src/store/apps/users/user-slice'
export const store = configureStore({
  reducer: {
    user,
    userInfo,
    roleInfo,
    permissionInfo,
    permissions,
    crud,
    roles,
    users,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
