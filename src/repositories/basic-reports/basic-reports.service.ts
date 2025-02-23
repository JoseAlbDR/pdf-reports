import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { PassThrough } from 'stream';
import { PrinterService } from 'src/repositories/printer/printer.service';
import { getHelloWorldReport } from 'src/lib/reports';

@Injectable()
export class BasicReportsService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly printerService: PrinterService,
  ) {}

  async health() {
    return this.employeeRepository.find();
  }

  async getEmployees() {
    const employees = await this.employeeRepository.find({});

    return employees;
  }

  async pdfTest(name: string) {
    const docDefinition = getHelloWorldReport({ name });
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    doc.info.Title = 'Test';
    const passThrough = new PassThrough();

    const pdfStream = doc.pipe(passThrough);
    doc.end();

    return pdfStream;
  }
}
