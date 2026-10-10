import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from './dto/health-response.dto.js';
import { HealthQuery } from './queries/health/health.query.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiOkResponse({ type: HealthResponseDto })
  health(): Promise<HealthResponseDto> {
    return this.queryBus.execute(new HealthQuery());
  }
}
