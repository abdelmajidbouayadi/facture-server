import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiKeyGuard } from './comun/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.enableCors();
  // app.useGlobalGuards(new ApiKeyGuard());
  // app.useGlobalGuards(new JwtAuthGuard());
  await app.listen(3000);
}
bootstrap();
