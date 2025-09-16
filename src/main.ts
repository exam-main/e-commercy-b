import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { BigIntToStringInterceptor } from './Common/interceptors/bigint-to-string.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

 
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  
  app.useGlobalPipes(new ValidationPipe());

  
  app.useGlobalInterceptors(new BigIntToStringInterceptor());

  
  const config = new DocumentBuilder()
    .setTitle('Houzing Auth API')
    .setDescription('Authentication uchun login, register endpointlari')
    .setVersion('1.0')
    .addTag('Auth')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
