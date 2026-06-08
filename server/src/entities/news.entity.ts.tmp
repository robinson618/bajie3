import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true, type: 'text' })
  summary: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  source: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true, name: 'cover_image' })
  coverImage: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 1, name: 'is_published' })
  isPublished: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
