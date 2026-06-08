import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NavMenusService } from './nav-menus.service';
import { CreateNavMenuDto, UpdateNavMenuDto } from './nav-menus.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('导航菜单')
@Controller()
export class NavMenusController {
  constructor(private navMenusService: NavMenusService) {}

  @Get('nav-menus')
  findTree() {
    return this.navMenusService.findTree();
  }

  @Get('admin/nav-menus')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  findAll() {
    return this.navMenusService.findAll();
  }

  @Post('admin/nav-menus')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateNavMenuDto) {
    return this.navMenusService.create(dto);
  }

  @Put('admin/nav-menus/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateNavMenuDto) {
    return this.navMenusService.update(+id, dto);
  }

  @Delete('admin/nav-menus/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.navMenusService.remove(+id);
  }
}
