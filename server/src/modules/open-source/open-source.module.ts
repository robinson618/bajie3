import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenSourceService } from './open-source.service';
import { OpenSourceController } from './open-source.controller';
import { OpenSourceProject } from '../../entities/open-source-project.entity';
import { OpenSourceCategory } from '../../entities/open-source-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OpenSourceProject, OpenSourceCategory])],
  controllers: [OpenSourceController],
  providers: [OpenSourceService],
  exports: [OpenSourceService],
})
export class OpenSourceModule {}
