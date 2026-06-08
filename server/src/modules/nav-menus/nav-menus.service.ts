import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavMenu } from '../../entities/nav-menu.entity';
import { CreateNavMenuDto, UpdateNavMenuDto } from './nav-menus.dto';

@Injectable()
export class NavMenusService {
  constructor(
    @InjectRepository(NavMenu)
    private navMenuRepo: Repository<NavMenu>,
  ) {}

  async findTree() {
    const menus = await this.navMenuRepo.find({
      where: { isActive: 1 },
      order: { sortOrder: 'ASC' },
    });
    const tree = menus.filter((m) => m.parentId === 0).map((parent) => ({
      ...parent,
      children: menus.filter((m) => m.parentId === parent.id),
    }));
    return tree;
  }

  async findAll() {
    return this.navMenuRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async create(dto: CreateNavMenuDto) {
    const menu = this.navMenuRepo.create(dto);
    return this.navMenuRepo.save(menu);
  }

  async update(id: number, dto: UpdateNavMenuDto) {
    const menu = await this.navMenuRepo.findOne({ where: { id } });
    if (!menu) throw new NotFoundException('菜单不存在');
    Object.assign(menu, dto);
    return this.navMenuRepo.save(menu);
  }

  async remove(id: number) {
    const result = await this.navMenuRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('菜单不存在');
  }
}
