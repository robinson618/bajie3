import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { FaqItem } from '../../entities/faq-item.entity';
import { FaqCategory } from '../../entities/faq-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FaqItem, FaqCategory])],
  controllers: [FaqController],
  providers: [FaqService],
  exports: [FaqService],
})
export class FaqModule {}
