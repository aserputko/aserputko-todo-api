import { ParseUUIDPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoCommand } from './commands/create-todo/create-todo.command.js';
import { DeleteTodoCommand } from './commands/delete-todo/delete-todo.command.js';
import { UpdateTodoCommand } from './commands/update-todo/update-todo.command.js';
import { CreateTodoInput } from './graphql/create-todo.input.js';
import { ListTodosArgs } from './graphql/list-todos.args.js';
import { PaginatedTodosType } from './graphql/paginated-todos.type.js';
import { TodoType } from './graphql/todo.type.js';
import { UpdateTodoInput } from './graphql/update-todo.input.js';
import { GetTodoQuery } from './queries/get-todo/get-todo.query.js';
import type { PaginatedTodos } from './queries/list-todos/list-todos.handler.js';
import { ListTodosQuery } from './queries/list-todos/list-todos.query.js';
import { Todo } from './todo.entity.js';

@Resolver()
export class TodosResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => PaginatedTodosType)
  todos(@Args() { page, pageSize, status }: ListTodosArgs): Promise<PaginatedTodos> {
    return this.queryBus.execute(new ListTodosQuery(page, pageSize, status));
  }

  @Query(() => TodoType)
  todo(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<Todo> {
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @Mutation(() => ID)
  createTodo(@Args('input') input: CreateTodoInput): Promise<string> {
    return this.commandBus.execute(
      new CreateTodoCommand(input.title, input.description, input.status),
    );
  }

  @Mutation(() => Boolean)
  async updateTodo(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('input') input: UpdateTodoInput,
  ): Promise<boolean> {
    await this.commandBus.execute(
      new UpdateTodoCommand(id, input.title, input.description, input.status),
    );
    return true;
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<boolean> {
    await this.commandBus.execute(new DeleteTodoCommand(id));
    return true;
  }
}
