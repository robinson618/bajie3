import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { DiscussionComment } from './discussion-comment.entity';

@Entity('discussions')
export class Discussion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true, name: 'user_id' })
  userId: number;

  @Column({ nullable: true, name: 'user_name' })
  userName: string;

  @Column({ nullable: true, name: 'user_avatar' })
  userAvatar: string;

  @Column({ default: 1, name: 'user_level' })
  userLevel: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  comments: number;

  @Column({ default: 0, name: 'is_pinned' })
  isPinned: number;

  @OneToMany(() => DiscussionComment, (c) => c.discussion)
  commentList: DiscussionComment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
