import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../todo.entity.js';
import { UpdateTodoCommand } from './update-todo.command.js';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand, void> {
  constructor(@InjectRepository(Todo) private readonly todos: Repository<Todo>) {}

  async execute({ id, title, description, status }: UpdateTodoCommand): Promise<void> {
    const todo = await this.todos.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (status !== undefined) todo.status = status;

    await this.todos.save(todo);
  }
}
