import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OpenSourceService } from './open-source.service';
import { CreateOpenSourceDto, UpdateOpenSourceDto, CreateOpenSourceCategoryDto, UpdateOpenSourceCategoryDto } from './open-source.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('开源项目')
@Controller('open-source')
export class OpenSourceController {
  constructor(private openSourceService: OpenSourceService) {}

  @Get()
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.openSourceService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Get('categories')
  findAllCategories() {
    return this.openSourceService.findAllCategories();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateOpenSourceDto) {
    return this.openSourceService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateOpenSourceDto) {
    return this.openSourceService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.openSourceService.remove(+id);
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  createCategory(@Body() dto: CreateOpenSourceCategoryDto) {
    return this.openSourceService.createCategory(dto);
  }

  @Put('categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  updateCategory(@Param('id') id: string, @Body() dto: UpdateOpenSourceCategoryDto) {
    return this.openSourceService.updateCategory(+id, dto);
  }

  @Delete('categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  removeCategory(@Param('id') id: string) {
    return this.openSourceService.removeCategory(+id);
  }
}
