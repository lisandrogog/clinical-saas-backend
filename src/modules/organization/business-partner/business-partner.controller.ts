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
import { BusinessPartnerService } from './business-partner.service';
import {
  CreateBusinessPartnerDto,
  UpdateBusinessPartnerDto,
} from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { TenantId, UserId } from '@modules/utils/decorators';

@ApiTags('business-partner')
@Controller('business-partner')
export class BusinessPartnerController {
  constructor(
    private readonly businessPartnerService: BusinessPartnerService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateBusinessPartnerDto,
    @UserId() userId?: string,
  ) {
    return await this.businessPartnerService.create(dto, userId);
  }

  @Get()
  async findAll(@TenantId() tenantId: string) {
    return await this.businessPartnerService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return await this.businessPartnerService.findOne(id, tenantId);
  }

  @Get('identification')
  async findByIdentification(
    @Query('identificationTypeId') identificationTypeId: number,
    @Query('identificationNumber') identificationNumber: string,
    @TenantId() tenantId: string,
  ) {
    return await this.businessPartnerService.getByIdentification(
      tenantId,
      identificationTypeId,
      identificationNumber,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusinessPartnerDto: UpdateBusinessPartnerDto,
    @TenantId() tenantId: string,
    @UserId() userId?: string,
  ) {
    return await this.businessPartnerService.update(
      id,
      tenantId,
      updateBusinessPartnerDto,
      userId,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @UserId() userId?: string,
  ) {
    return await this.businessPartnerService.remove(id, tenantId, userId);
  }
}
