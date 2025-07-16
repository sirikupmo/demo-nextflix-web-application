// src/health/health.module.ts
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * HealthModule encapsulates the health check functionality.
 * It registers the HealthController.
 */
@Module({
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
