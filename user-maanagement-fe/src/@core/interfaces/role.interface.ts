import { IPermission } from "./permission.interface"

export interface IRole {
  _id: string
  roleCode: string
  roleName: string
  description: string
  permissions: IPermission[]
  isActive: boolean
  createdBy: string
  createdDate: string
  modifiedOn: string
  // __v: number
}

export interface IRoleState {
  roleList: IRole[]
}

export interface IUserRoleState {
  roleList: IRole[]
}