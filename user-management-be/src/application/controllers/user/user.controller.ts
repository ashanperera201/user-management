import { Controller, Inject, Get, Post, Body, Res, HttpStatus, Put, Param, Query, NotImplementedException, UseGuards, } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { IUserContractService } from '../../../domain/services';
import { UserDto, UserLoginDto } from '../../dto/';
import { AuthGuard } from '../../guards/auth.guard';
import { AllowAnonymous } from '../../../infrastructure/shared';

@ApiTags('Users')
@Controller('api/user')
@UseGuards(AuthGuard)
export class UserController {

    constructor(@Inject('USER_CONTRACT_SERVICE') private readonly _userContractService: IUserContractService) { }

    @Get('all-details')
    async getAllUserDetailsAsync(@Query() query: { searchTerm: string, page: number, pageSize: number }, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._userContractService.getAllUsersAsync(query.searchTerm, +query.page, +query.pageSize);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get('/:userId')
    async getUserDetailAsync(@Param() { userId }: any, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._userContractService.getUserByIdAsync(userId);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Put('update')
    async updateUserAsync(@Body() user: UserDto, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._userContractService.updateUserAsync(user);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('delete')
    async deleteUserAsync(@Body() userIds: string[], @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._userContractService.deleteUserAsync(userIds);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('/auth/sign-up')
    @AllowAnonymous()
    async saveUserAsync(@Body() user: UserDto, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._userContractService.saveUserAsync(user);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post('/auth/login')
    @AllowAnonymous()
    async loginAsync(@Body() userLogin: UserLoginDto, @Res() response: Response): Promise<any> {
        try {
            const serviceResult = await this._userContractService.userLoginAsync(userLogin);
            return response.status(serviceResult.statusCode).json(serviceResult);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}
