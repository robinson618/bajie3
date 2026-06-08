import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqItem } from '../../entities/faq-item.entity';
import { FaqCategory } from '../../entities/faq-category.entity';
import { CreateFaqDto, UpdateFaqDto, CreateFaqCategoryDto, UpdateFaqCategoryDto } from './faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(FaqItem)
    private faqRepo: Repository<FaqItem>,
    @InjectRepository(FaqCategory)
    private categoryRepo: Repository<FaqCategory>,
  ) {}

  async findAll(page = 1, pageSize = 50, category?: string) {
    const where: any = { isActive: 1 };
    if (category) where.category = category;
    const [items, total] = await this.faqRepo.findAndCount({
      where,
      order: { sortOrder: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async create(dto: CreateFaqDto) {
    const faq = this.faqRepo.create(dto);
    return this.faqRepo.save(faq);
  }

  async update(id: number, dto: UpdateFaqDto) {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) throw new NotFoundException('FAQ不存在');
    Object.assign(faq, dto);
    return this.faqRepo.save(faq);
  }

  async remove(id: number) {
    const result = await this.faqRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('FAQ不存在');
  }

  async findAllCategories() {
    return this.categoryRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async createCategory(dto: CreateFaqCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async updateCategory(id: number, dto: UpdateFaqCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('分类不存在');
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async removeCategory(id: number) {
    const result = await this.categoryRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('分类不存在');
  }
}
