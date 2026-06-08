import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, UpdateDocumentDto, CreateDocCategoryDto, UpdateDocCategoryDto, CreateDocSubcategoryDto, UpdateDocSubcategoryDto } from './documents.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('文档')
@Controller()
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get('documents')
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.documentsService.findAll(+(page ?? '1') || 1, +(pageSize ?? '10') || 10);
  }

  @Get('documents/:id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Get('doc-categories')
  findAllCategories() {
    return this.documentsService.findAllCategories();
  }

  @Get('doc-categories/:id')
  findOneCategory(@Param('id') id: string) {
    return this.documentsService.findOneCategory(+id);
  }

  @Get('doc-subcategories')
  findAllSubcategories(@Query('categoryId') categoryId?: string) {
    return this.documentsService.findAllSubcategories(categoryId ? +categoryId : undefined);
  }

  @Get('doc-tree')
  getDocTree() {
    return this.documentsService.getDocTree();
  }

  // Admin - Documents
  @Post('admin/documents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }

  @Put('admin/documents/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.documentsService.update(+id, dto);
  }

  @Delete('admin/documents/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }

  // Admin - Categories
  @Post('admin/doc-categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  createCategory(@Body() dto: CreateDocCategoryDto) {
    return this.documentsService.createCategory(dto);
  }

  @Put('admin/doc-categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  updateCategory(@Param('id') id: string, @Body() dto: UpdateDocCategoryDto) {
    return this.documentsService.updateCategory(+id, dto);
  }

  @Delete('admin/doc-categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  removeCategory(@Param('id') id: string) {
    return this.documentsService.removeCategory(+id);
  }

  // Admin - Subcategories
  @Post('admin/doc-subcategories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  createSubcategory(@Body() dto: CreateDocSubcategoryDto) {
    return this.documentsService.createSubcategory(dto);
  }

  @Put('admin/doc-subcategories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  updateSubcategory(@Param('id') id: string, @Body() dto: UpdateDocSubcategoryDto) {
    return this.documentsService.updateSubcategory(+id, dto);
  }

  @Delete('admin/doc-subcategories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  removeSubcategory(@Param('id') id: string) {
    return this.documentsService.removeSubcategory(+id);
  }
}
