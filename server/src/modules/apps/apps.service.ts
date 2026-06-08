import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../../entities/app.entity';
import { AppCapability } from '../../entities/app-capability.entity';
import { CreateAppDto, UpdateAppDto } from './apps.dto';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App)
    private appRepo: Repository<App>,
    @InjectRepository(AppCapability)
    private capabilityRepo: Repository<AppCapability>,
  ) {}

  async findAll(page = 1, pageSize = 10) {
    const [items, total] = await this.appRepo.findAndCount({
      where: { isPublished: 1 },
      relations: ['capabilities'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const app = await this.appRepo.findOne({ where: { id }, relations: ['capabilities'] });
    if (!app) throw new NotFoundException('应用不存在');
    await this.appRepo.increment({ id }, 'views', 1);
    return app;
  }

  async incrementLikes(id: number) {
    await this.appRepo.increment({ id }, 'likes', 1);
  }

  async create(dto: CreateAppDto) {
    const { capabilities, ...appData } = dto;
    const app = this.appRepo.create(appData);
    const savedApp = await this.appRepo.save(app);
    if (capabilities && capabilities.length > 0) {
      const caps = capabilities.map((c) => this.capabilityRepo.create({ ...c, appId: savedApp.id }));
      await this.capabilityRepo.save(caps);
    }
    return this.appRepo.findOne({ where: { id: savedApp.id }, relations: ['capabilities'] });
  }

  async update(id: number, dto: UpdateAppDto) {
    const app = await this.appRepo.findOne({ where: { id } });
    if (!app) throw new NotFoundException('应用不存在');
    const { capabilities, ...appData } = dto;
    Object.assign(app, appData);
    await this.appRepo.save(app);
    if (capabilities) {
      await this.capabilityRepo.delete({ appId: id });
      const caps = capabilities.map((c) => this.capabilityRepo.create({ ...c, appId: id }));
      await this.capabilityRepo.save(caps);
    }
    return this.appRepo.findOne({ where: { id }, relations: ['capabilities'] });
  }

  async remove(id: number) {
    const result = await this.appRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('应用不存在');
  }
}
