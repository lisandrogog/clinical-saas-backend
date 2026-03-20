import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const AppModuleId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const appModuleId = request.headers['app-module-id'] as string;

    if (!appModuleId) {
      throw new BadRequestException('El header "app-module-id" es obligatorio');
    }

    if (!isUUID(appModuleId)) {
      throw new BadRequestException(
        'El header "app-module-id" debe ser un UUID válido',
      );
    }

    return appModuleId;
  },
);
