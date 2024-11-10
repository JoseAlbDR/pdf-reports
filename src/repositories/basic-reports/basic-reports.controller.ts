import { Controller, Get } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get('health')
  health() {
    return this.basicReportsService.health();
  }

  @Get('employees')
  testEmployee() {
    return this.basicReportsService.getEmployees();
  }
}
