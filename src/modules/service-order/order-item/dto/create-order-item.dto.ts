import { IsOptional, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  serviceId: string;

  @IsOptional()
  quantity?: number = 1;

  @IsOptional()
  unitPrice?: number = 0;
}
