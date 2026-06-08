import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import * as bcrypt from 'bcryptjs';

@ApiTags('用户管理')
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  @Get()
  findAll() {
    return this.userRepo.find({ select: { id: true, username: true, email: true, identity: true, role: true, createdAt: true } });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const user = await this.userRepo.findOne({ where: { id: +id } });
    if (!user) return null;
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    Object.assign(user, body);
    return this.userRepo.save(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userRepo.delete(+id);
  }
}
