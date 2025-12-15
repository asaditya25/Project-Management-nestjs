import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Priority, TaskStatus } from '@prisma/client';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Setup Database Schema - Updated',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Updated description with more details',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Current status of the task',
    enum: TaskStatus,
    example: 'IN_PROGRESS',
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    description: 'Priority level of the task',
    enum: Priority,
    example: 'URGENT',
    required: false,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiProperty({
    description: 'ID of the user assigned to this task (set to null to unassign)',
    example: 2,
    type: Number,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  assigneeId?: number;

  @ApiProperty({
    description: 'Due date and time for the task (ISO 8601 format)',
    example: '2025-12-25T15:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}