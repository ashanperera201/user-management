import { Controller, Inject, Get, Post, Body, Res, HttpStatus, Put, Param, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { IPermissionsContractService } from '../../../domain/services';
import { PermissionsDto } from '../../dto'
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('Permissions')
@Controller('api/permission')
@UseGuards(AuthGuard)
export class PermissionController {

    constructor(@Inject('PERMISSION_CONTRACT_SERVICE') private readonly _permissionsContractService: IPermissionsContractService) { }

    @Get('get-all')
    async getAllPermissionsDetailsAsync(@Res() response: Response) {
        try {
            const serviceResult = await this._permissionsContractService.getAllPermissionsAsync();
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get('/:permissionId')
    async getPermissionByIdAsync(@Param() { permissionId }: any, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._permissionsContractService.getPermissionsAsync(permissionId);
            response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('save')
    async savePermissionsAsync(@Body() permission: PermissionsDto, @Res() response: Response) {
        try {
            const serviceResult = await this._permissionsContractService.savePermissionsAsync(permission);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Put('update')
    async updatePermissionsAsync(@Body() permission: PermissionsDto, @Res() response: Response) {
        try {
            const serviceResult = await this._permissionsContractService.updatePermissionsAsync(permission);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('delete')
    async deletePermissionsAsync(@Body() permissionIds: string[], @Res() response: Response) {
        try {
            const serviceResult = await this._permissionsContractService.deletePermissionsAsync(permissionIds);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}
