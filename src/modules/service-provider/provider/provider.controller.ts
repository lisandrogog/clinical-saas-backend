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
import { ProviderService } from './provider.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('service-provider')
@Controller('service-provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  async create(
    @Body() dto: CreateServiceProviderDto,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.providerService.create(tenantId, dto);
  }

  @Get()
  async findAll(@Headers('tenant-id') tenantId: string) {
    return await this.providerService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.providerService.findOne(id, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceProviderDto,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.providerService.update(id, tenantId, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.providerService.delete(id, tenantId);
  }
}
