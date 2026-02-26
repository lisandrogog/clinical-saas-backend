import { Injectable } from '@nestjs/common';
import { CreateServiceMaterialResourceDto } from './dto/create-service-material-resource.dto';
import { UpdateServiceMaterialResourceDto } from './dto/update-service-material-resource.dto';

@Injectable()
export class ServiceMaterialResourceService {
  create(createServiceMaterialResourceDto: CreateServiceMaterialResourceDto) {
    return 'This action adds a new serviceMaterialResource';
  }

  findAll() {
    return `This action returns all serviceMaterialResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceMaterialResource`;
  }

  update(id: number, updateServiceMaterialResourceDto: UpdateServiceMaterialResourceDto) {
    return `This action updates a #${id} serviceMaterialResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceMaterialResource`;
  }
}
