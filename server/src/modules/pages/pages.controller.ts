import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto, CreatePageBannerDto, UpdatePageBannerDto, CreatePageSeoDto, UpdatePageSeoDto } from './pages.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('页面')
@Controller()
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Get('pages')
  findAll() {
    return this.pagesService.findAll();
  }

  @Get('pages/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Get('page-banners/:pageSlug')
  findBannerBySlug(@Param('pageSlug') pageSlug: string) {
    return this.pagesService.findBannerBySlug(pageSlug);
  }

  @Get('page-seo/:pageSlug')
  findSeoBySlug(@Param('pageSlug') pageSlug: string) {
    return this.pagesService.findSeoBySlug(pageSlug);
  }

  // Admin Pages
  @Post('admin/pages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreatePageDto) {
    return this.pagesService.create(dto);
  }

  @Put('admin/pages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdatePageDto) {
    return this.pagesService.update(+id, dto);
  }

  @Delete('admin/pages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.pagesService.remove(+id);
  }

  // Admin Page Banners
  @Post('admin/page-banners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  createBanner(@Body() dto: CreatePageBannerDto) {
    return this.pagesService.createBanner(dto);
  }

  @Put('admin/page-banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  updateBanner(@Param('id') id: string, @Body() dto: UpdatePageBannerDto) {
    return this.pagesService.updateBanner(+id, dto);
  }

  @Delete('admin/page-banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  removeBanner(@Param('id') id: string) {
    return this.pagesService.removeBanner(+id);
  }

  // Admin Page SEO
  @Post('admin/page-seo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  createSeo(@Body() dto: CreatePageSeoDto) {
    return this.pagesService.createSeo(dto);
  }

  @Put('admin/page-seo/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  updateSeo(@Param('id') id: string, @Body() dto: UpdatePageSeoDto) {
    return this.pagesService.updateSeo(+id, dto);
  }

  @Delete('admin/page-seo/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  removeSeo(@Param('id') id: string) {
    return this.pagesService.removeSeo(+id);
  }
}
