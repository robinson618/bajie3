import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { App } from '../../entities/app.entity';
import { AppCapability } from '../../entities/app-capability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([App, AppCapability])],
  controllers: [AppsController],
  providers: [AppsService],
  exports: [AppsService],
})
export class AppsModule {}
