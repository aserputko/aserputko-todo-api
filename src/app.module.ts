import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module.js';
import { GraphqlModule } from './graphql/graphql.module.js';
import { HealthModule } from './health/health.module.js';
import { TodosModule } from './todos/todos.module.js';

@Module({
  imports: [DatabaseModule, GraphqlModule, HealthModule, TodosModule],
})
export class AppModule {}
