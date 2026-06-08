import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from '../../entities/document.entity';
import { DocCategory } from '../../entities/doc-category.entity';
import { DocSubcategory } from '../../entities/doc-subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, DocCategory, DocSubcategory])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
