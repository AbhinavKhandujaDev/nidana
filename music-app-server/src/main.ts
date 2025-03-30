// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

require('dotenv').config();

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
