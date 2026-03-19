import { IPaginationMetadata } from '@modules/utils/interfaces';

export interface IOrderDetailSearch {
  id: string;
  service_order_id: string;
  symptoms: string;
  diagnosis: string;
  treatment_plan: string;
  prescription: object | null;
  extra_data: object | null;
  start_at: Date | null;
  end_at: Date | null;
  created_at: Date;
  created_by: string | null;
}

export interface IOrderDetailSearchResponse {
  data: IOrderDetailSearch[];
  meta: IPaginationMetadata;
}
