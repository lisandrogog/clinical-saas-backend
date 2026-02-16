import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceOrderDetailDto } from './create-service-order-detail.dto';

export class UpdateServiceOrderDetailDto extends PartialType(
  CreateServiceOrderDetailDto,
) {}
