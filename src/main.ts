import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = 5555;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('BeliVR__API')
    .setDescription('The API')
    .setVersion('Alfa 0.02')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('admin/api', app, document);


  await app.listen(PORT, () => {
      console.log(`SERVER START, ${new Date()}, 
      MAIN SERVER => http://localhost:${PORT}
      SWAGGER SERVER => http://localhost:${PORT}/admin/api
      `)
  });
}
bootstrap();
