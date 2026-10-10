import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HealthResponseDto } from '../../dto/health-response.dto.js';
import { HealthQuery } from './health.query.js';

@QueryHandler(HealthQuery)
export class HealthHandler implements IQueryHandler<HealthQuery, HealthResponseDto> {
  async execute(): Promise<HealthResponseDto> {
    return { status: 'ok' };
  }
}
