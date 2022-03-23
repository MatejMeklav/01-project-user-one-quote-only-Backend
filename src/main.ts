import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => console.log(error));

  await app.listen(3000);
}
bootstrap();
