import { Injectable } from '@nestjs/common';
import * as path from 'path';
import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: path.join(process.cwd(), 'fonts', 'Roboto-Regular.ttf'),
    bold: path.join(process.cwd(), 'fonts', 'Roboto-Medium.ttf'),
    italics: path.join(process.cwd(), 'fonts', 'Roboto-Italic.ttf'),
    bolditalics: path.join(process.cwd(), 'fonts', 'Roboto-MediumItalic.ttf'),
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);
  createPdfKitDocument(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
