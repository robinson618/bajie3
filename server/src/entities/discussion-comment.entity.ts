import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Discussion } from './discussion.entity';

@Entity('discussion_comments')
export class DiscussionComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'discussion_id' })
  discussionId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Discussion, (d) => d.commentList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'discussion_id' })
  discussion: Discussion;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
