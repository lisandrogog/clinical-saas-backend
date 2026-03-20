import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { type HealthResponse, HealthService } from '../services/health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  getHealth(): HealthResponse {
    return this.healthService.getLiveness();
  }

  @Get('health/ready')
  async getReadiness(): Promise<HealthResponse> {
    const readiness = await this.healthService.getReadiness();

    if (readiness.status === 'error') {
      throw new ServiceUnavailableException(readiness);
    }

    return readiness;
  }
}
