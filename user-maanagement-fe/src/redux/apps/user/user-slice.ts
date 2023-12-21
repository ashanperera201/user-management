import { createSlice } from '@reduxjs/toolkit';
import { IUser, IUserState } from '../../../@core/interfaces/user.interface';


const INITIAL_STATE: IUserState = {
    userList: []!
}

export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUserList: (state: IUserState, action: { payload: IUser[] }) => {
            state.userList = action.payload;
        },
        addUser: (state: IUserState, action: { payload: IUser }) => {
            const currentUserList = state.userList;
            currentUserList.unshift(action.payload);
            state.userList = currentUserList;
        },
        updateUser: (state: IUserState, action: { payload: any }) => {
            console.log(action);

            const currentUserList = JSON.parse(JSON.stringify(state.userList))
            const index = currentUserList.findIndex((x: any) => x._id === action.payload._id);

            if (index >= 0) {
                currentUserList[index].userName = action.payload.userName;
                currentUserList[index].fullName = action.payload.fullName;
                currentUserList[index].firstName = action.payload.firstName;
                currentUserList[index].lastName = action.payload.lastName;
                currentUserList[index].middleName = action.payload.middleName;
                currentUserList[index].email = action.payload.email;
                currentUserList[index].secondaryEmail = action.payload.secondaryEmail;
                currentUserList[index].profile = action.payload.profile;
                currentUserList[index].address = action.payload.address;
                currentUserList[index].contactNumber = action.payload.contactNumber;
                currentUserList[index].countryCode = action.payload.countryCode;
                currentUserList[index].roles = action.payload.roles;
                currentUserList[index].isActive = action.payload.isActive;
                currentUserList[index].createdDate = action.payload.createdDate;
                currentUserList[index].createdBy = action.payload.createdBy;
                currentUserList[index].modifiedOn = action.payload.modifiedOn;

                console.log(currentUserList);


                state.userList = currentUserList;
            }
        },
        deleteUser: (state: IUserState, action: { payload: IUser }) => {
            const currentUserList = state.userList;
            const index = currentUserList.findIndex(x => x._id === action.payload._id);
            currentUserList.splice(index, 1);
            state.userList = currentUserList;
        },
        deleteAllUsers: (state: IUserState, action: { payload: string[] }) => {
            const currentUserList = state.userList;
            const usersSelected = currentUserList.filter(x => action.payload.includes(x._id));
            currentUserList.splice(0, usersSelected.length);
            state.userList = currentUserList;
        },
    }
});


export const { setUserList, addUser, updateUser, deleteUser, deleteAllUsers } = userSlice.actions;
export default userSlice.reducer;
