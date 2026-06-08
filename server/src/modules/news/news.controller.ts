import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('资讯')
@Controller()
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('news')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('category') category?: string) {
    return this.newsService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10, category);
  }

  @Get('news/trending')
  findTrending() {
    return this.newsService.findTrending();
  }

  @Get('news/:id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Post('admin/news')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @Put('admin/news/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(+id, dto);
  }

  @Delete('admin/news/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
