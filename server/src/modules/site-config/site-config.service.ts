import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteConfig } from '../../entities/site-config.entity';
import { UpdateSiteConfigDto } from './site-config.dto';

@Injectable()
export class SiteConfigService {
  constructor(
    @InjectRepository(SiteConfig)
    private configRepo: Repository<SiteConfig>,
  ) {}

  async findAll() {
    const configs = await this.configRepo.find();
    const result: Record<string, string> = {};
    configs.forEach((c) => { result[c.configKey] = c.configValue; });
    return result;
  }

  async update(dto: UpdateSiteConfigDto) {
    let config = await this.configRepo.findOne({ where: { configKey: dto.configKey } });
    if (config) {
      config.configValue = dto.configValue;
      if (dto.configType) config.configType = dto.configType;
    } else {
      config = this.configRepo.create(dto);
    }
    return this.configRepo.save(config);
  }
}
