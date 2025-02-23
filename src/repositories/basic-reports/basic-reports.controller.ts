import { Controller, Get, Param, Query, StreamableFile } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeeIdParam, PdfTestQueryParams } from './basic-reports.dto';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get('health')
  health() {
    return this.basicReportsService.health();
  }

  @ApiOperation({
    summary: 'Get all employees',
    description: 'Get all employees stored in the database',
  })
  @ApiOkResponse({ description: 'Get all employees', type: [Employee] })
  @Get('employees')
  testEmployee() {
    return this.basicReportsService.getEmployees();
  }

  @ApiOperation({
    summary: 'Get employee by id',
    description: 'Get employee by id',
  })
  @ApiOkResponse({ description: 'Get employee by id', type: Employee })
  @Get('employees/:id')
  getEmployeeById(@Param() param: EmployeeIdParam) {
    return this.basicReportsService.getEmployeeById(param);
  }

  @ApiOperation({
    summary: 'PDF test',
    description: 'Generate a PDF test given a name',
  })
  @ApiOkResponse({ description: 'Generated pdf' })
  @Get('pdf-test')
  async pdfTest(@Query() params: PdfTestQueryParams) {
    const pdfDoc = await this.basicReportsService.pdfTest(params);

    return new StreamableFile(pdfDoc, {
      type: 'application/pdf',
      disposition: 'inline; filename=test.pdf',
    });
  }

  @ApiOperation({
    summary: 'Employment letter',
    description: 'Generate an employment letter',
  })
  @Get('employment-letter/:id')
  async employmentLetter(@Param() param: EmployeeIdParam) {
    const pdfDoc = await this.basicReportsService.createEmploymentLetter(param);

    return new StreamableFile(pdfDoc, {
      type: 'application/pdf',
      disposition: 'inline; filename=employment-letter.pdf',
    });
  }
}
