import { PartialType } from '@nestjs/swagger';
import { CreateOrderResourceConsumptionDto } from './create-order-resource-consumption.dto';

export class UpdateOrderResourceConsumptionDto extends PartialType(
  CreateOrderResourceConsumptionDto,
) {}
