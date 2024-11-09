import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEmployee } from '../interfaces/employee.interface';

@Entity('employees')
export class Employee implements IEmployee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'position', type: 'varchar' })
  position: string;

  @Column({ name: 'start_date', type: 'date' })
  start_date: Date;

  @Column({ name: 'work_time', type: 'time' })
  work_time: string;

  @Column({ name: 'hours_per_day', type: 'int' })
  hours_per_day: number;

  @Column({ name: 'work_schedule', type: 'varchar' })
  work_schedule: string;
}
