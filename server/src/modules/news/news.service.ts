import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../../entities/news.entity';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepo: Repository<News>,
  ) {}

  async findAll(page = 1, pageSize = 10, category?: string) {
    const where: any = { isPublished: 1 };
    if (category) where.category = category;
    const [items, total] = await this.newsRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const news = await this.newsRepo.findOne({ where: { id } });
    if (!news) throw new NotFoundException('资讯不存在');
    await this.newsRepo.increment({ id }, 'views', 1);
    return news;
  }

  async create(dto: CreateNewsDto) {
    const news = this.newsRepo.create(dto);
    return this.newsRepo.save(news);
  }

  async update(id: number, dto: UpdateNewsDto) {
    const news = await this.newsRepo.findOne({ where: { id } });
    if (!news) throw new NotFoundException('资讯不存在');
    Object.assign(news, dto);
    return this.newsRepo.save(news);
  }

  async remove(id: number) {
    const result = await this.newsRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('资讯不存在');
  }

  async findTrending(limit = 4) {
    return this.newsRepo.find({
      where: { isPublished: 1 },
      order: { views: 'DESC' },
      take: limit,
    });
  }
}
