import { IPaginationMetadata } from '@modules/utils/interfaces';

export interface ICategoryServiceSearch {
  id: string;
  code: string;
  name: string;
  active: boolean;
}

export interface ICategoryServiceSearchResponse {
  data: ICategoryServiceSearch[];
  meta: IPaginationMetadata;
}
