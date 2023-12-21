import { PermissionsDto, ResponseDto } from '../../../application/dto';

export interface IPermissionsContractService {
    savePermissionsAsync(permission: PermissionsDto): Promise<ResponseDto<PermissionsDto>>;
    updatePermissionsAsync(permission: PermissionsDto): Promise<ResponseDto<PermissionsDto>>;
    deletePermissionsAsync(permissionIds: string[]): Promise<ResponseDto<boolean>>;
    getAllPermissionsAsync(): Promise<ResponseDto<PermissionsDto[]>>;
    getPermissionsAsync(permissionId: string): Promise<ResponseDto<PermissionsDto>>;
}