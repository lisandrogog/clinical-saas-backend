import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateServiceOrderItemDto } from './dto/create-service-order-item.dto';
import { UpdateServiceOrderItemDto } from './dto/update-service-order-item.dto';

@Controller('service-order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async create(
    @Body() dto: CreateServiceOrderItemDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
  ) {
    return await this.orderItemService.create(tenantId, businessUnitId, dto);
  }

  @Get('order/:serviceOrderId')
  async findAll(
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
  ) {
    return await this.orderItemService.findAll(
      tenantId,
      businessUnitId,
      serviceOrderId,
    );
  }

  @Get(':id/order/:serviceOrderId')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
  ) {
    return await this.orderItemService.findOne(
      id,
      tenantId,
      businessUnitId,
      serviceOrderId,
    );
  }

  @Patch(':id/order/:serviceOrderId')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceOrderItemDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
  ) {
    return await this.orderItemService.update(
      id,
      dto,
      tenantId,
      businessUnitId,
      serviceOrderId,
    );
  }

  @Delete(':id/order/:serviceOrderId')
  async remove(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
  ) {
    return await this.orderItemService.remove(
      id,
      tenantId,
      businessUnitId,
      serviceOrderId,
    );
  }
}
