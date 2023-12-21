import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ApplicationModule } from './application';

@Module({
  imports: [
    ApplicationModule,
  ],
  controllers: [],
  providers: [
  ],
})

export class AppModule {
}
