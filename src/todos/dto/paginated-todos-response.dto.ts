import { ApiProperty } from '@nestjs/swagger';
import { TodoResponseDto } from './todo-response.dto.js';

export class PaginatedTodosResponseDto {
  @ApiProperty({ type: TodoResponseDto, isArray: true })
  items: TodoResponseDto[];

  @ApiProperty({ example: 42, description: 'Total number of todos matching the filter' })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  pageSize: number;
}
