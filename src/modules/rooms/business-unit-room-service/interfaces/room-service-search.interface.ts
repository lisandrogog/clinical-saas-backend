import { IPaginationMetadata } from '@modules/utils/interfaces';

export interface IServiceSearch {
  id: string;
  name: string;
  code: string;
  active: boolean;
  service_category_id: string;
}

export interface IRoomServiceSearch {
  id: string;
  service: IServiceSearch;
}

export interface IRoomServiceSearchResponse {
  data: IRoomServiceSearch[];
  meta: IPaginationMetadata;
}
