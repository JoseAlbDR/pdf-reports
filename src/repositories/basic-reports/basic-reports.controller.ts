import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
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

  @Get('pdf-test')
  async pdfTest(@Query('name') name: string) {
    const pdfDoc = await this.basicReportsService.pdfTest(name);

    return new StreamableFile(pdfDoc, {
      type: 'application/pdf',
      disposition: 'inline; filename=test.pdf',
    });
  }
}
