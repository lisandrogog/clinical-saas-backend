import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessUnitMaterialResourceService } from './business-unit-material-resource.service';
import { CreateBusinessUnitMaterialResourceDto } from './dto/create-business-unit-material-resource.dto';
import { UpdateBusinessUnitMaterialResourceDto } from './dto/update-business-unit-material-resource.dto';

@Controller('business-unit-material-resource')
export class BusinessUnitMaterialResourceController {
  constructor(private readonly businessUnitMaterialResourceService: BusinessUnitMaterialResourceService) {}

  @Post()
  create(@Body() createBusinessUnitMaterialResourceDto: CreateBusinessUnitMaterialResourceDto) {
    return this.businessUnitMaterialResourceService.create(createBusinessUnitMaterialResourceDto);
  }

  @Get()
  findAll() {
    return this.businessUnitMaterialResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessUnitMaterialResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessUnitMaterialResourceDto: UpdateBusinessUnitMaterialResourceDto) {
    return this.businessUnitMaterialResourceService.update(+id, updateBusinessUnitMaterialResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessUnitMaterialResourceService.remove(+id);
  }
}
