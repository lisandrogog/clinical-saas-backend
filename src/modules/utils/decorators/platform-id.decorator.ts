import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const PlatformId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const platformId = request.headers['platform-id'] as string;

    if (!platformId) {
      throw new BadRequestException('El header "platform-id" es obligatorio');
    }

    if (!isUUID(platformId)) {
      throw new BadRequestException(
        'El header "platform-id" debe ser un UUID válido',
      );
    }

    return platformId;
  },
);
