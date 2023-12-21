
import { PermissionsDto } from "../../application/dto";
import { PermissionEntity } from "..";

export class PermissionExtension {
    static toEntity = (permission: PermissionsDto): PermissionEntity => {
        return {
            _id: permission._id,
            permissionCode: permission.permissionCode,
            permissionName: permission.permissionName,
            description: permission.description,
            isActive: permission.isActive,
            createdBy: permission.createdBy,
            createdDate: permission.createdDate,
            modifiedBy: permission.modifiedBy,
            modifiedOn: permission.modifiedOn,
        }
    }


    static toDto = (permissionEntity: PermissionEntity) => {
        return {
            _id: permissionEntity._id,
            permissionCode: permissionEntity.permissionCode,
            permissionName: permissionEntity.permissionName,
            description: permissionEntity.description,
            isActive: permissionEntity.isActive,
            createdBy: permissionEntity.createdBy,
            createdDate: permissionEntity.createdDate,
            modifiedBy: permissionEntity.modifiedBy,
            modifiedOn: permissionEntity.modifiedOn,
        }
    }
}
