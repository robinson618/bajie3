import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FaqService } from './faq.service';
import { CreateFaqDto, UpdateFaqDto, CreateFaqCategoryDto, UpdateFaqCategoryDto } from './faq.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('FAQ')
@Controller()
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get('faq')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('category') category?: string) {
    return this.faqService.findAll(+(page ?? '1') || 1, +(pageSize ?? '50') || 50, category);
  }

  @Get('faq/categories')
  findAllCategories() {
    return this.faqService.findAllCategories();
  }

  @Post('admin/faq')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @Put('admin/faq/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(+id, dto);
  }

  @Delete('admin/faq/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }

  @Post('admin/faq-categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  createCategory(@Body() dto: CreateFaqCategoryDto) {
    return this.faqService.createCategory(dto);
  }

  @Put('admin/faq-categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  updateCategory(@Param('id') id: string, @Body() dto: UpdateFaqCategoryDto) {
    return this.faqService.updateCategory(+id, dto);
  }

  @Delete('admin/faq-categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  removeCategory(@Param('id') id: string) {
    return this.faqService.removeCategory(+id);
  }
}
