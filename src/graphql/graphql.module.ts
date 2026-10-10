import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { formatGraphQLError } from './format-graphql-error.js';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/graphql',
      introspection: !isProduction,
      graphiql: !isProduction,
      includeStacktraceInErrorResponses: false, // !isProduction,
      formatError: formatGraphQLError,
    }),
  ],
})
export class GraphqlModule {}
