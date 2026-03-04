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
import {
  BusinessUnitRoomActivationService,
  BusinessUnitRoomService,
} from '../services';
import { CreateBusinessUnitRoomDto, UpdateBusinessUnitRoomDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import {
  ApiCreateBusinessUnitRoom,
  ApiDisableBusinessUnitRoom,
  ApiEnableBusinessUnitRoom,
  ApiGetAllBusinessUnitRooms,
  ApiGetBusinessUnitRoomByCode,
  ApiGetBusinessUnitRoomById,
  ApiRemoveBusinessUnitRoom,
  ApiUpdateBusinessUnitRoom,
} from './business-unit-room.decorator';
import { BusinessUnitId, TenantId, UserId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('business-unit-room')
@ApiCommonDecorator()
@Controller('business-unit-room')
export class BusinessUnitRoomController {
  constructor(
    private readonly businessUnitRoomService: BusinessUnitRoomService,
    private readonly businessUnitRoomActivationService: BusinessUnitRoomActivationService,
  ) {}

  @Post()
  @ApiCreateBusinessUnitRoom()
  async create(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() payload: CreateBusinessUnitRoomDto,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitRoomService.create(
      tenantId,
      businessUnitId,
      payload,
      userId,
    );
  }

  @Get()
  @ApiGetAllBusinessUnitRooms()
  async findAll(
    @TenantId() tenantId: string,
    @Query() query: BaseSearchPaginationDto,
    @BusinessUnitId() businessUnitId?: string,
  ) {
    return await this.businessUnitRoomService.findAll(
      tenantId,
      query,
      businessUnitId,
    );
  }

  @Get(':id')
  @ApiGetBusinessUnitRoomById()
  async findOne(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
  ) {
    return await this.businessUnitRoomService.findOne(
      tenantId,
      businessUnitId,
      id,
    );
  }

  @Get('code/:code')
  @ApiGetBusinessUnitRoomByCode()
  async findOneByCode(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('code') code: string,
  ) {
    return await this.businessUnitRoomService.findOneByCode(
      tenantId,
      businessUnitId,
      code,
    );
  }

  @Patch(':id')
  @ApiUpdateBusinessUnitRoom()
  async update(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @Body() payload: UpdateBusinessUnitRoomDto,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitRoomService.update(
      tenantId,
      businessUnitId,
      id,
      payload,
      userId,
    );
  }

  @Patch(':id/disable')
  @ApiDisableBusinessUnitRoom()
  async disable(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitRoomActivationService.disable(
      tenantId,
      businessUnitId,
      id,
      userId,
    );
  }

  @Patch(':id/enable')
  @ApiEnableBusinessUnitRoom()
  async enable(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitRoomActivationService.enable(
      tenantId,
      businessUnitId,
      id,
      userId,
    );
  }

  @Delete(':id')
  @ApiRemoveBusinessUnitRoom()
  async remove(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitRoomService.remove(
      tenantId,
      businessUnitId,
      id,
      userId,
    );
  }
}
