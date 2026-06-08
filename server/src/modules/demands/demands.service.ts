import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand } from '../../entities/demand.entity';
import { CreateDemandDto, UpdateDemandDto } from './demands.dto';

@Injectable()
export class DemandsService {
  constructor(
    @InjectRepository(Demand)
    private demandRepo: Repository<Demand>,
  ) {}

  async findAll(page = 1, pageSize = 10) {
    const [items, total] = await this.demandRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async create(dto: CreateDemandDto) {
    const demand = this.demandRepo.create(dto);
    return this.demandRepo.save(demand);
  }

  async update(id: number, dto: UpdateDemandDto) {
    const demand = await this.demandRepo.findOne({ where: { id } });
    if (!demand) throw new NotFoundException('需求不存在');
    Object.assign(demand, dto);
    return this.demandRepo.save(demand);
  }

  async remove(id: number) {
    const result = await this.demandRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('需求不存在');
  }
}
