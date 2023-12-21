import { PermissionEntity } from "../../";

export interface IPermissionsContractRepository {
    savePermissionsAsync(permission: PermissionEntity): Promise<PermissionEntity>;
    updatePermissionsAsync(permission: PermissionEntity): Promise<PermissionEntity>;
    deletePermissionsAsync(permissionIds: string[]): Promise<boolean>;
    getAllPermissionsAsync(): Promise<PermissionEntity[]>;
    getPermissionsAsync(permissionId: string): Promise<PermissionEntity>;
    getPermissionByNameAsync(permissionName: string): Promise<PermissionEntity>;
}