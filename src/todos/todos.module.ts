import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTodoHandler } from './commands/create-todo/create-todo.handler.js';
import { DeleteTodoHandler } from './commands/delete-todo/delete-todo.handler.js';
import { UpdateTodoHandler } from './commands/update-todo/update-todo.handler.js';
import { GetTodoHandler } from './queries/get-todo/get-todo.handler.js';
import { ListTodosHandler } from './queries/list-todos/list-todos.handler.js';
import { Todo } from './todo.entity.js';
import { TodosController } from './todos.controller.js';
import { TodosResolver } from './todos.resolver.js';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [
    CreateTodoHandler,
    UpdateTodoHandler,
    DeleteTodoHandler,
    GetTodoHandler,
    ListTodosHandler,
    TodosResolver,
  ],
})
export class TodosModule {}
