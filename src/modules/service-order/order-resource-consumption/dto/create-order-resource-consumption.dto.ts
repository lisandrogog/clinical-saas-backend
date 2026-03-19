import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateOrderResourceConsumptionDto {
  @ApiProperty({
    description: 'ID de la orden de servicio',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  @IsNotEmpty()
  serviceOrderId: string;

  @ApiProperty({
    description: 'ID del recurso (material)',
    example: 'e010f1ee-6c54-4b01-90e6-d701748f0862',
  })
  @IsUUID()
  @IsNotEmpty()
  materialResourceId: string;

  @ApiProperty({
    description: 'Cantidad utilizada del recurso',
    example: 1.5,
  })
  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  quantityUsed: number;
}
