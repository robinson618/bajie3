import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../entities/document.entity';
import { DocCategory } from '../../entities/doc-category.entity';
import { DocSubcategory } from '../../entities/doc-subcategory.entity';
import { CreateDocumentDto, UpdateDocumentDto, CreateDocCategoryDto, UpdateDocCategoryDto, CreateDocSubcategoryDto, UpdateDocSubcategoryDto } from './documents.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepo: Repository<Document>,
    @InjectRepository(DocCategory)
    private categoryRepo: Repository<DocCategory>,
    @InjectRepository(DocSubcategory)
    private subcategoryRepo: Repository<DocSubcategory>,
  ) {}

  // Documents
  async findAll(page = 1, pageSize = 10) {
    const [items, total] = await this.documentRepo.findAndCount({
      where: { isPublished: 1 },
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const doc = await this.documentRepo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('文档不存在');
    await this.documentRepo.increment({ id }, 'views', 1);
    return doc;
  }

  async create(dto: CreateDocumentDto) {
    const doc = this.documentRepo.create(dto);
    return this.documentRepo.save(doc);
  }

  async update(id: number, dto: UpdateDocumentDto) {
    const doc = await this.documentRepo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('文档不存在');
    Object.assign(doc, dto);
    return this.documentRepo.save(doc);
  }

  async remove(id: number) {
    const result = await this.documentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('文档不存在');
  }

  // Doc Tree
  async getDocTree() {
    const categories = await this.categoryRepo.find({
      where: { isActive: 1 },
      relations: { subcategories: true },
      order: { sortOrder: 'ASC' },
    });
    return categories;
  }

  // Categories
  async findAllCategories() {
    return this.categoryRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async findOneCategory(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: { subcategories: true },
    });
    if (!category) throw new NotFoundException('分类不存在');
    return category;
  }

  async createCategory(dto: CreateDocCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async updateCategory(id: number, dto: UpdateDocCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('分类不存在');
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async removeCategory(id: number) {
    const result = await this.categoryRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('分类不存在');
  }

  // Subcategories
  async findAllSubcategories(categoryId?: number) {
    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    return this.subcategoryRepo.find({ where, order: { sortOrder: 'ASC' } });
  }

  async createSubcategory(dto: CreateDocSubcategoryDto) {
    const sub = this.subcategoryRepo.create(dto);
    return this.subcategoryRepo.save(sub);
  }

  async updateSubcategory(id: number, dto: UpdateDocSubcategoryDto) {
    const sub = await this.subcategoryRepo.findOne({ where: { id } });
    if (!sub) throw new NotFoundException('子分类不存在');
    Object.assign(sub, dto);
    return this.subcategoryRepo.save(sub);
  }

  async removeSubcategory(id: number) {
    const result = await this.subcategoryRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('子分类不存在');
  }
}
