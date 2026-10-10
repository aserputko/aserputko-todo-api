import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../todo.entity.js';
import { GetTodoQuery } from './get-todo.query.js';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery, Todo> {
  constructor(@InjectRepository(Todo) private readonly todos: Repository<Todo>) {}

  async execute({ id }: GetTodoQuery): Promise<Todo> {
    const todo = await this.todos.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }
}
