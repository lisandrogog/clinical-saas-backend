import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateServiceOrderDetailDto } from './dto/create-service-order-detail.dto';
import { UpdateServiceOrderDetailDto } from './dto/update-service-order-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('service-order-details')
@Controller('service-order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  async create(
    @Body() dto: CreateServiceOrderDetailDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.orderDetailsService.create(
      tenantId,
      businessUnitId,
      dto,
      userId,
    );
  }

  @Get()
  async findAll(
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId?: string,
    @Query('customerId') customerId?: string,
    @Query('agentId') agentId?: string,
  ) {
    return await this.orderDetailsService.findAll(
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
    return await this.orderDetailsService.findOne(id, tenantId, businessUnitId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceOrderDetailDto: UpdateServiceOrderDetailDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.orderDetailsService.update(
      id,
      tenantId,
      businessUnitId,
      updateServiceOrderDetailDto,
      userId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.orderDetailsService.remove(
      id,
      tenantId,
      businessUnitId,
      userId,
    );
  }
}
