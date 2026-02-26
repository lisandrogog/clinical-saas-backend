import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const BusinessUnitId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const businessUnitId = request.headers['business-unit-id'] as string;

    if (!businessUnitId) {
      throw new BadRequestException(
        'El header "business-unit-id" es obligatorio',
      );
    }

    if (!isUUID(businessUnitId)) {
      throw new BadRequestException(
        'El header "business-unit-id" debe ser un UUID válido',
      );
    }

    return businessUnitId;
  },
);
