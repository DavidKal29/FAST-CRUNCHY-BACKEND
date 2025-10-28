import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser());

  app.enableCors({
    origin:process.env.FRONTEND_URL,
    credentials: true
  })
  
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
