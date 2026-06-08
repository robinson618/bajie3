import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto, UpdateDiscussionDto, CreateCommentDto } from './discussions.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('讨论')
@Controller()
export class DiscussionsController {
  constructor(private discussionsService: DiscussionsService) {}

  @Get('discussions')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.discussionsService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Get('discussions/:id')
  findOne(@Param('id') id: string) {
    return this.discussionsService.findOne(+id);
  }

  @Post('discussions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreateDiscussionDto) {
    return this.discussionsService.create(dto);
  }

  @Post('discussions/:id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addComment(@Body() dto: CreateCommentDto) {
    return this.discussionsService.addComment(dto);
  }

  @Get('admin/discussions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  adminFindAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.discussionsService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Delete('admin/discussions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.discussionsService.remove(+id);
  }

  @Put('admin/discussions/:id/pin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  togglePin(@Param('id') id: string) {
    return this.discussionsService.togglePin(+id);
  }
}
