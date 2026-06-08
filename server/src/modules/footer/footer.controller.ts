import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FooterService } from './footer.service';
import { CreateFooterItemDto, UpdateFooterItemDto } from './footer.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Footer')
@Controller()
export class FooterController {
  constructor(private footerService: FooterService) {}

  @Get('footer-items')
  findGrouped() {
    return this.footerService.findGrouped();
  }

  @Get('admin/footer-items')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  findAll() {
    return this.footerService.findAll();
  }

  @Post('admin/footer-items')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateFooterItemDto) {
    return this.footerService.create(dto);
  }

  @Put('admin/footer-items/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateFooterItemDto) {
    return this.footerService.update(+id, dto);
  }

  @Delete('admin/footer-items/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.footerService.remove(+id);
  }
}
