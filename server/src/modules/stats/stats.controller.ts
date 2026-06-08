import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { News } from '../../entities/news.entity';
import { Skill } from '../../entities/skill.entity';
import { App } from '../../entities/app.entity';
import { Discussion } from '../../entities/discussion.entity';

@ApiTags('统计')
@Controller()
export class StatsController {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(News) private newsRepo: Repository<News>,
    @InjectRepository(Skill) private skillRepo: Repository<Skill>,
    @InjectRepository(App) private appRepo: Repository<App>,
    @InjectRepository(Discussion) private discussionRepo: Repository<Discussion>,
  ) {}

  @Get('stats')
  async getStats() {
    const [users, news, skills, apps, discussions] = await Promise.all([
      this.userRepo.count(),
      this.newsRepo.count({ where: { isPublished: 1 } }),
      this.skillRepo.count({ where: { isPublished: 1 } }),
      this.appRepo.count({ where: { isPublished: 1 } }),
      this.discussionRepo.count(),
    ]);
    return { users, news, skills, apps, discussions };
  }
}
