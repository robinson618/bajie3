import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../../entities/page.entity';
import { PageBanner } from '../../entities/page-banner.entity';
import { PageSeo } from '../../entities/page-seo.entity';
import { CreatePageDto, UpdatePageDto, CreatePageBannerDto, UpdatePageBannerDto, CreatePageSeoDto, UpdatePageSeoDto } from './pages.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pageRepo: Repository<Page>,
    @InjectRepository(PageBanner)
    private pageBannerRepo: Repository<PageBanner>,
    @InjectRepository(PageSeo)
    private pageSeoRepo: Repository<PageSeo>,
  ) {}

  // Pages
  async findAll() {
    return this.pageRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async findBySlug(slug: string) {
    const page = await this.pageRepo.findOne({ where: { slug, isPublished: 1 } });
    if (!page) throw new NotFoundException('页面不存在');
    return page;
  }

  async create(dto: CreatePageDto) {
    const page = this.pageRepo.create(dto);
    return this.pageRepo.save(page);
  }

  async update(id: number, dto: UpdatePageDto) {
    const page = await this.pageRepo.findOne({ where: { id } });
    if (!page) throw new NotFoundException('页面不存在');
    Object.assign(page, dto);
    return this.pageRepo.save(page);
  }

  async remove(id: number) {
    const result = await this.pageRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('页面不存在');
  }

  // Page Banners
  async findBannerBySlug(pageSlug: string) {
    return this.pageBannerRepo.findOne({ where: { pageSlug, isActive: 1 } });
  }

  async createBanner(dto: CreatePageBannerDto) {
    const banner = this.pageBannerRepo.create(dto);
    return this.pageBannerRepo.save(banner);
  }

  async updateBanner(id: number, dto: UpdatePageBannerDto) {
    const banner = await this.pageBannerRepo.findOne({ where: { id } });
    if (!banner) throw new NotFoundException('Banner不存在');
    Object.assign(banner, dto);
    return this.pageBannerRepo.save(banner);
  }

  async removeBanner(id: number) {
    const result = await this.pageBannerRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Banner不存在');
  }

  // Page SEO
  async findSeoBySlug(pageSlug: string) {
    return this.pageSeoRepo.findOne({ where: { pageSlug } });
  }

  async createSeo(dto: CreatePageSeoDto) {
    const seo = this.pageSeoRepo.create(dto);
    return this.pageSeoRepo.save(seo);
  }

  async updateSeo(id: number, dto: UpdatePageSeoDto) {
    const seo = await this.pageSeoRepo.findOne({ where: { id } });
    if (!seo) throw new NotFoundException('SEO配置不存在');
    Object.assign(seo, dto);
    return this.pageSeoRepo.save(seo);
  }

  async removeSeo(id: number) {
    const result = await this.pageSeoRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('SEO配置不存在');
  }
}
