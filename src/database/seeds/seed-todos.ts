import { faker } from '@faker-js/faker';
import { TodoStatus } from '../../todos/todo-status.enum.js';
import { Todo } from '../../todos/todo.entity.js';
import dataSource from '../data-source.js';

const TOTAL = 10_000;
const BATCH_SIZE = 1_000;
const STATUS_SHARES: [TodoStatus, number][] = [
  [TodoStatus.Todo, 0.5],
  [TodoStatus.InProgress, 0.3],
  [TodoStatus.Done, 0.2],
];

function buildStatuses(): TodoStatus[] {
  const statuses = STATUS_SHARES.flatMap(([status, share]) =>
    Array<TodoStatus>(Math.round(TOTAL * share)).fill(status),
  );
  return faker.helpers.shuffle(statuses);
}

function buildTodo(status: TodoStatus): Partial<Todo> {
  const createdAt = faker.date.recent({ days: 90 });
  return {
    title: faker.helpers
      .arrayElement([
        () => `${faker.hacker.verb()} ${faker.hacker.noun()}`,
        () => `${faker.word.verb()} ${faker.commerce.productName().toLowerCase()}`,
        () => faker.lorem.words({ min: 3, max: 6 }),
      ])()
      .replace(/^./, (c) => c.toUpperCase()),
    description:
      faker.helpers.maybe(() => faker.lorem.sentences({ min: 1, max: 3 }), {
        probability: 0.8,
      }) ?? null,
    status,
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
  };
}

await dataSource.initialize();
try {
  const todos = buildStatuses().map(buildTodo);
  const repository = dataSource.getRepository(Todo);
  for (let i = 0; i < todos.length; i += BATCH_SIZE) {
    await repository.insert(todos.slice(i, i + BATCH_SIZE));
  }
  console.log(`Inserted ${todos.length} todos`);
} finally {
  await dataSource.destroy();
}
