import { IsOptional, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @IsUUID()
  serviceId: string;

  @IsOptional()
  active?: boolean = true;
}
