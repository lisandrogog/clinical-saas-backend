import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaterialResourceTypeService } from '../services';
import {
  CreateMaterialResourceTypeDto,
  UpdateMaterialResourceTypeDto,
} from '@shared-common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonDecorator } from '@modules/utils/controllers/common.decorator';
import {
  ApiCreateMaterialResourceType,
  ApiGetAllMaterialResourceTypes,
  ApiGetMaterialResourceTypeByCode,
  ApiGetMaterialResourceTypeById,
  ApiRemoveMaterialResourceType,
  ApiUpdateMaterialResourceType,
} from './material-resource-type.decorator';

@ApiTags('material-resource-type')
@ApiCommonDecorator()
@Controller('material-resource-type')
export class MaterialResourceTypeController {
  constructor(
    private readonly materialResourceTypeService: MaterialResourceTypeService,
  ) {}

  @Post()
  @ApiCreateMaterialResourceType()
  async create(@Body() payload: CreateMaterialResourceTypeDto) {
    return await this.materialResourceTypeService.create(payload);
  }

  @Get()
  @ApiGetAllMaterialResourceTypes()
  async findAll() {
    return await this.materialResourceTypeService.findAll();
  }

  @Get(':id')
  @ApiGetMaterialResourceTypeById()
  async findOne(@Param('id') id: string) {
    return await this.materialResourceTypeService.findOne(+id);
  }

  @Get('code/:code')
  @ApiGetMaterialResourceTypeByCode()
  async findOneByCode(@Param('code') code: string) {
    return await this.materialResourceTypeService.findOneByCode(code);
  }

  @Patch(':id')
  @ApiUpdateMaterialResourceType()
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateMaterialResourceTypeDto,
  ) {
    return await this.materialResourceTypeService.update(+id, payload);
  }

  @Delete(':id')
  @ApiRemoveMaterialResourceType()
  async remove(@Param('id') id: string) {
    return await this.materialResourceTypeService.remove(+id);
  }
}
