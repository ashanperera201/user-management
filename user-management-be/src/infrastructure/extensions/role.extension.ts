
import { RolesDto } from "../../application/dto";
import { RoleEntity } from "..";

export class RoleExtension {

    static toEntity = (role: RolesDto): RoleEntity => {
        return {
            _id: role._id,
            roleCode: role.roleCode,
            roleName: role.roleName,
            description: role.description,
            permissions: role.permissions,
            isActive: role.isActive,
            createdBy: role.createdBy,
            createdDate: role.createdDate,
            modifiedBy: role.modifiedBy,
            modifiedOn: role.modifiedOn,
        }
    }


    static toDto = (roleEntity: RoleEntity): RolesDto => {
        return {
            _id: roleEntity._id,
            roleCode: roleEntity.roleCode,
            roleName: roleEntity.roleName,
            description: roleEntity.description,
            permissions: roleEntity.permissions,
            isActive: roleEntity.isActive,
            createdBy: roleEntity.createdBy,
            createdDate: roleEntity.createdDate,
            modifiedBy: roleEntity.modifiedBy,
            modifiedOn: roleEntity.modifiedOn,
        }
    }
}
