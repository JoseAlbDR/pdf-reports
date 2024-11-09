import { Injectable } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiResponseProperty({
    example: 'reports-server-api',
  })
  service_name: string;

  @ApiResponseProperty({
    example: '0.0.0',
    type: 'string',
  })
  version: string;

  @ApiResponseProperty({
    example: 'RUNNING',
  })
  status: string;
}

@Injectable()
export class ApiService {
  health(): HealthResponse {
    return {
      service_name: 'reports-server-api',
      version: '0.0.0',
      status: 'RUNNING',
    };
  }
}
