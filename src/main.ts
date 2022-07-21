import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { stringify } from 'yaml';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      // origin: ['http://localhost:9100'],
      origin: '*',
      credentials: true,
    },
    logger: ['verbose', 'log', 'debug', 'warn', 'error'],
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Test')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('TEST')
    // .addServer('/api/v1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync('./swagger-spec.yaml', stringify(document));
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
