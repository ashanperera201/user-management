import { UserDto } from '../../../application/dto';
import { Request } from 'express';

export interface TokenContractService {
    generateTokenAsync(user: UserDto): Promise<any>;
    verifyTokenAsync(token: string): Promise<any>;
    extractTokenFromHeader(request: Request): string | undefined;
    verifyAndExtractDataAsync(request: Request): Promise<any>;
}
