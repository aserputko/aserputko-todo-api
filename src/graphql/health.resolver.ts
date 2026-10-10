import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { HealthQuery } from './queries/health/health.query.js';

@Resolver()
export class HealthResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => String)
  health(): Promise<string> {
    return this.queryBus.execute(new HealthQuery());
  }
}
