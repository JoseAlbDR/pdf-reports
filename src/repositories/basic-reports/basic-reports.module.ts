import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { PrinterModule } from 'src/repositories/printer/printer.module';
import { PrinterService } from 'src/repositories/printer/printer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), PrinterModule],
  controllers: [BasicReportsController],
  providers: [BasicReportsService, PrinterService],
})
export class BasicReportsModule {}
