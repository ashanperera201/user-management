import { Injectable } from '@nestjs/common';

import { configuration } from '../../../configuration'
import { IAppContractService } from '../contracts/app-contract.service';

@Injectable()
export class AppService implements IAppContractService {

  private _configurations: any;

  constructor() {
    this._configurations = configuration();
  }

  getApplicationGreetings = (): string => {
    return this._configurations.greetings;
  }

  getApplicationEnvironment = (): string => {
    return `Application environment is ${this._configurations.env}`;
  }

  getApplicationVersion = (): string => {
    return `API version is ${this._configurations.applicationConfig.apiVersion}`;
  };
}
