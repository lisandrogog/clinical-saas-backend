import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderDetailsService } from '../services';
import {
  CreateServiceOrderDetailDto,
  UpdateServiceOrderDetailDto,
} from '../dto';
import {
  ApiCreateOrderDetail,
  ApiGetAllOrderDetails,
  ApiGetOrderDetailById,
  ApiUpdateOrderDetail,
  ApiRemoveOrderDetail,
} from './order-details.decorator';
import { TenantId, BusinessUnitId, UserId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('service-order-details')
@Controller('service-order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @ApiCreateOrderDetail()
  async create(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() dto: CreateServiceOrderDetailDto,
    @UserId() userId?: string,
  ) {
    return await this.orderDetailsService.create(
      tenantId,
      businessUnitId,
      dto,
      userId,
    );
  }

  @Get()
  @ApiGetAllOrderDetails()
  async findAll(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Query() searchFilters: BaseSearchPaginationDto,
    @Query('customerId') customerId?: string,
    @Query('agentId') agentId?: string,
  ) {
    return await this.orderDetailsService.findAll(
      tenantId,
      businessUnitId,
      searchFilters,
      customerId,
      agentId,
    );
  }

  @Get(':id')
  @ApiGetOrderDetailById()
  async findOne(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
  ) {
    return await this.orderDetailsService.findOne(tenantId, businessUnitId, id);
  }

  @Patch(':id')
  @ApiUpdateOrderDetail()
  async update(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @Body() dto: UpdateServiceOrderDetailDto,
    @UserId() userId?: string,
  ) {
    return await this.orderDetailsService.update(
      tenantId,
      businessUnitId,
      id,
      dto,
      userId,
    );
  }

  @Delete(':id')
  @ApiRemoveOrderDetail()
  async remove(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @UserId() userId?: string,
  ) {
    return await this.orderDetailsService.remove(
      tenantId,
      businessUnitId,
      id,
      userId,
    );
  }
}
