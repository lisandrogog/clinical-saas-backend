export interface ICreateProviderService {
  id: string;
  tenantId: string;
  businessUnitId: string;
  serviceProviderId: string;
  serviceId: string;
  active?: boolean | null;
}
