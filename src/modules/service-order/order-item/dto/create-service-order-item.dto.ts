import { IsUUID } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateServiceOrderItemDto extends CreateOrderItemDto {
  @IsUUID()
  serviceOrderId: string;
}
