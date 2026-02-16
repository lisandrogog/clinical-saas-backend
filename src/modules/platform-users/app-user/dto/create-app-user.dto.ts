import { IsOptional, IsUUID } from 'class-validator';

export class CreateAppUserDto {
  @IsUUID()
  businessPartnerId: string;

  @IsUUID()
  roleId: string;

  username: string;

  password: string;

  @IsOptional()
  profileData?: Record<string, any>;
}
