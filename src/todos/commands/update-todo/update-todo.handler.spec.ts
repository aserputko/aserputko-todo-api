import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoStatus } from '../../todo-status.enum.js';
import { Todo } from '../../todo.entity.js';
import { UpdateTodoCommand } from './update-todo.command.js';
import { UpdateTodoHandler } from './update-todo.handler.js';

describe('UpdateTodoHandler', () => {
  const todos = { findOneBy: vi.fn(), save: vi.fn() };
  const handler = new UpdateTodoHandler(todos as unknown as Repository<Todo>);

  beforeEach(() => vi.resetAllMocks());

  it('updates only the provided fields', async () => {
    const todo = { id: 'id', title: 'Old', description: 'Keep', status: TodoStatus.Todo };
    todos.findOneBy.mockResolvedValue(todo);

    await handler.execute(new UpdateTodoCommand('id', 'New', undefined, TodoStatus.Done));

    expect(todos.save).toHaveBeenCalledWith({
      id: 'id',
      title: 'New',
      description: 'Keep',
      status: TodoStatus.Done,
    });
  });

  it('throws NotFoundException when the todo does not exist', async () => {
    todos.findOneBy.mockResolvedValue(null);

    await expect(handler.execute(new UpdateTodoCommand('id', 'New'))).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(todos.save).not.toHaveBeenCalled();
  });
});
