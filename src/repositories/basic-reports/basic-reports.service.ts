import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';

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
}
