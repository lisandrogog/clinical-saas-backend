import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Param,
  Delete,
} from '@nestjs/common';
import { AppUserBusinessUnitService } from './app-user-business-unit.service';
import { CreateAppUserBusinessUnitDto } from './dto/create-app-user-business-unit.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-user-business-unit')
@Controller('app-user-business-unit')
export class AppUserBusinessUnitController {
  constructor(
    private readonly appUserBusinessUnitService: AppUserBusinessUnitService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateAppUserBusinessUnitDto,
    @Headers('user-id') userId?: string,
  ) {
    return this.appUserBusinessUnitService.create(dto, userId);
  }

  @Get('users')
  async getUsers(
    @Headers('tenant-id') tenantId: string,
    @Headers('business-unit-id') businessUnitId: string,
  ) {
    return await this.appUserBusinessUnitService.getUsers(
      tenantId,
      businessUnitId,
    );
  }

  @Get('units')
  async getUnits(
    @Headers('tenant-id') tenantId: string,
    @Headers('app-user-id') appUserId: string,
  ) {
    return await this.appUserBusinessUnitService.getUnits(tenantId, appUserId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.appUserBusinessUnitService.findOne(id, tenantId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.appUserBusinessUnitService.remove(id, tenantId);
  }
}
