import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { HealthType } from './graphql/health.type.js';
import { HealthQuery } from './queries/health/health.query.js';

@Resolver()
export class HealthResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => HealthType)
  health(): Promise<HealthType> {
    return this.queryBus.execute(new HealthQuery());
  }
}
