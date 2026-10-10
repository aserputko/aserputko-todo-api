import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../todo.entity.js';
import { ListTodosQuery } from './list-todos.query.js';

@QueryHandler(ListTodosQuery)
export class ListTodosHandler implements IQueryHandler<ListTodosQuery, Todo[]> {
  constructor(@InjectRepository(Todo) private readonly todos: Repository<Todo>) {}

  execute({ status }: ListTodosQuery): Promise<Todo[]> {
    return this.todos.find({
      where: status ? { status } : {},
      order: { createdAt: 'DESC' },
    });
  }
}
