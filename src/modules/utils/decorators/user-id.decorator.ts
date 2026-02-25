import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = request.headers['user-id'] as string;

    if (!userId) {
      return null;
    }

    if (!isUUID(userId)) {
      throw new BadRequestException(
        'El header "user-id" debe ser un UUID válido',
      );
    }

    return userId;
  },
);
