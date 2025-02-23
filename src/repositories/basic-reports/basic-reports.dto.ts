import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PdfTestQueryParams {
  @ApiProperty({
    required: true,
    example: 'John Doe',
    default: 'John Doe',
  })
  @IsString()
  name: string;
}

export class EmployeeIdParam {
  @ApiProperty({
    required: true,
    example: 1,
    default: 1,
  })
  @IsString()
  id: number;
}
