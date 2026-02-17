import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BusinessPartnerService } from './business-partner.service';
import { CreateBusinessPartnerDto } from './dto/create-business-partner.dto';
import { UpdateBusinessPartnerDto } from './dto/update-business-partner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('business-partner')
@Controller('business-partner')
export class BusinessPartnerController {
  constructor(
    private readonly businessPartnerService: BusinessPartnerService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateBusinessPartnerDto,
    @Headers('user-id') userId?: string,
  ) {
    return await this.businessPartnerService.create(dto, userId);
  }

  @Get()
  async findAll(@Headers('tenant-id') tenantId: string) {
    return await this.businessPartnerService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('tenant-id') tenantId: string,
  ) {
    return await this.businessPartnerService.findOne(id, tenantId);
  }

  @Get('identification')
  async findByIdentification(
    @Query('identificationTypeId') identificationTypeId: number,
    @Query('identificationNumber') identificationNumber: string,
    @Headers('tenant-id') tenantId: string,
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
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
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
    @Headers('tenant-id') tenantId: string,
    @Headers('user-id') userId?: string,
  ) {
    return await this.businessPartnerService.remove(id, tenantId, userId);
  }
}
