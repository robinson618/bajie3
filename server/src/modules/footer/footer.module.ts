import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';
import { FooterItem } from '../../entities/footer-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FooterItem])],
  controllers: [FooterController],
  providers: [FooterService],
  exports: [FooterService],
})
export class FooterModule {}
