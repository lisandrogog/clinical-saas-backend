import { IsOptional, IsUUID } from 'class-validator';

export class CreateServiceOrderDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  agentId: string;

  @IsOptional()
  totalAmount?: number = 0;

  @IsOptional()
  scheduledAt?: Date;

  @IsOptional()
  extraData?: Record<string, any>;
}
