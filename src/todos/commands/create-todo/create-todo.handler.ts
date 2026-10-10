import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoStatus } from '../../todo-status.enum.js';
import { Todo } from '../../todo.entity.js';
import { CreateTodoCommand } from './create-todo.command.js';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand, string> {
  constructor(@InjectRepository(Todo) private readonly todos: Repository<Todo>) {}

  async execute({ title, description, status }: CreateTodoCommand): Promise<string> {
    const todo = await this.todos.save(
      this.todos.create({
        title,
        description: description ?? null,
        status: status ?? TodoStatus.Todo,
      }),
    );
    return todo.id;
  }
}
