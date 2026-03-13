import { Injectable } from '@nestjs/common';
import {
  CreateOrderResourceConsumptionDto,
  UpdateOrderResourceConsumptionDto,
} from '../dto';

@Injectable()
export class OrderResourceConsumptionService {
  create(createOrderResourceConsumptionDto: CreateOrderResourceConsumptionDto) {
    return 'This action adds a new orderResourceConsumption';
  }

  findAll() {
    return `This action returns all orderResourceConsumption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderResourceConsumption`;
  }

  update(
    id: number,
    updateOrderResourceConsumptionDto: UpdateOrderResourceConsumptionDto,
  ) {
    return `This action updates a #${id} orderResourceConsumption`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderResourceConsumption`;
  }
}
