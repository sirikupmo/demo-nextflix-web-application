// src/health/health.controller.ts
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

/**
 * HealthController provides a simple endpoint for health checks.
 * This is typically used by monitoring services UptimeRobot
 * to keep a free-tier instance alive and check its operational status.
 */
@Controller('health') // Defines the base path for this controller as /health
export class HealthController {
  /**
   * Handles GET requests to the /health endpoint.
   * Returns a 200 OK status with a simple message indicating the service is up.
   * @returns An object indicating the service status.
   */
  @Get()
  @HttpCode(HttpStatus.OK) // Explicitly set HTTP status to 200 OK
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(), // Include a timestamp for more useful logging
    };
  }
}