import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppUserService } from './app-user.service';
import { CreateAppUserDto, UpdateAppUserDto } from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { TenantId, UserId } from '@modules/utils/decorators';

@ApiTags('app-user')
@Controller('app-user')
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Post()
  async create(
    @Body() createAppUserDto: CreateAppUserDto,
    @TenantId() tenantId: string,
    @UserId() userId?: string,
  ) {
    return await this.appUserService.create(createAppUserDto, tenantId, userId);
  }

  @Get()
  async findAll(@TenantId() tenantId: string) {
    return await this.appUserService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return await this.appUserService.findOne(id, tenantId);
  }

  @Get('username/:username')
  async getByUsername(
    @Param('username') username: string,
    @TenantId() tenantId: string,
  ) {
    return await this.appUserService.getByUsername(username, tenantId);
  }

  @Get('email/:email')
  async getByEmail(
    @Param('email') email: string,
    @TenantId() tenantId: string,
  ) {
    return await this.appUserService.getByEmail(email, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppUserDto: UpdateAppUserDto,
    @TenantId() tenantId: string,
    @UserId() userId?: string,
  ) {
    return await this.appUserService.update(
      id,
      updateAppUserDto,
      tenantId,
      userId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @UserId() userId?: string,
  ) {
    return await this.appUserService.remove(id, tenantId, userId);
  }
}
