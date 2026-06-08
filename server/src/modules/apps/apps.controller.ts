import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AppsService } from './apps.service';
import { CreateAppDto, UpdateAppDto } from './apps.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('应用')
@Controller()
export class AppsController {
  constructor(private appsService: AppsService) {}

  @Get('apps')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.appsService.findAll(+page || 1, +pageSize || 10);
  }

  @Get('apps/:id')
  findOne(@Param('id') id: string) {
    return this.appsService.findOne(+id);
  }

  @Post('apps/:id/like')
  incrementLikes(@Param('id') id: string) {
    return this.appsService.incrementLikes(+id);
  }

  @Post('admin/apps')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateAppDto) {
    return this.appsService.create(dto);
  }

  @Put('admin/apps/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateAppDto) {
    return this.appsService.update(+id, dto);
  }

  @Delete('admin/apps/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.appsService.remove(+id);
  }
}
