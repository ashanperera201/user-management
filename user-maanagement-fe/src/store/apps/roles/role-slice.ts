import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit';
import httpApiKit from 'src/@core/helpers/axios-http-kit';
import { IRoleState, IRole } from '../../../@core/interfaces/role.interface';


const initialState: IRoleState = {
    roleList: []!
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
  }
  

export const asynRoleIndex = createAsyncThunk(
    'roles/asynRoleIndex', 
    async (payload: any, {getState, dispatch}: Redux) => {
        const response = await httpApiKit.get('/api/roles/get-all')
        dispatch(index(response.data.data))
    }
)
  
export const asynRoleDestroy = createAsyncThunk(
    'roles/asynRoleDestroy',
    async (payload: any, { getState, dispatch }: Redux) => {
        await httpApiKit.post('/api/roles/delete', payload)
        dispatch(destroy(payload))

    }
)

export const asynRoleStore = createAsyncThunk(
    'roles/asynRoleStore',
    async (payload: IRole, { getState, dispatch }: Redux) => {
        const response = await httpApiKit.post('/api/roles/save', payload)
        dispatch(store(response.data.data))
    }
)

export const asynRoleUpdate = createAsyncThunk(
    'roles/asynRoleUpdate',
    async (payload: IRole, { getState, dispatch }: Redux) => {
        await httpApiKit.put('/api/roles/update', payload)
        dispatch(update(payload))
    }
)


export const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        index: (state: IRoleState, action: { payload: IRole[] }) => {
            state.roleList = action.payload;
        },
        store: (state: IRoleState, action: { payload: IRole }) => {
            const currentroleList = state.roleList;
            currentroleList.unshift(action.payload);
            state.roleList = currentroleList;
        },
        update: (state: IRoleState, action: { payload: IRole }) => {
            const currentroleList = JSON.parse(JSON.stringify(state.roleList))
            const index = currentroleList.findIndex((x: any) => x._id === action.payload._id);

            if (index >= 0) {
                currentroleList[index] = action.payload;
                state.roleList = currentroleList;
            }
        },

        destroy: (state: IRoleState, action: { payload: string[] }) => {
            const currentroleList = state.roleList;
            action.payload.forEach(item => {
                const index = currentroleList.findIndex(x => x._id == item);
                currentroleList.splice(index, 1);
            })
            state.roleList = currentroleList;
        },
    }
});


export const { index, store, update, destroy } = roleSlice.actions;
export default roleSlice.reducer;
