import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoCommand } from './commands/create-todo/create-todo.command.js';
import { DeleteTodoCommand } from './commands/delete-todo/delete-todo.command.js';
import { UpdateTodoCommand } from './commands/update-todo/update-todo.command.js';
import { GetTodoQuery } from './queries/get-todo/get-todo.query.js';
import { ListTodosQuery } from './queries/list-todos/list-todos.query.js';
import { TodoStatus } from './todo-status.enum.js';
import { TodosResolver } from './todos.resolver.js';

describe('TodosResolver', () => {
  const commandBus = { execute: vi.fn() };
  const queryBus = { execute: vi.fn() };
  const resolver = new TodosResolver(
    commandBus as unknown as CommandBus,
    queryBus as unknown as QueryBus,
  );
  const id = '6b0f1c1e-3c1a-4a43-9a53-0d9b7f4f2d11';

  it('todos dispatches ListTodosQuery', async () => {
    const page = { items: [], total: 0, page: 2, pageSize: 5 };
    queryBus.execute.mockResolvedValueOnce(page);

    const result = await resolver.todos({ page: 2, pageSize: 5, status: TodoStatus.Done });

    expect(queryBus.execute).toHaveBeenCalledWith(new ListTodosQuery(2, 5, TodoStatus.Done));
    expect(result).toBe(page);
  });

  it('todo dispatches GetTodoQuery', async () => {
    const todo = { id };
    queryBus.execute.mockResolvedValueOnce(todo);

    await expect(resolver.todo(id)).resolves.toBe(todo);
    expect(queryBus.execute).toHaveBeenLastCalledWith(new GetTodoQuery(id));
  });

  it('createTodo dispatches CreateTodoCommand and returns the id', async () => {
    commandBus.execute.mockResolvedValueOnce(id);

    const result = await resolver.createTodo({
      title: 'Buy milk',
      description: '2 liters',
      status: TodoStatus.InProgress,
    });

    expect(commandBus.execute).toHaveBeenCalledWith(
      new CreateTodoCommand('Buy milk', '2 liters', TodoStatus.InProgress),
    );
    expect(result).toBe(id);
  });

  it('updateTodo dispatches UpdateTodoCommand and returns true', async () => {
    commandBus.execute.mockResolvedValueOnce(undefined);

    await expect(resolver.updateTodo(id, { title: 'New' })).resolves.toBe(true);
    expect(commandBus.execute).toHaveBeenLastCalledWith(
      new UpdateTodoCommand(id, 'New', undefined, undefined),
    );
  });

  it('deleteTodo dispatches DeleteTodoCommand and returns true', async () => {
    commandBus.execute.mockResolvedValueOnce(undefined);

    await expect(resolver.deleteTodo(id)).resolves.toBe(true);
    expect(commandBus.execute).toHaveBeenLastCalledWith(new DeleteTodoCommand(id));
  });
});
