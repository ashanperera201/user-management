import { UserDto, ResponseDto, PaginationDto, UserLoginDto,  UserLoginResponseDto, ResetPasswordResponseDto, ForgotPasswordResponseDto } from '../../../application/dto';

export interface IUserContractService {
    userLoginAsync(userLogin: UserLoginDto): Promise<ResponseDto<UserLoginResponseDto>>;
    saveUserAsync(user: UserDto): Promise<ResponseDto<UserDto>>;
    updateUserAsync(user: UserDto): Promise<ResponseDto<any>>;
    deleteUserAsync(userIds: string[]): Promise<ResponseDto<boolean>>;
    getAllUsersAsync(searchTerm: string, page: number, pageSize: number): Promise<ResponseDto<PaginationDto<UserDto[]>>>;
    getUserByIdAsync(userId: string): Promise<ResponseDto<UserDto>>;
}