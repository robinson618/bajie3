import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenSourceProject } from '../../entities/open-source-project.entity';
import { OpenSourceCategory } from '../../entities/open-source-category.entity';
import { CreateOpenSourceDto, UpdateOpenSourceDto, CreateOpenSourceCategoryDto, UpdateOpenSourceCategoryDto } from './open-source.dto';

@Injectable()
export class OpenSourceService {
  constructor(
    @InjectRepository(OpenSourceProject)
    private projectRepo: Repository<OpenSourceProject>,
    @InjectRepository(OpenSourceCategory)
    private categoryRepo: Repository<OpenSourceCategory>,
  ) {}

  async findAll(page = 1, pageSize = 10) {
    const [items, total] = await this.projectRepo.findAndCount({
      where: { isPublished: 1 },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async create(dto: CreateOpenSourceDto) {
    const project = this.projectRepo.create(dto);
    return this.projectRepo.save(project);
  }

  async update(id: number, dto: UpdateOpenSourceDto) {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException('项目不存在');
    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  async remove(id: number) {
    const result = await this.projectRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('项目不存在');
  }

  async findAllCategories() {
    return this.categoryRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async createCategory(dto: CreateOpenSourceCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async updateCategory(id: number, dto: UpdateOpenSourceCategoryDto) {
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
