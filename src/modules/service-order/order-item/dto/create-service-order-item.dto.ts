import { IsOptional, IsUUID } from 'class-validator';

export class CreateServiceOrderItemDto {
  @IsUUID()
  serviceOrderId: string;

  @IsUUID()
  serviceId: string;

  @IsOptional()
  quantity?: number = 1;

  @IsOptional()
  unitPrice?: number = 0;
}
