import { IUserState } from "./user.interface";
import { IUserRoleState } from './role.interface';
import { IPermissionState } from './permission.interface'
export interface IApplicationState {
    userInfo: IUserState;
    roleInfo: IUserRoleState;
    permissionInfo: IPermissionState;
}