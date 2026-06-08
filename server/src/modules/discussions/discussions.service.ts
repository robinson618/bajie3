import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discussion } from '../../entities/discussion.entity';
import { DiscussionComment } from '../../entities/discussion-comment.entity';
import { CreateDiscussionDto, UpdateDiscussionDto, CreateCommentDto } from './discussions.dto';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(Discussion)
    private discussionRepo: Repository<Discussion>,
    @InjectRepository(DiscussionComment)
    private commentRepo: Repository<DiscussionComment>,
  ) {}

  async findAll(page = 1, pageSize = 10) {
    const [items, total] = await this.discussionRepo.findAndCount({
      order: { isPinned: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, total, page, pageSize };
  }

  async findOne(id: number) {
    const discussion = await this.discussionRepo.findOne({
      where: { id },
      relations: { commentList: true },
    });
    if (!discussion) throw new NotFoundException('讨论不存在');
    await this.discussionRepo.increment({ id }, 'views', 1);
    return discussion;
  }

  async create(dto: CreateDiscussionDto) {
    const discussion = this.discussionRepo.create(dto);
    return this.discussionRepo.save(discussion);
  }

  async update(id: number, dto: UpdateDiscussionDto) {
    const discussion = await this.discussionRepo.findOne({ where: { id } });
    if (!discussion) throw new NotFoundException('讨论不存在');
    Object.assign(discussion, dto);
    return this.discussionRepo.save(discussion);
  }

  async remove(id: number) {
    const result = await this.discussionRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('讨论不存在');
  }

  async togglePin(id: number) {
    const discussion = await this.discussionRepo.findOne({ where: { id } });
    if (!discussion) throw new NotFoundException('讨论不存在');
    discussion.isPinned = discussion.isPinned ? 0 : 1;
    return this.discussionRepo.save(discussion);
  }

  async addComment(dto: CreateCommentDto) {
    const comment = this.commentRepo.create(dto);
    const saved = await this.commentRepo.save(comment);
    await this.discussionRepo.increment({ id: dto.discussionId }, 'comments', 1);
    return saved;
  }
}
