import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AppConfigModule } from './lib/config/config.module';
import { BasicReportsModule } from './repositories/basic-reports/basic-reports.module';
import { PrinterModule } from './repositories/printer/printer.module';

@Module({
  imports: [AppConfigModule, BasicReportsModule, PrinterModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
