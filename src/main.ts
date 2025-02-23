import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { createDoucment } from './swagger/swagger';
import { AppConfigModule } from './lib/config/config.module';
import { AppConfigService } from './lib/config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = app.select(AppConfigModule).get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  createDoucment(app);

  await app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
  });
}
bootstrap();
