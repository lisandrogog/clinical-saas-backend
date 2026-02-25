import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BaseCodeNameDto {
  @ApiProperty({
    description: 'code',
    example: '',
    required: true,
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'name',
    example: '',
    required: true,
  })
  @IsString()
  name: string;
}
