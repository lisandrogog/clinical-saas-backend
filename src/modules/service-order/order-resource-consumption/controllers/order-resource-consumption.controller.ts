import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderResourceConsumptionService } from '../services';
import {
  CreateOrderResourceConsumptionDto,
  UpdateOrderResourceConsumptionDto,
} from '../dto';
import {
  ApiCreateOrderResourceConsumption,
  ApiGetAllOrderResourceConsumptions,
  ApiGetOrderResourceConsumptionById,
  ApiUpdateOrderResourceConsumption,
  ApiRemoveOrderResourceConsumption,
} from './order-resource-consumption.decorator';
import { TenantId, BusinessUnitId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('order-resource-consumption')
@Controller('order-resource-consumption')
export class OrderResourceConsumptionController {
  constructor(
    private readonly orderResourceConsumptionService: OrderResourceConsumptionService,
  ) {}

  @Post()
  @ApiCreateOrderResourceConsumption()
  async create(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() dto: CreateOrderResourceConsumptionDto,
  ) {
    return await this.orderResourceConsumptionService.create(
      tenantId,
      businessUnitId,
      dto,
    );
  }

  @Get('order/:serviceOrderId')
  @ApiGetAllOrderResourceConsumptions()
  async findAll(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
    @Query() searchFilters: BaseSearchPaginationDto,
  ) {
    return await this.orderResourceConsumptionService.findAll(
      tenantId,
      businessUnitId,
      serviceOrderId,
      searchFilters,
    );
  }

  @Get(':id/order/:serviceOrderId')
  @ApiGetOrderResourceConsumptionById()
  async findOne(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
    @Param('id') id: string,
  ) {
    return await this.orderResourceConsumptionService.findOne(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );
  }

  @Patch(':id/order/:serviceOrderId')
  @ApiUpdateOrderResourceConsumption()
  async update(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
    @Param('id') id: string,
    @Body() dto: UpdateOrderResourceConsumptionDto,
  ) {
    return await this.orderResourceConsumptionService.update(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
      dto,
    );
  }

  @Delete(':id/order/:serviceOrderId')
  @ApiRemoveOrderResourceConsumption()
  async remove(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('serviceOrderId') serviceOrderId: string,
    @Param('id') id: string,
  ) {
    return await this.orderResourceConsumptionService.remove(
      tenantId,
      businessUnitId,
      serviceOrderId,
      id,
    );
  }
}
