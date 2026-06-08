import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncubateProject } from '../../entities/incubate-project.entity';
import { CreateIncubateDto, UpdateIncubateDto } from './incubate.dto';

@Injectable()
export class IncubateService {
  constructor(
    @InjectRepository(IncubateProject)
    private incubateRepo: Repository<IncubateProject>,
  ) {}

  async findAll(page = 1, pageSize = 10) {
    const [items, total] = await this.incubateRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async create(dto: CreateIncubateDto) {
    const project = this.incubateRepo.create(dto);
    return this.incubateRepo.save(project);
  }

  async update(id: number, dto: UpdateIncubateDto) {
    const project = await this.incubateRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('项目不存在');
    Object.assign(project, dto);
    return this.incubateRepo.save(project);
  }

  async remove(id: number) {
    const result = await this.incubateRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('项目不存在');
  }
}
