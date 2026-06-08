import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DemandsService } from './demands.service';
import { CreateDemandDto, UpdateDemandDto } from './demands.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('需求')
@Controller()
export class DemandsController {
  constructor(private demandsService: DemandsService) {}

  @Get('demands')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.demandsService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Post('demands')
  create(@Body() dto: CreateDemandDto) {
    return this.demandsService.create(dto);
  }

  @Get('admin/demands')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  adminFindAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.demandsService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Put('admin/demands/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateDemandDto) {
    return this.demandsService.update(+id, dto);
  }

  @Delete('admin/demands/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.demandsService.remove(+id);
  }
}
