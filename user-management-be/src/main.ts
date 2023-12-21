import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './infrastructure/shared/filters/global-exception.filter';

async function bootstrap() {
  const mainAppLogger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  const applicationConfig = app.get<ConfigService>(ConfigService).get('applicationConfig');
  const port = app.get<ConfigService>(ConfigService).get('port');

  const config = new DocumentBuilder()
    .setTitle(applicationConfig.serverTitle)
    .setDescription(applicationConfig.applicationServerDescription)
    .setVersion(applicationConfig.apiVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${applicationConfig.swaggerUri}`, app, document);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  })

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapter));

  await app.listen(+port);

  mainAppLogger.log(`Application is listening to port ${port}`);
}

bootstrap();
