import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const AgentId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const agentId = request.headers['agent-id'] as string;

    if (!agentId) {
      return null;
    }

    if (!isUUID(agentId)) {
      throw new BadRequestException(
        'El header "agent-id" debe ser un UUID válido',
      );
    }

    return agentId;
  },
);
