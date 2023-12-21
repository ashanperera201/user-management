import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configuration } from '../configuration';
import { modelDefinitions } from '../infrastructure/entity-exports';
import { infrastructureDependencies } from './infrastructure-dependencies';
import { AxiosService } from './shared/common/axios.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.APP_DATABASE_CONNECTION),
    MongooseModule.forFeature(modelDefinitions),
  ],
  providers: [
    AxiosService,
    ...infrastructureDependencies
  ],
  exports: [
    ...infrastructureDependencies
  ]
})
export class InfrastructureModule { }
