import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ResponseMapperService } from './services';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { dependencies } from './dependency-registration'

@Module({
    imports: [
        InfrastructureModule,
        JwtModule.register({
            secret: process.env.APPLICATION_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION, algorithm: 'HS256' },
        }),
    ],
    providers: [
        ResponseMapperService,
        ...dependencies
    ],
    exports: [
        InfrastructureModule,
        ...dependencies
    ]
})
export class DomainModule { }
