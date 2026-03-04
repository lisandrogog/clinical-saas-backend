import { IPaginationMetadata } from '@modules/utils/interfaces';
import { Decimal } from '@prisma/client/runtime/library';

export interface IMaterialSearch {
  id: string;
  name: string;
  code: string;
  item_order: number;
  active: boolean;
  material_resource_type_id: number;
}

export interface IRoomMaterialSearch {
  id: string;
  quantity: Decimal;
  material_resource: IMaterialSearch;
}

export interface IRoomMaterialSearchResponse {
  data: IRoomMaterialSearch[];
  meta: IPaginationMetadata;
}
