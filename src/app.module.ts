import { Module } from '@nestjs/common';

import { ApiModule } from './api.module';
import { AppConfigModule } from './lib/config/config.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [AppConfigModule, ApiModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
