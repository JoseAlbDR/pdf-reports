import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiService, HealthResponse } from './api.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/health')
  @ApiOperation({
    description: 'Retrieves the status of this service',
  })
  @ApiResponse({
    type: HealthResponse,
    status: HttpStatus.OK,
    description: 'Provides a brief status of this service',
  })
  async health() {
    return this.apiService.health();
  }
}
