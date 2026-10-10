import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../todo.entity.js';
import { ListTodosQuery } from './list-todos.query.js';

export interface PaginatedTodos {
  items: Todo[];
  total: number;
  page: number;
  pageSize: number;
}

@QueryHandler(ListTodosQuery)
export class ListTodosHandler implements IQueryHandler<ListTodosQuery, PaginatedTodos> {
  constructor(@InjectRepository(Todo) private readonly todos: Repository<Todo>) {}

  async execute({ page, pageSize, status }: ListTodosQuery): Promise<PaginatedTodos> {
    const [items, total] = await this.todos.findAndCount({
      where: status ? { status } : {},
      order: { createdAt: 'DESC', id: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }
}
