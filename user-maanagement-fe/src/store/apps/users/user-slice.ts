import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit';
import httpApiKit from 'src/@core/helpers/axios-http-kit';
import { IUserState, IUser } from '../../../@core/interfaces/user.interface';


const initialState: IUserState = {
    userList: []!
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
  }
  

export const asynUserIndex = createAsyncThunk(
    'users/asynUserIndex', 
    async (payload: any, {getState, dispatch}: Redux) => {
        const response = await httpApiKit.get('/api/users/get-all')
        dispatch(index(response.data.data))
    }
)
  
export const asynUserDestroy = createAsyncThunk(
    'users/asynUserDestroy',
    async (payload: any, { getState, dispatch }: Redux) => {
        await httpApiKit.post('/api/users/delete', payload)
        dispatch(destroy(payload))

    }
)

export const asynUserStore = createAsyncThunk(
    'users/asynUserStore',
    async (payload: IUser, { getState, dispatch }: Redux) => {
        const response = await httpApiKit.post('/api/users/save', payload)
        dispatch(store(response.data.data))
    }
)

export const asynUserUpdate = createAsyncThunk(
    'users/asynUserUpdate',
    async (payload: IUser, { getState, dispatch }: Redux) => {
        await httpApiKit.put('/api/users/update', payload)
        dispatch(update(payload))
    }
)


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        index: (state: IUserState, action: { payload: IUser[] }) => {
            state.userList = action.payload;
        },
        store: (state: IUserState, action: { payload: IUser }) => {
            const currentuserList = state.userList;
            currentuserList.unshift(action.payload);
            state.userList = currentuserList;
        },
        update: (state: IUserState, action: { payload: IUser }) => {
            const currentuserList = JSON.parse(JSON.stringify(state.userList))
            const index = currentuserList.findIndex((x: any) => x._id === action.payload._id);

            if (index >= 0) {
                currentuserList[index] = action.payload;
                state.userList = currentuserList;
            }
        },

        destroy: (state: IUserState, action: { payload: string[] }) => {
            const currentuserList = state.userList;
            action.payload.forEach(item => {
                const index = currentuserList.findIndex(x => x._id == item);
                currentuserList.splice(index, 1);
            })
            state.userList = currentuserList;
        },
    }
});


export const { index, store, update, destroy } = userSlice.actions;
export default userSlice.reducer;
