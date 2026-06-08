import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SiteConfigService } from './site-config.service';
import { UpdateSiteConfigDto } from './site-config.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('站点配置')
@Controller()
export class SiteConfigController {
  constructor(private siteConfigService: SiteConfigService) {}

  @Get('site-config')
  findAll() {
    return this.siteConfigService.findAll();
  }

  @Put('admin/site-config')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Body() dto: UpdateSiteConfigDto) {
    return this.siteConfigService.update(dto);
  }
}
