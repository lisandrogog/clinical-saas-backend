import { IsOptional } from 'class-validator';

export class CreateScheduleDayBlockDto {
  dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)

  startTime: string; // Format: HH:mm

  endTime: string; // Format: HH:mm

  @IsOptional()
  slotDurationMinutes?: number = 60; // Default to 60 minutes

  @IsOptional()
  active?: boolean = true;
}
