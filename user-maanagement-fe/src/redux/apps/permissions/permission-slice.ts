import { createSlice } from '@reduxjs/toolkit';
import { IPermissionState, IPermission } from '../../../@core/interfaces/permission.interface'

const INITIAL_STATE: IPermissionState = {
    permissionList: []
}

export const userPermissionSlice = createSlice({
    name: 'role',
    initialState: INITIAL_STATE,
    reducers: {
        // SET INITIAL VIEW
        setPermissionList: (state: IPermissionState, action: { payload: IPermission[] }) => {
            state.permissionList = action.payload;
        },
        // ADD
        addPermission: (state: IPermissionState, action: { payload: IPermission }) => {
            const currentList = state.permissionList;
            currentList.unshift(action.payload);
            state.permissionList = currentList;
        },
        // UPDATE ROLES
        updatePermission: (state: IPermissionState, action: { payload: IPermission }) => {
            const currentList: IPermission[] = JSON.parse(JSON.stringify(state.permissionList))
            const index = currentList.findIndex((x: any) => x._id === action.payload._id);

            if (index >= 0) {
                currentList[index].permissionCode = action.payload.permissionCode;
                currentList[index].permissionName = action.payload.permissionName;
                currentList[index].description = action.payload.description;

                state.permissionList = currentList;
            }
        },
        // DELETE ONE ROLE
        deletePermission: (state: IPermissionState, action: { payload: IPermission }) => {
            const currentList = state.permissionList;
            const index = currentList.findIndex(x => x._id === action.payload._id);
            currentList.splice(index, 1);
            state.permissionList = currentList;
        },
        // DELETE BULK
        deleteAllPermissions: (state: IPermissionState, action: { payload: string[] }) => {
            const currentList = state.permissionList;
            const selected = currentList.filter(x => action.payload.includes(x._id));
            currentList.splice(0, selected.length);
            state.permissionList = currentList;
        },
    }
})

export const { setPermissionList, addPermission, updatePermission, deletePermission, deleteAllPermissions } = userPermissionSlice.actions;
export default userPermissionSlice.reducer;
