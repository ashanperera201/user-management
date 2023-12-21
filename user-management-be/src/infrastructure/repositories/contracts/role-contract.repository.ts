import { RoleEntity } from "../../";

export interface IRoleContractRepository {
    saveRolesAsync(role: RoleEntity): Promise<RoleEntity>;
    updateRolesAsync(role: RoleEntity): Promise<any>;
    deleteRolesAsync(roleIds: string[]): Promise<boolean>;
    getAllRolesAsync(): Promise<RoleEntity[]>;
    getRoleAsync(roleId: string): Promise<RoleEntity>;
}