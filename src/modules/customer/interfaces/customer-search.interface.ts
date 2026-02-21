import { IPaginationMetadata } from '@modules/utils/interfaces';

export interface ICustomSearchCustomer {
  id: string;
  identification_number: string;
  identification_type_id: number;
  first_name?: string | null;
  last_name?: string | null;
  birth_date?: Date | null;
}

export interface ICustomerSearch {
  id: string;
  identification_number: string;
  identification_type_id: number;
  first_name?: string | null;
  last_name?: string | null;
  birth_date?: Date | null;
  age?: number | null;
}

export interface ICustomerSearchResponse {
  data: ICustomerSearch[];
  meta: IPaginationMetadata;
}
