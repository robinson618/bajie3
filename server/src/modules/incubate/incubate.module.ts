import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncubateService } from './incubate.service';
import { IncubateController } from './incubate.controller';
import { IncubateProject } from '../../entities/incubate-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncubateProject])],
  controllers: [IncubateController],
  providers: [IncubateService],
  exports: [IncubateService],
})
export class IncubateModule {}
