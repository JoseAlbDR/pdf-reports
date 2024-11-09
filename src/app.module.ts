import { Module } from '@nestjs/common';

import { AppConfigModule } from './lib/config/config.service';
import { ApiModule } from './api.module';

@Module({
  imports: [AppConfigModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
