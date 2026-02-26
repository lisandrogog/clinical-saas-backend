import { Injectable } from '@nestjs/common';
import { CreateMaterialResourceDto } from './dto/create-material-resource.dto';
import { UpdateMaterialResourceDto } from './dto/update-material-resource.dto';

@Injectable()
export class MaterialResourceService {
  create(createMaterialResourceDto: CreateMaterialResourceDto) {
    return 'This action adds a new materialResource';
  }

  findAll() {
    return `This action returns all materialResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materialResource`;
  }

  update(id: number, updateMaterialResourceDto: UpdateMaterialResourceDto) {
    return `This action updates a #${id} materialResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} materialResource`;
  }
}
