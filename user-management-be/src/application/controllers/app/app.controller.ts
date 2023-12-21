import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IAppContractService } from '../../../domain/services';
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('App')
@Controller('api/app')
@UseGuards(AuthGuard)
export class AppController {

  constructor(@Inject('APP_CONTRACT_SERVICE') private readonly appService: IAppContractService) {
  }

  @Get('greetings')
  getApplicationGreetings(): string {
    return this.appService.getApplicationGreetings();
  }

  @Get('version')
  getApiVersionAsync(): string {
    return this.appService.getApplicationVersion();
  }

  @Get('env')
  getApplicationEnvironment(): string {
    return this.appService.getApplicationEnvironment();
  }
}
