import { IPaginationMetadata } from '@modules/utils/interfaces';
import { ISingleServiceSearch } from '@modules/service-catalog/service/interfaces';
import { Prisma } from '@prisma/client';

export interface IBusinessUnitSearch {
  id: string;
  code: string;
  business_name: string;
  active?: boolean | null;
}

export interface IBusinessUnitSearchResponse {
  data: IBusinessUnitSearch[];
  meta: IPaginationMetadata;
}

export interface ISingleServiceUnitSearch {
  id: string;
  price?: Prisma.Decimal | null;
  cost?: Prisma.Decimal | null;
  service: ISingleServiceSearch;
  business_unit: IBusinessUnitSearch;
}
