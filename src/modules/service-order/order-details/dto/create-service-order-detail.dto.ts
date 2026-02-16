import { IsOptional, IsUUID } from 'class-validator';

export class CreateServiceOrderDetailDto {
  @IsUUID()
  serviceOrderId: string;

  symptoms: string;

  diagnosis: string;

  treatmentPlan: string;

  @IsOptional()
  prescription?: Record<string, any>;

  @IsOptional()
  extraData?: Record<string, any>;

  @IsOptional()
  startAt?: Date;

  @IsOptional()
  endAt?: Date;
}
