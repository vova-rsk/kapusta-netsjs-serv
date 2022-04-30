import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.SERV_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // create swagger documenting for the app
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Kapusta')
    .setDescription('Application for financial accounting')
    .setVersion('1.0.0')
    .addTag('REST API')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  // start server app
  await app.listen(PORT, () =>
    console.log(`Server started successfully on port ${PORT}`),
  );
}
bootstrap();
