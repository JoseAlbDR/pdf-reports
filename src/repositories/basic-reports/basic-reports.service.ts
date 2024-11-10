import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';
import PdfPrinter from 'pdfmake';
import * as path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PassThrough } from 'stream';

const fonts = {
  Roboto: {
    normal: path.join(process.cwd(), 'fonts', 'Roboto-Regular.ttf'),
    bold: path.join(process.cwd(), 'fonts', 'Roboto-Medium.ttf'),
    italics: path.join(process.cwd(), 'fonts', 'Roboto-Italic.ttf'),
    bolditalics: path.join(process.cwd(), 'fonts', 'Roboto-MediumItalic.ttf'),
  },
};

@Injectable()
export class BasicReportsService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async health() {
    return this.employeeRepository.find();
  }

  async getEmployees() {
    const employees = await this.employeeRepository.find({});
    console.log({ employees });

    return employees;
  }

  async pdfTest() {
    const printer = new PdfPrinter(fonts);
    const docDefinition: TDocumentDefinitions = {
      content: ['Hello there'],
    };
    const doc = printer.createPdfKitDocument(docDefinition);
    doc.info.Title = 'Test';
    const passThrough = new PassThrough();

    const pdfStream = doc.pipe(passThrough);
    doc.end();

    return pdfStream;
  }
}
