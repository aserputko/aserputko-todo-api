import { join } from 'node:path';
import type { DataSourceOptions } from 'typeorm';

export function getDataSourceOptions(env: NodeJS.ProcessEnv = process.env): DataSourceOptions {
  return {
    type: 'postgres',
    host: env.DB_HOST ?? 'localhost',
    port: Number(env.DB_PORT ?? 5432),
    username: env.DB_USERNAME ?? 'postgres',
    password: env.DB_PASSWORD ?? 'postgres',
    database: env.DB_NAME ?? 'todo',
    entities: [join(import.meta.dirname, '..', '**', '*.entity.{js,ts}')],
    migrations: [join(import.meta.dirname, 'migrations', '*.{js,ts}')],
    // Schema changes go through migrations only.
    synchronize: false,
  };
}
