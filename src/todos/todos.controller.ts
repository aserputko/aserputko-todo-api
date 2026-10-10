import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTodoCommand } from './commands/create-todo/create-todo.command.js';
import { DeleteTodoCommand } from './commands/delete-todo/delete-todo.command.js';
import { UpdateTodoCommand } from './commands/update-todo/update-todo.command.js';
import { CreateTodoResponseDto } from './dto/create-todo-response.dto.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { ListTodosQueryDto } from './dto/list-todos-query.dto.js';
import { PaginatedTodosResponseDto } from './dto/paginated-todos-response.dto.js';
import { TodoResponseDto } from './dto/todo-response.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { GetTodoQuery } from './queries/get-todo/get-todo.query.js';
import type { PaginatedTodos } from './queries/list-todos/list-todos.handler.js';
import { ListTodosQuery } from './queries/list-todos/list-todos.query.js';
import { Todo } from './todo.entity.js';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a todo' })
  @ApiCreatedResponse({ type: CreateTodoResponseDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async create(@Body() dto: CreateTodoDto): Promise<CreateTodoResponseDto> {
    const id = await this.commandBus.execute<CreateTodoCommand, string>(
      new CreateTodoCommand(dto.title, dto.description, dto.status),
    );
    return { id };
  }

  @Get()
  @ApiOperation({ summary: 'List todos' })
  @ApiOkResponse({ type: PaginatedTodosResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid filter or pagination parameters' })
  list(@Query() { page, pageSize, status }: ListTodosQueryDto): Promise<PaginatedTodos> {
    return this.queryBus.execute(new ListTodosQuery(page, pageSize, status));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: TodoResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update a todo' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Todo updated' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTodoDto): Promise<void> {
    await this.commandBus.execute(
      new UpdateTodoCommand(id, dto.title, dto.description, dto.status),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Todo deleted' })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.commandBus.execute(new DeleteTodoCommand(id));
  }
}
