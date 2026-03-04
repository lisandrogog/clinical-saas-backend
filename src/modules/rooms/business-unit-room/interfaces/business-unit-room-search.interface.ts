import { IPaginationMetadata } from '@modules/utils/interfaces';

export interface IBusinessUnitRoomSearch {
  id: string;
  business_unit_id: string;
  code: string;
  name: string;
  description?: string | null;
  item_order: number;
  capacity: number;
  active?: boolean;
  readonly?: boolean;
}

export interface IBusinessUnitRoomSearchResponse {
  data: IBusinessUnitRoomSearch[];
  meta: IPaginationMetadata;
}
