import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv-safe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Address API')
    .setDescription('RESTful API for address parsing and normalization using libpostal')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Address API running on: ${process.env.API_BASE_URL || `http://localhost:${port}`}`);
  console.log(`Swagger docs available at: ${process.env.API_BASE_URL || `http://localhost:${port}`}/api`);
}
bootstrap();
