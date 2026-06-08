import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../../entities/skill.entity';
import { SkillCategory } from '../../entities/skill-category.entity';
import { CreateSkillDto, UpdateSkillDto, CreateSkillCategoryDto, UpdateSkillCategoryDto } from './skills.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,
    @InjectRepository(SkillCategory)
    private categoryRepo: Repository<SkillCategory>,
  ) {}

  async findAll(page = 1, pageSize = 10, skillCategory?: string) {
    const where: any = { isPublished: 1 };
    if (skillCategory) where.skillCategory = skillCategory;
    const [items, total] = await this.skillRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const skill = await this.skillRepo.findOne({ where: { id } });
    if (!skill) throw new NotFoundException('技能不存在');
    return skill;
  }

  async incrementViews(id: number) {
    await this.skillRepo.increment({ id }, 'views', 1);
  }

  async incrementDownloads(id: number) {
    await this.skillRepo.increment({ id }, 'downloads', 1);
  }

  async create(dto: CreateSkillDto) {
    const skill = this.skillRepo.create(dto);
    return this.skillRepo.save(skill);
  }

  async update(id: number, dto: UpdateSkillDto) {
    const skill = await this.skillRepo.findOne({ where: { id } });
    if (!skill) throw new NotFoundException('技能不存在');
    Object.assign(skill, dto);
    return this.skillRepo.save(skill);
  }

  async remove(id: number) {
    const result = await this.skillRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('技能不存在');
  }

  // Categories
  async findAllCategories() {
    return this.categoryRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async createCategory(dto: CreateSkillCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async updateCategory(id: number, dto: UpdateSkillCategoryDto) {
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
