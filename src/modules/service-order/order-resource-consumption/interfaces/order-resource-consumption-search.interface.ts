import { IPaginationMetadata } from '@modules/utils/interfaces';
import { Prisma } from '@prisma/client';

export interface IOrderResourceConsumptionSearch {
  id: string;
  service_order_id: string;
  material_resource_id: string;
  quantity_used: Prisma.Decimal | number;
}

export interface IOrderResourceConsumptionSearchResponse {
  data: IOrderResourceConsumptionSearch[];
  meta: IPaginationMetadata;
}
