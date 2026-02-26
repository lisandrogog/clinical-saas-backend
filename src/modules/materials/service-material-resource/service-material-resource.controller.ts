import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceMaterialResourceService } from './service-material-resource.service';
import { CreateServiceMaterialResourceDto } from './dto/create-service-material-resource.dto';
import { UpdateServiceMaterialResourceDto } from './dto/update-service-material-resource.dto';

@Controller('service-material-resource')
export class ServiceMaterialResourceController {
  constructor(private readonly serviceMaterialResourceService: ServiceMaterialResourceService) {}

  @Post()
  create(@Body() createServiceMaterialResourceDto: CreateServiceMaterialResourceDto) {
    return this.serviceMaterialResourceService.create(createServiceMaterialResourceDto);
  }

  @Get()
  findAll() {
    return this.serviceMaterialResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceMaterialResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceMaterialResourceDto: UpdateServiceMaterialResourceDto) {
    return this.serviceMaterialResourceService.update(+id, updateServiceMaterialResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceMaterialResourceService.remove(+id);
  }
}
