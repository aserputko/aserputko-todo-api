import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../todo.entity.js';
import { DeleteTodoCommand } from './delete-todo.command.js';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand, void> {
  constructor(@InjectRepository(Todo) private readonly todos: Repository<Todo>) {}

  async execute({ id }: DeleteTodoCommand): Promise<void> {
    const { affected } = await this.todos.delete({ id });
    if (!affected) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
  }
}
