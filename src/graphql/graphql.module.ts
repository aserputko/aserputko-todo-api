import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { HealthResolver } from './health.resolver.js';
import { HealthHandler } from './queries/health/health.handler.js';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    CqrsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/graphql',
      introspection: !isProduction,
      graphiql: !isProduction,
    }),
  ],
  providers: [HealthHandler, HealthResolver],
})
export class GraphqlModule {}
