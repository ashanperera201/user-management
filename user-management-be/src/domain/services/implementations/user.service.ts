import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUserContractRepository, UserExtension } from '../../../infrastructure/'
import { IUserContractService, TokenContractService } from '../';
import { ResponseDto, PaginationDto, UserDto, ResetPasswordResponseDto, UserLoginDto, UserLoginResponseDto, ForgotPasswordResponseDto } from '../../../application/dto';
import { ResponseMapperService } from './response-mapper.service';
import { hashPassword, passwordCompare, } from '../../../infrastructure';

@Injectable()
export class UserService implements IUserContractService {

    constructor(
        @Inject('USER_CONTRACT_REPOSITORY') private readonly _userContractRepository: IUserContractRepository,
        @Inject('TOKEN_CONTRACT_SERVICE') private readonly _tokenContractService: TokenContractService,
        private _responseMapperService: ResponseMapperService) { }



    userLoginAsync = async (userLogin: UserLoginDto): Promise<ResponseDto<UserLoginResponseDto>> => {
        const user = this._userContractRepository.getUserQuery();
        const userDbResult = await user.where({ $and: [{ userName: userLogin.userName, isActive: true }] })
            .findOne()

        if (userDbResult && userDbResult.userName) {
            const isUserAuthorized = await passwordCompare(userLogin.password, userDbResult.password);

            if (isUserAuthorized) {
                const userRef = UserExtension.toDto(userDbResult);
                const token = await this._tokenContractService.generateTokenAsync(userRef);
                const response: UserLoginResponseDto = {
                    accessToken: token,
                    firstName: userRef.firstName,
                    lastName: userRef.lastName,
                    message: 'Login Successful'
                }
                return this._responseMapperService.serviceResponseMapper<UserLoginResponseDto>(response, null, false, HttpStatus.OK);
            } else {
                return this._responseMapperService.serviceResponseMapper<UserLoginResponseDto>(null, "User password invalid", true, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return this._responseMapperService.serviceResponseMapper<UserLoginResponseDto>(null, "User not found for given user name", true, HttpStatus.UNAUTHORIZED);
        }
    }

    saveUserAsync = async (user: UserDto): Promise<ResponseDto<UserDto>> => {

        const existingUser = await this._userContractRepository.getUserByEmailAsync(user.email);

        if (existingUser) {
            return this._responseMapperService.serviceResponseMapper<UserDto>(null, "This user is already exists.", true, HttpStatus.EXPECTATION_FAILED);
        } else {
            user.createdDate = new Date();
            const mappedResult = UserExtension.toEntity(user);
            const hashedContents = await hashPassword(mappedResult.password);

            if (hashedContents) {
                mappedResult.passwordSalt = hashedContents.passwordSalt;
                mappedResult.password = hashedContents.passwordHash;
            }

            const savedUser = await this._userContractRepository.saveUserAsync(mappedResult);
            if (savedUser) {
                savedUser.password = null;
                savedUser.passwordSalt = null;
                return this._responseMapperService.serviceResponseMapper<UserDto>(UserExtension.toDto(savedUser), null, false, HttpStatus.CREATED);
            }

            return this._responseMapperService.serviceResponseMapper<UserDto>(null, "Failed to save the user.", true, HttpStatus.EXPECTATION_FAILED);
        }
    }

    updateUserAsync = async (user: UserDto): Promise<ResponseDto<any>> => {
        const mappedResult = UserExtension.toEntity(user);
        const updatedUser = await this._userContractRepository.updateUserAsync(mappedResult);
        if (updatedUser) {
            return this._responseMapperService.serviceResponseMapper<any>(updatedUser, null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<any>(null, null, true, HttpStatus.EXPECTATION_FAILED);
    }

    deleteUserAsync = async (userIds: string[]): Promise<ResponseDto<boolean>> => {
        const response = await this._userContractRepository.deleteUserAsync(userIds);
        if (response) {
            return this._responseMapperService.serviceResponseMapper<boolean>(response, null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<boolean>(response, null, false, HttpStatus.NO_CONTENT);
    }

    getAllUsersAsync = async (searchTerm: string, page: number, pageSize: number): Promise<ResponseDto<PaginationDto<UserDto[]>>> => {
        let response = new PaginationDto<UserDto[]>();
        const userResults = await this._userContractRepository.getAllUsersAsync(searchTerm, page, pageSize);
        if (userResults && userResults.count > 0) {
            response.count = userResults.count;
            response.data = userResults.data.map(x => UserExtension.toDto(x, true));
            return this._responseMapperService.serviceResponseMapper<PaginationDto<UserDto[]>>(response, null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<PaginationDto<UserDto[]>>(response, null, false, HttpStatus.NO_CONTENT);
    }

    getUserByIdAsync = async (userId: string): Promise<ResponseDto<UserDto>> => {
        const user = await this._userContractRepository.getUserAsync(userId);
        if (user) {
            return this._responseMapperService.serviceResponseMapper<UserDto>(UserExtension.toDto(user, true), null, false, HttpStatus.OK);
        }
        return this._responseMapperService.serviceResponseMapper<UserDto>(null, null, false, HttpStatus.NO_CONTENT);
    }
}

