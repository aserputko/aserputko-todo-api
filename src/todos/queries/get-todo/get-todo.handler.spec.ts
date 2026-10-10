import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../../todo.entity.js';
import { GetTodoHandler } from './get-todo.handler.js';
import { GetTodoQuery } from './get-todo.query.js';

describe('GetTodoHandler', () => {
  const todos = { findOneBy: vi.fn() };
  const handler = new GetTodoHandler(todos as unknown as Repository<Todo>);

  beforeEach(() => vi.resetAllMocks());

  it('returns the todo', async () => {
    const todo = { id: 'id', title: 'Buy milk' };
    todos.findOneBy.mockResolvedValue(todo);

    await expect(handler.execute(new GetTodoQuery('id'))).resolves.toBe(todo);
    expect(todos.findOneBy).toHaveBeenCalledWith({ id: 'id' });
  });

  it('throws NotFoundException when the todo does not exist', async () => {
    todos.findOneBy.mockResolvedValue(null);

    await expect(handler.execute(new GetTodoQuery('id'))).rejects.toBeInstanceOf(NotFoundException);
  });
});
