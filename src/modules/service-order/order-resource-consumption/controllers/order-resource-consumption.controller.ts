import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderResourceConsumptionService } from '../services/order-resource-consumption.service';
import {
  CreateOrderResourceConsumptionDto,
  UpdateOrderResourceConsumptionDto,
} from '../dto';

@Controller('order-resource-consumption')
export class OrderResourceConsumptionController {
  constructor(
    private readonly orderResourceConsumptionService: OrderResourceConsumptionService,
  ) {}

  @Post()
  create(
    @Body()
    createOrderResourceConsumptionDto: CreateOrderResourceConsumptionDto,
  ) {
    return this.orderResourceConsumptionService.create(
      createOrderResourceConsumptionDto,
    );
  }

  @Get()
  findAll() {
    return this.orderResourceConsumptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderResourceConsumptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateOrderResourceConsumptionDto: UpdateOrderResourceConsumptionDto,
  ) {
    return this.orderResourceConsumptionService.update(
      +id,
      updateOrderResourceConsumptionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderResourceConsumptionService.remove(+id);
  }
}
