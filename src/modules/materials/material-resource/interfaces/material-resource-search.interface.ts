import { IPaginationMetadata } from '@modules/utils/interfaces';

export interface IMaterialResourceSearch {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  item_order: number;
  active?: boolean | null;
  readonly?: boolean | null;
  material_resource_type_id: number;
}

export interface IMaterialResourceSearchResponse {
  data: IMaterialResourceSearch[];
  meta: IPaginationMetadata;
}
