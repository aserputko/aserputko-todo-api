import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TodoStatus } from '../todo-status.enum.js';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy milk', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: '2 liters, lactose free', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TodoStatus, enumName: 'TodoStatus', default: TodoStatus.Todo })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
