---
description: Implement every use case as a NestJS CQRS command or query. Use when adding or changing any API endpoint, feature, or business logic in src/.
applyTo: 'src/**/*.ts'
---

# Use cases: NestJS CQRS (command / query)

Every use case is exactly one command or one query, built with `@nestjs/cqrs`. Install it if missing: `npm i @nestjs/cqrs`.

## Rules

- State change (create, update, delete) is a **command**. Read-only is a **query**. Never mix the two.
- One use case = one message class + one handler. No use-case logic in controllers or services.
- Controllers only map the HTTP request to a command/query and dispatch it via `CommandBus` / `QueryBus`. No business logic, no repository calls.
- Commands return only an id or nothing; queries return data and never mutate state.
- Handlers depend on injected providers (e.g. repositories), never on other handlers or buses. Share logic through a provider.
- Register every handler in the feature module's `providers`; the module imports `CqrsModule`.

## Layout (per feature)

```
src/<feature>/
  <feature>.module.ts
  <feature>.controller.ts
  commands/<verb>-<noun>/
    <verb>-<noun>.command.ts
    <verb>-<noun>.handler.ts
    <verb>-<noun>.handler.spec.ts
  queries/<get|list>-<noun>/
    <get|list>-<noun>.query.ts
    <get|list>-<noun>.handler.ts
    <get|list>-<noun>.handler.spec.ts
```

## Naming

- Commands: imperative verb, e.g. `CreateTodoCommand`, `CompleteTodoCommand`.
- Queries: `GetTodoQuery`, `ListTodosQuery`.
- Handlers: `<Message>Handler`.

## Pattern

Message classes are plain, immutable data holders. Imports use the `.js` extension (ESM).

```ts
// commands/create-todo/create-todo.command.ts
export class CreateTodoCommand {
  constructor(public readonly title: string) {}
}
```

```ts
// commands/create-todo/create-todo.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from './create-todo.command.js';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand, string> {
  constructor(private readonly todos: TodoRepository) {}

  async execute({ title }: CreateTodoCommand): Promise<string> {
    return this.todos.create({ title });
  }
}
```

```ts
// queries/get-todo/get-todo.handler.ts
@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery, Todo> {
  constructor(private readonly todos: TodoRepository) {}

  async execute({ id }: GetTodoQuery): Promise<Todo> {
    return this.todos.findOneOrFail(id);
  }
}
```

```ts
// <feature>.controller.ts
@Post()
create(@Body() dto: CreateTodoDto): Promise<string> {
  return this.commandBus.execute(new CreateTodoCommand(dto.title));
}

@Get(':id')
get(@Param('id') id: string): Promise<Todo> {
  return this.queryBus.execute(new GetTodoQuery(id));
}
```

## Testing

- Unit-test each handler in isolation with a mocked repository (no buses, no HTTP).
- Cover endpoints end to end in `test/` via `supertest`.
