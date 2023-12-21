import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit';
import httpApiKit from 'src/@core/helpers/axios-http-kit';
import { IPermissionState, IPermission } from '../../../@core/interfaces/permission.interface';


const initialState: IPermissionState = {
    permissionList: []!
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
  }
  

export const asynPermissionIndex = createAsyncThunk(
    'permissions/asynPermissionIndex', 
    async (payload: any, {getState, dispatch}: Redux) => {
        const response = await httpApiKit.get('/api/permissions/get-all')
        dispatch(index(response.data.data))
    }
)
  
export const asynPermissionDestroy = createAsyncThunk(
    'permissions/asynPermissionDestroy',
    async (payload: any, { getState, dispatch }: Redux) => {
        await httpApiKit.post('/api/permissions/delete', payload)
        dispatch(destroy(payload))

    }
)

export const asynPermissionStore = createAsyncThunk(
    'permissions/asynPermissionStore',
    async (payload: IPermission, { getState, dispatch }: Redux) => {
        const response = await httpApiKit.post('/api/permissions/save', payload)
        dispatch(store(response.data.data))
    }
)

export const asynPermissionUpdate = createAsyncThunk(
    'permissions/asynPermissionUpdate',
    async (payload: IPermission, { getState, dispatch }: Redux) => {
        await httpApiKit.put('/api/permissions/update', payload)
        dispatch(update(payload))
    }
)


export const permissionSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        index: (state: IPermissionState, action: { payload: IPermission[] }) => {
            state.permissionList = action.payload;
        },
        store: (state: IPermissionState, action: { payload: IPermission }) => {
            const currentpermissionList = state.permissionList;
            currentpermissionList.unshift(action.payload);
            state.permissionList = currentpermissionList;
        },
        update: (state: IPermissionState, action: { payload: IPermission }) => {
            const currentpermissionList = JSON.parse(JSON.stringify(state.permissionList))
            const index = currentpermissionList.findIndex((x: any) => x._id === action.payload._id);

            if (index >= 0) {
                currentpermissionList[index] = action.payload;
                state.permissionList = currentpermissionList;
            }
        },

        destroy: (state: IPermissionState, action: { payload: string[] }) => {
            const currentpermissionList = state.permissionList;
            action.payload.forEach(item => {
                const index = currentpermissionList.findIndex(x => x._id == item);
                currentpermissionList.splice(index, 1);
            })
            state.permissionList = currentpermissionList;
        },
    }
});


export const { index, store, update, destroy } = permissionSlice.actions;
export default permissionSlice.reducer;
