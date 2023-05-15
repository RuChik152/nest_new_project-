import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from "express";
import * as compression from 'compression';
import { ExpressAdapter } from "@nestjs/platform-express";

//TODO
// const expressApp = express();
// expressApp.use(compression({filter: () => {return true},level:6, threshold:0}))
// const expressAdapter = new ExpressAdapter(expressApp)
const PORT = 5555;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //TODO
  //const app = await NestFactory.create(AppModule, expressAdapter);

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
  //TODO
  //app.use(compression({filter: () => {return true},level:6, threshold:0}));
  await app.listen(PORT, () => {
    console.log(`SERVER START, ${new Date()}, 
      MAIN SERVER => http://localhost:${PORT}
      SWAGGER SERVER => http://localhost:${PORT}/admin/api
      `);
  });
}
bootstrap();
