import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma.service';

type CheckStatus = 'up' | 'down';
type OverallStatus = 'ok' | 'error';

interface HealthCheck {
  name: string;
  status: CheckStatus;
  responseTimeMs: number;
  message?: string;
}

export interface HealthResponse {
  status: OverallStatus;
  service: string;
  timestamp: string;
  uptimeMs: number;
  checks: HealthCheck[];
}

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  getLiveness(): HealthResponse {
    return {
      status: 'ok',
      service: 'clinical-saas-backend',
      timestamp: new Date().toISOString(),
      uptimeMs: Math.round(process.uptime() * 1000),
      checks: [{ name: 'api', status: 'up', responseTimeMs: 0 }],
    };
  }

  async getReadiness(): Promise<HealthResponse> {
    const databaseCheck = await this.checkDatabase();

    return {
      status: databaseCheck.status === 'up' ? 'ok' : 'error',
      service: 'clinical-saas-backend',
      timestamp: new Date().toISOString(),
      uptimeMs: Math.round(process.uptime() * 1000),
      checks: [databaseCheck],
    };
  }

  private async checkDatabase(): Promise<HealthCheck> {
    const timeoutMs = Number(process.env.HEALTH_DB_TIMEOUT_MS ?? 3000);
    const startedAt = Date.now();

    try {
      await Promise.race([
        this.prisma.$queryRawUnsafe('SELECT 1'),
        this.rejectAfter(timeoutMs),
      ]);

      return {
        name: 'database',
        status: 'up',
        responseTimeMs: Date.now() - startedAt,
      };
    } catch (error) {
      return {
        name: 'database',
        status: 'down',
        responseTimeMs: Date.now() - startedAt,
        message:
          error instanceof Error
            ? error.message
            : 'Unknown database health check error',
      };
    }
  }

  private rejectAfter(timeoutMs: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Database health check timeout after ${timeoutMs}ms`));
      }, timeoutMs);
    });
  }
}
