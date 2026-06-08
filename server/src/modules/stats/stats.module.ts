import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { User } from '../../entities/user.entity';
import { News } from '../../entities/news.entity';
import { Skill } from '../../entities/skill.entity';
import { App } from '../../entities/app.entity';
import { Discussion } from '../../entities/discussion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, News, Skill, App, Discussion])],
  controllers: [StatsController],
})
export class StatsModule {}
