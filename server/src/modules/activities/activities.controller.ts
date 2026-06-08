import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto, UpdateActivityDto } from './activities.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('活动')
@Controller()
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Get('activities')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.activitiesService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Get('activities/:id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @Post('admin/activities')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateActivityDto) {
    return this.activitiesService.create(dto);
  }

  @Put('admin/activities/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateActivityDto) {
    return this.activitiesService.update(+id, dto);
  }

  @Delete('admin/activities/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
