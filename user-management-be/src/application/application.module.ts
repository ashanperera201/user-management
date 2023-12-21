import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';

import {
  AppController,
  PermissionController,
  RoleController,
  UserController,
} from './controllers';

import { DomainModule } from '../domain/domain.module'
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [
    AppController,
    PermissionController,
    RoleController,
    UserController,
  ],
  imports: [
    DomainModule,
    NestjsFormDataModule
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    AuthGuard,
    DomainModule,
    NestjsFormDataModule
  ]
})
export class ApplicationModule { }
