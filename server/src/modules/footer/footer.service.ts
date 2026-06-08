import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FooterItem } from '../../entities/footer-item.entity';
import { CreateFooterItemDto, UpdateFooterItemDto } from './footer.dto';

@Injectable()
export class FooterService {
  constructor(
    @InjectRepository(FooterItem)
    private footerRepo: Repository<FooterItem>,
  ) {}

  async findGrouped() {
    const items = await this.footerRepo.find({
      where: { isActive: 1 },
      order: { sortOrder: 'ASC' },
    });
    const grouped: Record<string, typeof items> = {};
    items.forEach((item) => {
      if (!grouped[item.sectionTitle]) grouped[item.sectionTitle] = [];
      grouped[item.sectionTitle].push(item);
    });
    return grouped;
  }

  async findAll() {
    return this.footerRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async create(dto: CreateFooterItemDto) {
    const item = this.footerRepo.create(dto);
    return this.footerRepo.save(item);
  }

  async update(id: number, dto: UpdateFooterItemDto) {
    const item = await this.footerRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Footer项不存在');
    Object.assign(item, dto);
    return this.footerRepo.save(item);
  }

  async remove(id: number) {
    const result = await this.footerRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Footer项不存在');
  }
}
