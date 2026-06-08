import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { Page } from '../../entities/page.entity';
import { PageBanner } from '../../entities/page-banner.entity';
import { PageSeo } from '../../entities/page-seo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page, PageBanner, PageSeo])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
