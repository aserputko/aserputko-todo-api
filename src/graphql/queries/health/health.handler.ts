import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HealthQuery } from './health.query.js';

@QueryHandler(HealthQuery)
export class HealthHandler implements IQueryHandler<HealthQuery, string> {
  async execute(): Promise<string> {
    return 'ok';
  }
}
