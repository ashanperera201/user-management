import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


import { TokenContractService } from '../../domain/services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject('TOKEN_CONTRACT_SERVICE') private readonly _tokenContractService: TokenContractService, private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const noAuth = this.reflector.get<boolean>('avoid-auth', context.getHandler());

    if (noAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this._tokenContractService.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this._tokenContractService.verifyTokenAsync(token);
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
