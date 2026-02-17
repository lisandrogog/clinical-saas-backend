import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppUserService } from './app-user.service';
import { CreateAppUserDto } from './dto/create-app-user.dto';
import { UpdateAppUserDto } from './dto/update-app-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app-user')
@Controller('app-user')
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Post()
  async create(
    @Body() createAppUserDto: CreateAppUserDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.appUserService.create(createAppUserDto, tenantId, userId);
  }

  @Get()
  async findAll(@Headers('tenant-id') tenantId: string) {
    return await this.appUserService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.appUserService.findOne(id, tenantId);
  }

  @Get('username/:username')
  async getByUsername(
    @Param('username') username: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.appUserService.getByUsername(username, tenantId);
  }

  @Get('email/:email')
  async getByEmail(
    @Param('email') email: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.appUserService.getByEmail(email, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppUserDto: UpdateAppUserDto,
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
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
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.appUserService.remove(id, tenantId, userId);
  }
}
