import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const CustomerId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const customerId = request.headers['customer-id'] as string;

    if (!customerId) {
      return null;
    }

    if (!isUUID(customerId)) {
      throw new BadRequestException(
        'El header "customer-id" debe ser un UUID válido',
      );
    }

    return customerId;
  },
);
