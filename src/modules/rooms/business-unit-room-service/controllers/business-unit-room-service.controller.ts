import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BusinessUnitRoomServiceService } from '../services';
import {
  BusinessUnitRoomServiceDto,
  BusinessUnitRoomServicesDto,
} from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import {
  ApiCreateBusinessUnitRoomService,
  ApiCreateManyBusinessUnitRoomService,
  ApiGetAllBusinessUnitRoomServices,
  ApiGetBusinessUnitRoomServiceById,
  ApiRemoveBusinessUnitRoomService,
} from './business-unit-room-service.decorator';
import { BusinessUnitId, TenantId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('business-unit-room-service')
@ApiCommonDecorator()
@Controller('business-unit-room-service')
export class BusinessUnitRoomServiceController {
  constructor(
    private readonly businessUnitRoomServiceService: BusinessUnitRoomServiceService,
  ) {}

  @Post()
  @ApiCreateBusinessUnitRoomService()
  async create(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() payload: BusinessUnitRoomServiceDto,
  ) {
    return await this.businessUnitRoomServiceService.createOne(
      tenantId,
      businessUnitId,
      payload,
    );
  }

  @Post('services')
  @ApiCreateManyBusinessUnitRoomService()
  async createMany(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() payload: BusinessUnitRoomServicesDto,
  ) {
    return await this.businessUnitRoomServiceService.createMany(
      tenantId,
      businessUnitId,
      payload,
    );
  }

  @Get('services/:roomId')
  @ApiGetAllBusinessUnitRoomServices()
  async findAll(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('roomId') roomId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.businessUnitRoomServiceService.getServicesByRoom(
      tenantId,
      businessUnitId,
      roomId,
      query,
    );
  }

  @Get(':id')
  @ApiGetBusinessUnitRoomServiceById()
  async findOne(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
  ) {
    return await this.businessUnitRoomServiceService.findOne(
      tenantId,
      businessUnitId,
      id,
    );
  }

  @Delete(':id')
  @ApiRemoveBusinessUnitRoomService()
  async remove(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
  ) {
    return await this.businessUnitRoomServiceService.remove(
      tenantId,
      businessUnitId,
      id,
    );
  }
}
