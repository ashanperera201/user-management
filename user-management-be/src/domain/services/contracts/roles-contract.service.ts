import { RolesDto, ResponseDto } from '../../../application/dto';

export interface IRolesContractService {
    saveRolesAsync(role: RolesDto): Promise<ResponseDto<RolesDto>>;
    updateRolesAsync(role: RolesDto): Promise<ResponseDto<RolesDto>>;
    deleteRolesAsync(roleIds: string[]): Promise<ResponseDto<boolean>>;
    getAllRolesAsync(): Promise<ResponseDto<RolesDto[]>>;
    getRolesAsync(roleId: string): Promise<ResponseDto<RolesDto>>;
}