import { IRole } from "./role.interface";

export interface IPermission {
    permissionCode: string;
    permissionName: string;
    description: string;
    isActive: boolean;
    createdBy: string;
    createdDate: Date;
    modifiedOn: Date;
}

export interface IUser {
    _id: string
    userName: string;
    // fullName: string;
    firstName: string
    // lastName: string;
    // middleName?: string;
    email: string
    // secondaryEmail: string;
    // profile: string;
    // address: string;
    // contactNumber: string;
    // countryCode: string;
    // roles: IRole[];
    // isActive: boolean;
    // createdDate: Date;
    // createdBy: string;
    // modifiedOn?: Date;
    // avatarColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export interface IUserServiceResponse {
    data: IUser[];
    errors: any;
    isError: boolean;
    statusCode: number;
}

export interface IUserState {
    userList: IUser[]
}
