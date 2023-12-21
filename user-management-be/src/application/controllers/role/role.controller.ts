import { Controller, Inject, Get, Post, Body, Res, HttpStatus, Put, Param, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { IRolesContractService } from '../../../domain/services';
import { RolesDto } from '../../dto'
import { AuthGuard } from 'src/application/guards/auth.guard';

@ApiTags('Roles')
@Controller('api/role')
@UseGuards(AuthGuard)
export class RoleController {

    constructor(@Inject('ROLES_CONTRACT_SERVICE') private readonly _rolesContractService: IRolesContractService) { }

    @Get('get-all')
    async getAllRolesDetailsAsync(@Res() response: Response) {
        try {
            const serviceResult = await this._rolesContractService.getAllRolesAsync();
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    
    @Get('/:rolesId')
    async getRoleByIdAsync(@Param() { rolesId }: any, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._rolesContractService.getRolesAsync(rolesId);
            response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('save')
    async saveRolesAsync(@Body() role: RolesDto, @Res() response: Response) {
        try {
            const serviceResult = await this._rolesContractService.saveRolesAsync(role);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Put('update')
    async updateRolesAsync(@Body() Role: RolesDto, @Res() response: Response) {
        try {
            const serviceResult = await this._rolesContractService.updateRolesAsync(Role);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('delete')
    async deleteRolesAsync(@Body() rolesIds: string[], @Res() response: Response) {
        try {
            const serviceResult = await this._rolesContractService.deleteRolesAsync(rolesIds);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}
