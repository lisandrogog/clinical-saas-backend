import { IPaginationMetadata } from '@modules/utils/interfaces';

export interface IProviderSearchCustomer {
  id: string;
  identification_number: string;
  identification_type_id: number;
  first_name?: string | null;
  last_name?: string | null;
  birth_date?: Date | null;
}

export interface IProviderSearch {
  id: string;
  identification_number: string;
  identification_type_id: number;
  first_name?: string | null;
  last_name?: string | null;
  birth_date?: Date | null;
  age?: number | null;
}

export interface IProviderSearchResponse {
  data: IProviderSearch[];
  meta: IPaginationMetadata;
}
