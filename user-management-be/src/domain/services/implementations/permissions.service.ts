import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IPermissionsContractService } from '../contracts/permissions-contract.service';
import { IPermissionsContractRepository, PermissionExtension } from '../../../infrastructure/'
import { PermissionsDto, ResponseDto } from '../../../application/dto';
import { ResponseMapperService } from './response-mapper.service';

@Injectable()
export class PermissionsService implements IPermissionsContractService {

    constructor(@Inject('PERMISSIONS_CONTRACT_REPOSITORY') private readonly _permissionsContractRepository: IPermissionsContractRepository, private _responseMapperService: ResponseMapperService) { }

    savePermissionsAsync = async (permission: PermissionsDto): Promise<ResponseDto<PermissionsDto>> => {
        const mappedResult = PermissionExtension.toEntity(permission);
        const existsPermission = await this._permissionsContractRepository.getPermissionByNameAsync(mappedResult.permissionName);
        if (existsPermission === null) {
            const savedResponse = await this._permissionsContractRepository.savePermissionsAsync(mappedResult);

            if (savedResponse) {
                return this._responseMapperService.serviceResponseMapper<PermissionsDto>(PermissionExtension.toDto(savedResponse), null, false, HttpStatus.CREATED);
            }
            return this._responseMapperService.serviceResponseMapper<PermissionsDto>(null, null, true, HttpStatus.EXPECTATION_FAILED);
        }
        return this._responseMapperService.serviceResponseMapper<PermissionsDto>(null, "Permission is already exists", true, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    updatePermissionsAsync = async (permission: PermissionsDto): Promise<ResponseDto<PermissionsDto>> => {
        const mappedResult = PermissionExtension.toEntity(permission);
        const response = await this._permissionsContractRepository.updatePermissionsAsync(mappedResult);

        if (response) {
            return this._responseMapperService.serviceResponseMapper<PermissionsDto>(PermissionExtension.toDto(response), null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<PermissionsDto>(null, null, true, HttpStatus.EXPECTATION_FAILED);
    }

    deletePermissionsAsync = async (permissionIds: string[]): Promise<ResponseDto<boolean>> => {
        const response = await this._permissionsContractRepository.deletePermissionsAsync(permissionIds);

        if (response) {
            return this._responseMapperService.serviceResponseMapper<boolean>(response, null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<boolean>(response, null, false, HttpStatus.NO_CONTENT);
    }

    getAllPermissionsAsync = async (): Promise<ResponseDto<PermissionsDto[]>> => {
        const response = await this._permissionsContractRepository.getAllPermissionsAsync();
        const convertedList = response.map(x => (PermissionExtension.toDto(x)));

        if (convertedList) {
            return this._responseMapperService.serviceResponseMapper<PermissionsDto[]>(convertedList, null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<PermissionsDto[]>(null, null, false, HttpStatus.NO_CONTENT);
    }

    getPermissionsAsync = async (permissionId: string): Promise<ResponseDto<PermissionsDto>> => {
        const response = await this._permissionsContractRepository.getPermissionsAsync(permissionId);
        if (response) {
            return this._responseMapperService.serviceResponseMapper<PermissionsDto>(PermissionExtension.toDto(response), null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<PermissionsDto>(null, null, false, HttpStatus.NO_CONTENT);
    }
}

