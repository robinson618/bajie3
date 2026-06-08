import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavMenusService } from './nav-menus.service';
import { NavMenusController } from './nav-menus.controller';
import { NavMenu } from '../../entities/nav-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NavMenu])],
  controllers: [NavMenusController],
  providers: [NavMenusService],
  exports: [NavMenusService],
})
export class NavMenusModule {}
