import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from '../../entities/banner.entity';
import { CreateBannerDto, UpdateBannerDto } from './banners.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepo: Repository<Banner>,
  ) {}

  async findActive() {
    return this.bannerRepo.find({
      where: { isActive: 1 },
      order: { sortOrder: 'ASC' },
    });
  }

  async findAll() {
    return this.bannerRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async create(dto: CreateBannerDto) {
    const banner = this.bannerRepo.create(dto);
    return this.bannerRepo.save(banner);
  }

  async update(id: number, dto: UpdateBannerDto) {
    const banner = await this.bannerRepo.findOne({ where: { id } });
    if (!banner) throw new NotFoundException('轮播图不存在');
    Object.assign(banner, dto);
    return this.bannerRepo.save(banner);
  }

  async remove(id: number) {
    const result = await this.bannerRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('轮播图不存在');
  }
}
