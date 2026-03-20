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
import { BusinessUnitRoomMaterialService } from '../services';
import { CreateBusinessUnitRoomMaterialDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import {
  ApiCreateBusinessUnitRoomMaterial,
  ApiGetAllBusinessUnitRoomMaterials,
  ApiGetBusinessUnitRoomMaterialById,
  ApiRemoveBusinessUnitRoomMaterial,
  ApiUpdateBusinessUnitRoomMaterial,
} from './business-unit-room-material.decorator';
import { BusinessUnitId, TenantId, UserId } from '@modules/utils/decorators';
import { BaseSearchPaginationDto } from '@modules/utils/dto';

@ApiTags('business-unit-room-material')
@ApiCommonDecorator()
@Controller('business-unit-room-material')
export class BusinessUnitRoomMaterialController {
  constructor(
    private readonly businessUnitRoomMaterialService: BusinessUnitRoomMaterialService,
  ) {}

  @Post()
  @ApiCreateBusinessUnitRoomMaterial()
  async create(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Body() payload: CreateBusinessUnitRoomMaterialDto,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitRoomMaterialService.create(
      tenantId,
      businessUnitId,
      payload,
      userId,
    );
  }

  @Get('materials/:roomId')
  @ApiGetAllBusinessUnitRoomMaterials()
  async findAll(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('roomId') roomId: string,
    @Query() query: BaseSearchPaginationDto,
  ) {
    return await this.businessUnitRoomMaterialService.getMaterialsByRoom(
      tenantId,
      businessUnitId,
      roomId,
      query,
    );
  }

  @Get(':id')
  @ApiGetBusinessUnitRoomMaterialById()
  async findOne(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
  ) {
    return await this.businessUnitRoomMaterialService.findOne(
      tenantId,
      businessUnitId,
      id,
    );
  }

  @Patch(':id')
  @ApiUpdateBusinessUnitRoomMaterial()
  async update(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @Body() payload: CreateBusinessUnitRoomMaterialDto,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitRoomMaterialService.update(
      tenantId,
      businessUnitId,
      id,
      payload,
      userId,
    );
  }

  @Delete(':id')
  @ApiRemoveBusinessUnitRoomMaterial()
  async remove(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
    @Param('id') id: string,
    @UserId() userId?: string,
  ) {
    return await this.businessUnitRoomMaterialService.remove(
      tenantId,
      businessUnitId,
      id,
      userId,
    );
  }
}
