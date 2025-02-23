import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

import * as path from 'path';
import { Employee } from 'src/repositories/employees/entities/employee.entity';

const employer = {
  name: 'Jose Alberto',
  position: 'CEO',
  company: 'Jadero',
};

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 20],
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
    lineHeight: 1.2,
  },
  logo: {
    alignment: 'right',
    margin: [0, 40, 30, 0],
    fontSize: 15,
    bold: true,
  },
};

const logo: Content = {
  image: path.join(process.cwd(), 'src', 'assets', 'tucan-code-logo.png'),
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 120],
};

export const getEmploymentLetter = (
  employee: Employee,
): TDocumentDefinitions => {
  const docDefinitions: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],

    header: {
      columns: [
        logo,
        {
          text: `${new Date().toLocaleDateString('es-ES', dateOptions)}`,
          style: 'logo',
        },
      ],
    },
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employer.name}, en mi calidad de ${employer.position} de ${employer.company}, por medio de la presente certifico que ${employee.name} ha sido empleado en nuestra empresa desde el ${employee.start_date}.`,
        style: 'body',
      },
      {
        text: `Durante su empleo, el Sr./Sra. ${employee.name} ha desempeñado el cargo de ${employee.position}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.`,
        style: 'body',
      },
      {
        text: `La jornada laboral del Sr./ Sra. ${employee.name} es de ${employee.hours_per_day} horas semanales, con un horario de ${employee.work_schedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.`,
        style: 'body',
      },
      {
        text: `Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      {
        text: `Atentamente,`,
        style: 'signature',
        margin: [0, 60, 0, 0],
      },
      {
        text: `${employer.name}`,
        style: 'signature',
      },
      {
        text: `${employer.position}`,
        style: 'signature',
      },
      {
        text: `${employer.company}`,
        style: 'signature',
      },
      {
        text: `${new Date().toLocaleDateString('es-ES', dateOptions)}`,
        style: 'signature',
      },
    ],
    footer: {
      text: `Este documento es una constancia de empleo y no representa un compromiso laboral.`,
      alignment: 'center',
      style: {
        italics: true,
      },
    },
  };

  return docDefinitions;
};
