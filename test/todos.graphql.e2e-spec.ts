import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('Todos GraphQL (e2e)', () => {
  let app: INestApplication<App>;

  const gql = (query: string, variables?: Record<string, unknown>) =>
    request(app.getHttpServer()).post('/graphql').send({ query, variables }).expect(200);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates, reads, lists, updates and deletes a todo', async () => {
    const ok = await gql(`mutation ($input: CreateTodoInput!) { createTodo(input: $input) }`, {
      input: { title: 'GraphQL e2e', description: 'desc' },
    });
    const id: string = ok.body.data.createTodo;
    expect(id).toEqual(expect.any(String));

    const one = await gql(
      `query ($id: ID!) { todo(id: $id) { id title description status createdAt } }`,
      { id },
    );
    expect(one.body.data.todo).toMatchObject({
      id,
      title: 'GraphQL e2e',
      description: 'desc',
      status: 'Todo',
    });

    const list = await gql(
      `query { todos(status: Todo, page: 1, pageSize: 100) { items { id } total page pageSize } }`,
    );
    expect(list.body.data.todos.page).toBe(1);
    expect(list.body.data.todos.items.map((t: { id: string }) => t.id)).toContain(id);

    const updated = await gql(
      `mutation ($id: ID!, $input: UpdateTodoInput!) { updateTodo(id: $id, input: $input) }`,
      { id, input: { status: 'Done' } },
    );
    expect(updated.body.data.updateTodo).toBe(true);

    const deleted = await gql(`mutation ($id: ID!) { deleteTodo(id: $id) }`, { id });
    expect(deleted.body.data.deleteTodo).toBe(true);

    const missing = await gql(`query ($id: ID!) { todo(id: $id) { id } }`, { id });
    expect(missing.body.errors[0].message).toContain('not found');
  });

  it('rejects an empty title and an invalid id', async () => {
    const emptyTitle = await gql(`mutation { createTodo(input: { title: "" }) }`);
    expect(emptyTitle.body.errors).toBeDefined();

    const badId = await gql(`query { todo(id: "nope") { id } }`);
    expect(badId.body.errors).toBeDefined();
  });
});
