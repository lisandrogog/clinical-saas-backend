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
import { CreateAppUserBusinessUnitDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessUnitId, TenantId, UserId } from '@modules/utils/decorators';

@ApiTags('app-user-business-unit')
@Controller('app-user-business-unit')
export class AppUserBusinessUnitController {
  constructor(
    private readonly appUserBusinessUnitService: AppUserBusinessUnitService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateAppUserBusinessUnitDto,
    @UserId() userId?: string,
  ) {
    return this.appUserBusinessUnitService.create(dto, userId);
  }

  @Get('users')
  async getUsers(
    @TenantId() tenantId: string,
    @BusinessUnitId() businessUnitId: string,
  ) {
    return await this.appUserBusinessUnitService.getUsers(
      tenantId,
      businessUnitId,
    );
  }

  @Get('units')
  async getUnits(@TenantId() tenantId: string, @UserId() userId: string) {
    return await this.appUserBusinessUnitService.getUnits(tenantId, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return await this.appUserBusinessUnitService.findOne(id, tenantId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return await this.appUserBusinessUnitService.remove(id, tenantId);
  }
}
