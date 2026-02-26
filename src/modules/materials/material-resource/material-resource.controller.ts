import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialResourceService } from './material-resource.service';
import { CreateMaterialResourceDto } from './dto/create-material-resource.dto';
import { UpdateMaterialResourceDto } from './dto/update-material-resource.dto';

@Controller('material-resource')
export class MaterialResourceController {
  constructor(private readonly materialResourceService: MaterialResourceService) {}

  @Post()
  create(@Body() createMaterialResourceDto: CreateMaterialResourceDto) {
    return this.materialResourceService.create(createMaterialResourceDto);
  }

  @Get()
  findAll() {
    return this.materialResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialResourceDto: UpdateMaterialResourceDto) {
    return this.materialResourceService.update(+id, updateMaterialResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialResourceService.remove(+id);
  }
}
