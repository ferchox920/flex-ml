import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as  compression from 'compression';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api/v1');

  app.use(
    bodyParser.json({
      limit: '50mb',
    }),
  );

  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
    }),
  );
  //Compress response
  app.use(compression());

  //Activate CORS
  app.enableCors();

  app.use(morgan('dev'));
  app.use(cookieParser());

  // Configurar tubería de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Iniciar la aplicación y escuchar en el puerto especificado
  await app.listen(process.env.PORT, async () => {
    Logger.log(`App listening on port ${process.env.PORT}`, await app.getUrl());
  });
}

bootstrap();
