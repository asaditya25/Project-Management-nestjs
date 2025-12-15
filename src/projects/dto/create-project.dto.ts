import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'E-commerce Website',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'Detailed description of the project',
    example: 'Build a complete e-commerce platform with payment integration',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID of the user who owns this project',
    example: 1,
    type: Number,
  })
  @IsInt()
  ownerId: number;
}