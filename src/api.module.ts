import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AppConfigModule } from './lib/config/config.module';

@Module({
  imports: [AppConfigModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
