import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { PassThrough } from 'stream';
import { PrinterService } from 'src/repositories/printer/printer.service';
import { getEmploymentLetter, getHelloWorldReport } from 'src/lib/reports';
import { PdfTestQueryParams } from './basic-reports.dto';

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

  private createPdfStream(doc: PDFKit.PDFDocument) {
    const passThrough = new PassThrough();
    const pdfStream = doc.pipe(passThrough);
    doc.end();

    return pdfStream;
  }

  async pdfTest(params: PdfTestQueryParams) {
    const { name } = params;
    const docDefinition = getHelloWorldReport({ name });
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    doc.info.Title = 'Test';

    const pdfStream = this.createPdfStream(doc);
    return pdfStream;
  }

  async createEmploymentLetter() {
    const docDefinition = getEmploymentLetter();
    const doc = this.printerService.createPdfKitDocument(docDefinition);
    doc.info.Title = 'Employment Letter';

    const pdfStream = this.createPdfStream(doc);
    return pdfStream;
  }
}
