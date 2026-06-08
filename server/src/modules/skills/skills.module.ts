import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill } from '../../entities/skill.entity';
import { SkillCategory } from '../../entities/skill-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, SkillCategory])],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
