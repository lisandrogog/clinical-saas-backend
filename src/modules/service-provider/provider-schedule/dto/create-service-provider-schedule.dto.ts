import { IsUUID } from 'class-validator';
import { CreateScheduleDayBlockDto } from './create-schedule-day-block.dto';

export class CreateServiceProviderScheduleDto {
  @IsUUID()
  serviceProviderId: string;

  scheduleDayBklocks: CreateScheduleDayBlockDto[];
}
