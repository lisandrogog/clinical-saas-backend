import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const tenantId = request.headers['tenant-id'] as string;

    if (!tenantId) {
      throw new BadRequestException('El header "tenant-id" es obligatorio');
    }

    if (!isUUID(tenantId)) {
      throw new BadRequestException(
        'El header "tenant-id" debe ser un UUID válido',
      );
    }

    return tenantId;
  },
);
