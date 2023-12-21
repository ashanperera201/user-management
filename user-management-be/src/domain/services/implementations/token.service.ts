import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { UserDto } from '../../../application/dto';
import { TokenContractService } from '../contracts/token-contract.service';
import { configuration } from '../../../configuration';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class TokenService implements TokenContractService {

    private _configurations: any;

    constructor(private readonly _jwtService: JwtService) {
        this._configurations = configuration();
    }

    verifyAndExtractDataAsync = async (request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<any> => {
        const token = this.extractTokenFromHeader(request);
        return await this.verifyTokenAsync(token);
    }

    extractTokenFromHeader = (request: Request): string | undefined => {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    generateTokenAsync = async (user: UserDto): Promise<any> => {
        const appConfig = this._configurations.applicationConfig;
        const payload = {
            userId: user._id,
            userEmail: user.email,
        };
        const userToken = await this._jwtService.signAsync(payload, { algorithm: 'HS256', expiresIn: appConfig.tokenExpiration, secret: appConfig.applicationSecret })

        return userToken;
    }

    verifyTokenAsync = async (token: string): Promise<any> => {
        const appConfig = this._configurations.applicationConfig;
        return await this._jwtService.verifyAsync(token, { secret: appConfig.applicationSecret });
    }
}
