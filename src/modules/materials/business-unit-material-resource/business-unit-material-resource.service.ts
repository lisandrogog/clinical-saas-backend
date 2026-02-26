import { Injectable } from '@nestjs/common';
import { CreateBusinessUnitMaterialResourceDto } from './dto/create-business-unit-material-resource.dto';
import { UpdateBusinessUnitMaterialResourceDto } from './dto/update-business-unit-material-resource.dto';

@Injectable()
export class BusinessUnitMaterialResourceService {
  create(createBusinessUnitMaterialResourceDto: CreateBusinessUnitMaterialResourceDto) {
    return 'This action adds a new businessUnitMaterialResource';
  }

  findAll() {
    return `This action returns all businessUnitMaterialResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessUnitMaterialResource`;
  }

  update(id: number, updateBusinessUnitMaterialResourceDto: UpdateBusinessUnitMaterialResourceDto) {
    return `This action updates a #${id} businessUnitMaterialResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessUnitMaterialResource`;
  }
}
