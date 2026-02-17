/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('service-order')
@Controller('service-order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Body() dto: CreateServiceOrderDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Headers('user-id') userId?: string,
  ) {
    return this.orderService.create(tenantId, businessUnitId, dto, userId);
  }

  @Get()
  async findAll(
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId?: string,
    @Query('customerId') customerId?: string,
    @Query('agentId') agentId?: string,
  ) {
    return await this.orderService.findAll(
      tenantId,
      businessUnitId,
      customerId,
      agentId,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
  ) {
    return await this.orderService.findOne(id, tenantId, businessUnitId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceOrderDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.orderService.update(id, tenantId, businessUnitId, dto, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.orderService.remove(id, tenantId, businessUnitId, userId);
  }
}
