import { Repository } from 'typeorm';
import { TodoStatus } from '../../todo-status.enum.js';
import { Todo } from '../../todo.entity.js';
import { CreateTodoCommand } from './create-todo.command.js';
import { CreateTodoHandler } from './create-todo.handler.js';

describe('CreateTodoHandler', () => {
  const todos = {
    create: vi.fn((todo: Partial<Todo>) => todo),
    save: vi.fn((todo: Partial<Todo>) => Promise.resolve({ ...todo, id: 'todo-id' })),
  };
  const handler = new CreateTodoHandler(todos as unknown as Repository<Todo>);

  it('applies defaults and returns the new id', async () => {
    const id = await handler.execute(new CreateTodoCommand('Buy milk'));

    expect(todos.create).toHaveBeenCalledWith({
      title: 'Buy milk',
      description: null,
      status: TodoStatus.Todo,
    });
    expect(id).toBe('todo-id');
  });

  it('uses the provided description and status', async () => {
    await handler.execute(new CreateTodoCommand('Buy milk', '2 liters', TodoStatus.Done));

    expect(todos.create).toHaveBeenLastCalledWith({
      title: 'Buy milk',
      description: '2 liters',
      status: TodoStatus.Done,
    });
  });
});
