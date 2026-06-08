import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IncubateService } from './incubate.service';
import { CreateIncubateDto, UpdateIncubateDto } from './incubate.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('孵化项目')
@Controller()
export class IncubateController {
  constructor(private incubateService: IncubateService) {}

  @Get('incubate')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.incubateService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Post('incubate')
  create(@Body() dto: CreateIncubateDto) {
    return this.incubateService.create(dto);
  }

  @Get('admin/incubate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  adminFindAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.incubateService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Put('admin/incubate/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateIncubateDto) {
    return this.incubateService.update(+id, dto);
  }

  @Delete('admin/incubate/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.incubateService.remove(+id);
  }
}
