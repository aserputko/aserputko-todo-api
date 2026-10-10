import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../../todo.entity.js';
import { DeleteTodoCommand } from './delete-todo.command.js';
import { DeleteTodoHandler } from './delete-todo.handler.js';

describe('DeleteTodoHandler', () => {
  const todos = { delete: vi.fn() };
  const handler = new DeleteTodoHandler(todos as unknown as Repository<Todo>);

  beforeEach(() => vi.resetAllMocks());

  it('deletes the todo', async () => {
    todos.delete.mockResolvedValue({ affected: 1 });

    await handler.execute(new DeleteTodoCommand('id'));

    expect(todos.delete).toHaveBeenCalledWith({ id: 'id' });
  });

  it('throws NotFoundException when nothing was deleted', async () => {
    todos.delete.mockResolvedValue({ affected: 0 });

    await expect(handler.execute(new DeleteTodoCommand('id'))).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
