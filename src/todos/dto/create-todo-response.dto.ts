import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;
}
