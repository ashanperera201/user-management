import { createSlice } from '@reduxjs/toolkit';
import { IRole, IUserRoleState } from '../../../@core/interfaces/role.interface'

const INITIAL_STATE: IUserRoleState = {
    roleList: []
}

export const userRoleSlice = createSlice({
    name: 'role',
    initialState: INITIAL_STATE,
    reducers: {
        // SET INITIAL VIEW
        setUserRoleList: (state: IUserRoleState, action: { payload: IRole[] }) => {
            state.roleList = action.payload;
        },
        // ADD
        addUserRole: (state: IUserRoleState, action: { payload: IRole }) => {
            const currentList = state.roleList;
            currentList.unshift(action.payload);
            state.roleList = currentList;
        },
        // UPDATE ROLES
        updateRole: (state: IUserRoleState, action: { payload: IRole }) => {
            const currentList: IRole[] = JSON.parse(JSON.stringify(state.roleList))
            const index = currentList.findIndex((x: any) => x._id === action.payload._id);

            if (index >= 0) {
                currentList[index].roleCode = action.payload.roleCode;
                currentList[index].roleName = action.payload.roleName;
                currentList[index].description = action.payload.description;
                currentList[index].permissions = action.payload.permissions;

                state.roleList = currentList;
            }
        },
        // DELETE ONE ROLE
        deleteRole: (state: IUserRoleState, action: { payload: IRole }) => {
            const currentList = state.roleList;
            const index = currentList.findIndex(x => x._id === action.payload._id);
            currentList.splice(index, 1);
            state.roleList = currentList;
        },
        // DELETE BULK
        deleteAllRoles: (state: IUserRoleState, action: { payload: string[] }) => {
            const currentList = state.roleList;
            const selected = currentList.filter(x => action.payload.includes(x._id));
            currentList.splice(0, selected.length);
            state.roleList = currentList;
        },
    }
})

export const { setUserRoleList, addUserRole, updateRole, deleteRole, deleteAllRoles } = userRoleSlice.actions;
export default userRoleSlice.reducer;