import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../todo-status.enum.js';

export class TodoResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Buy milk' })
  title: string;

  @ApiProperty({ example: '2 liters, lactose free', nullable: true, type: String })
  description: string | null;

  @ApiProperty({ enum: TodoStatus, enumName: 'TodoStatus' })
  status: TodoStatus;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date;
}
