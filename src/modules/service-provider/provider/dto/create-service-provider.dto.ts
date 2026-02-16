import { IsOptional, IsUUID } from 'class-validator';

export class CreateServiceProviderDto {
  @IsUUID()
  businessPartnerId: string;

  @IsOptional()
  active?: boolean = true;

  @IsOptional()
  extraData?: Record<string, any>;
}
