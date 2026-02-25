import { IPaginationMetadata } from '@modules/utils/interfaces';
import { Prisma } from '@prisma/client';

export interface IServiceSearch {
  id: string;
  code: string;
  name: string;
  active?: boolean | null;
  service_category_id: string;
}

export interface IServiceSearchResponse {
  data: IServiceSearch[];
  meta: IPaginationMetadata;
}

export interface ISingleServiceSearch {
  id: string;
  code: string;
  name: string;
  active?: boolean | null;
  service_category_id: string;
  base_price: Prisma.Decimal;
  base_cost: Prisma.Decimal;
}
