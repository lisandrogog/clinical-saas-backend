import { IPaginationMetadata } from '@modules/utils/interfaces';
import { Prisma } from '@prisma/client';

export interface IOrderSearch {
  id: string;
  document_number: string;
  scheduled_at?: Date | null;
  total_amount: Prisma.Decimal;
  document_status_id: number;
  created_at: Date;
  created_by?: string | null;
}

export interface IOrderSearchResponse {
  data: IOrderSearch[];
  meta: IPaginationMetadata;
}

export interface IBusinessPartner {
  identification_type_id: number;
  identification_number: string;
  first_name: string | null;
  last_name: string | null;
}

export interface IBusinessUnitRoom {
  id: string;
  code: string;
  name: string;
}

export interface ISingleOrderSearch {
  id: string;
  document_number: string;
  customer?: IBusinessPartner | null;
  service_provider?: IBusinessPartner | null;
  scheduled_at?: Date | null;
  total_amount: Prisma.Decimal;
  document_status_id: number;
  business_unit_room?: IBusinessUnitRoom | null;
  created_at: Date;
  created_by?: string | null;
}

export interface IService {
  id: string;
  code: string;
  name: string;
  base_price: Prisma.Decimal;
}

export interface ISingleOrderItemSearch {
  id: string;
  service: IService;
  quantity: Prisma.Decimal;
  unit_price?: Prisma.Decimal | null;
}

export interface ISingleOrderWrapper {
  order: ISingleOrderSearch;
  items: ISingleOrderItemSearch[];
}
