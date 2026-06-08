import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true, name: 'cover_image' })
  coverImage: string;

  @Column({ default: 0, name: 'show_banner' })
  showBanner: number;

  @Column({ default: 1, name: 'is_published' })
  isPublished: number;

  @Column({ default: 0, name: 'sort_order' })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
