import { Repository } from 'typeorm';
import { TodoStatus } from '../../todo-status.enum.js';
import { Todo } from '../../todo.entity.js';
import { ListTodosHandler } from './list-todos.handler.js';
import { ListTodosQuery } from './list-todos.query.js';

describe('ListTodosHandler', () => {
  const todos = { find: vi.fn().mockResolvedValue([]) };
  const handler = new ListTodosHandler(todos as unknown as Repository<Todo>);

  it('lists all todos newest first', async () => {
    await handler.execute(new ListTodosQuery());

    expect(todos.find).toHaveBeenCalledWith({ where: {}, order: { createdAt: 'DESC' } });
  });

  it('filters by status', async () => {
    await handler.execute(new ListTodosQuery(TodoStatus.Done));

    expect(todos.find).toHaveBeenLastCalledWith({
      where: { status: TodoStatus.Done },
      order: { createdAt: 'DESC' },
    });
  });
});
