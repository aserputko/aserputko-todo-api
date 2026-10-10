import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TodoStatus } from '../todo-status.enum.js';

export class UpdateTodoDto {
  @ApiPropertyOptional({ example: 'Buy oat milk', maxLength: 255 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ example: '1 liter', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TodoStatus, enumName: 'TodoStatus' })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
