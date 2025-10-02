import { ValidationPipe, } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  const config = new DocumentBuilder()
  .setTitle('Ecommerce API')
  .setDescription('API for ecommerce website')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  app.useGlobalInterceptors(
    new LoggingInterceptor()
  )
  app.enableCors();
  const PORT = process.env.PORT ?? 3000
   app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT} `)
  });
}


bootstrap();
