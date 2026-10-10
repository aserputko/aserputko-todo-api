import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HealthController } from './health.controller.js';
import { HealthResolver } from './health.resolver.js';
import { HealthHandler } from './queries/health/health.handler.js';

@Module({
  imports: [CqrsModule],
  controllers: [HealthController],
  providers: [HealthHandler, HealthResolver],
})
export class HealthModule {}
