import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../entities/activity.entity';
import { CreateActivityDto, UpdateActivityDto } from './activities.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepo: Repository<Activity>,
  ) {}

  async findAll(page = 1, pageSize = 10) {
    const [items, total] = await this.activityRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const activity = await this.activityRepo.findOne({ where: { id } });
    if (!activity) throw new NotFoundException('活动不存在');
    return activity;
  }

  async create(dto: CreateActivityDto) {
    const activity = this.activityRepo.create(dto);
    return this.activityRepo.save(activity);
  }

  async update(id: number, dto: UpdateActivityDto) {
    const activity = await this.activityRepo.findOne({ where: { id } });
    if (!activity) throw new NotFoundException('活动不存在');
    Object.assign(activity, dto);
    return this.activityRepo.save(activity);
  }

  async remove(id: number) {
    const result = await this.activityRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('活动不存在');
  }
}
