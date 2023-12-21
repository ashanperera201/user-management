import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IRoleContractRepository, RoleExtension } from '../../../infrastructure/'
import { ResponseDto, RolesDto } from '../../../application/dto';
import { IRolesContractService, ResponseMapperService } from '../';

@Injectable()
export class RolesService implements IRolesContractService {

    constructor(
        @Inject('ROLES_CONTRACT_REPOSITORY') private readonly _roleContractRepository: IRoleContractRepository,
        private _responseMapperService: ResponseMapperService) { }


    saveRolesAsync = async (role: RolesDto): Promise<ResponseDto<RolesDto>> => {
        const mappedResult = RoleExtension.toEntity(role);
        const savedResponse = await this._roleContractRepository.saveRolesAsync(mappedResult);

        if (savedResponse) {
            return this._responseMapperService.serviceResponseMapper<RolesDto>(RoleExtension.toDto(savedResponse), null, false, HttpStatus.CREATED);
        }
        return this._responseMapperService.serviceResponseMapper<RolesDto>(null, null, true, HttpStatus.EXPECTATION_FAILED);
    }

    updateRolesAsync = async (role: RolesDto): Promise<ResponseDto<RolesDto>> => {
        const mappedResult = RoleExtension.toEntity(role);
        const response = await this._roleContractRepository.updateRolesAsync(mappedResult);

        if (response) {
            return this._responseMapperService.serviceResponseMapper<RolesDto>(RoleExtension.toDto(response), null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<RolesDto>(null, null, true, HttpStatus.EXPECTATION_FAILED);
    }

    deleteRolesAsync = async (roleIds: string[]): Promise<ResponseDto<boolean>> => {
        const response = await this._roleContractRepository.deleteRolesAsync(roleIds);

        if (response) {
            return this._responseMapperService.serviceResponseMapper<boolean>(response, null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<boolean>(response, null, false, HttpStatus.NO_CONTENT);
    }

    getAllRolesAsync = async (): Promise<ResponseDto<RolesDto[]>> => {
        const response = await this._roleContractRepository.getAllRolesAsync();
        const convertedList = response.map(x => (RoleExtension.toDto(x)));

        if (convertedList) {
            return this._responseMapperService.serviceResponseMapper<RolesDto[]>(convertedList, null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<RolesDto[]>(null, null, false, HttpStatus.NO_CONTENT);
    }

    getRolesAsync = async (roleId: string): Promise<ResponseDto<RolesDto>> => {
        const response = await this._roleContractRepository.getRoleAsync(roleId);
        if (response) {
            return this._responseMapperService.serviceResponseMapper<RolesDto>(RoleExtension.toDto(response), null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<RolesDto>(null, null, false, HttpStatus.NO_CONTENT);
    }
}

