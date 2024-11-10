import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';
import { ConfigService } from '@nestjs/config';
import basicAuth from 'express-basic-auth';

export function createDoucment(app: INestApplication) {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'authorization',
    )
    .setVersion(SWAGGER_CONFIG.version);

  for (const tag of SWAGGER_CONFIG.tags) {
    builder.addTag(tag);
  }

  const options = builder.build();
  const username: any = app.get(ConfigService).get('SWAGGER_USERNAME');
  const password: any = app.get(ConfigService).get('SWAGGER_PASSWORD');

  app.use(
    '/docs',
    basicAuth({
      challenge: true,
      users: {
        [username]: password,
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);
}
