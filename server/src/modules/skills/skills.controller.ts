import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillDto, UpdateSkillDto, CreateSkillCategoryDto, UpdateSkillCategoryDto } from './skills.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('技能')
@Controller()
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get('skills')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('skill_category') skillCategory?: string) {
    return this.skillsService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10, skillCategory);
  }

  @Get('skills/:id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @Post('skills/:id/view')
  incrementViews(@Param('id') id: string) {
    return this.skillsService.incrementViews(+id);
  }

  @Post('skills/:id/download')
  incrementDownloads(@Param('id') id: string) {
    return this.skillsService.incrementDownloads(+id);
  }

  @Get('skill-categories')
  findAllCategories() {
    return this.skillsService.findAllCategories();
  }

  @Post('admin/skills')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateSkillDto) {
    return this.skillsService.create(dto);
  }

  @Put('admin/skills/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    return this.skillsService.update(+id, dto);
  }

  @Delete('admin/skills/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }

  @Post('admin/skill-categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  createCategory(@Body() dto: CreateSkillCategoryDto) {
    return this.skillsService.createCategory(dto);
  }

  @Put('admin/skill-categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  updateCategory(@Param('id') id: string, @Body() dto: UpdateSkillCategoryDto) {
    return this.skillsService.updateCategory(+id, dto);
  }

  @Delete('admin/skill-categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  removeCategory(@Param('id') id: string) {
    return this.skillsService.removeCategory(+id);
  }
}
