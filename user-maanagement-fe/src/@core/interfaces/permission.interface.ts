export interface IPermission {
    _id: string
    permissionCode: string
    permissionName: string
    description: string
    isActive: boolean
    createdBy: string
    createdDate: string
    modifiedOn: string
    // __v: number
}

export interface IPermissionState {
    permissionList: IPermission[];
}