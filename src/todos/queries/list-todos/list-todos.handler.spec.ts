import { Repository } from 'typeorm';
import { TodoStatus } from '../../todo-status.enum.js';
import { Todo } from '../../todo.entity.js';
import { ListTodosHandler } from './list-todos.handler.js';
import { ListTodosQuery } from './list-todos.query.js';

describe('ListTodosHandler', () => {
  const todos = { findAndCount: vi.fn() };
  const handler = new ListTodosHandler(todos as unknown as Repository<Todo>);

  beforeEach(() => {
    vi.resetAllMocks();
    todos.findAndCount.mockResolvedValue([[{ id: 'id' }], 21]);
  });

  it('returns the requested page newest first with the total', async () => {
    const result = await handler.execute(new ListTodosQuery(3, 5));

    expect(todos.findAndCount).toHaveBeenCalledWith({
      where: {},
      order: { createdAt: 'DESC', id: 'ASC' },
      skip: 10,
      take: 5,
    });
    expect(result).toEqual({ items: [{ id: 'id' }], total: 21, page: 3, pageSize: 5 });
  });

  it('filters by status', async () => {
    await handler.execute(new ListTodosQuery(1, 20, TodoStatus.Done));

    expect(todos.findAndCount).toHaveBeenCalledWith({
      where: { status: TodoStatus.Done },
      order: { createdAt: 'DESC', id: 'ASC' },
      skip: 0,
      take: 20,
    });
  });
});
