import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Priority, TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Setup Database Schema',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  @Length(3, 200)
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Design and implement database tables with proper relationships',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Current status of the task',
    enum: TaskStatus,
    example: 'TODO',
    required: false,
    default: 'TODO',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    description: 'Priority level of the task',
    enum: Priority,
    example: 'HIGH',
    required: false,
    default: 'MEDIUM',
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiProperty({
    description: 'ID of the user assigned to this task',
    example: 1,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  assigneeId?: number;

  @ApiProperty({
    description: 'Due date and time for the task (ISO 8601 format)',
    example: '2025-12-20T10:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}