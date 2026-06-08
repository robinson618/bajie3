import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('documents')
export class Document {
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

  @Column({ nullable: true, name: 'category_id' })
  categoryId: number;

  @Column({ nullable: true, name: 'subcategory_id' })
  subcategoryId: number;

  @Column({ nullable: true, name: 'cover_image' })
  coverImage: string;

  @Column({ default: 0, name: 'sort_order' })
  sortOrder: number;

  @Column({ default: 1, name: 'is_published' })
  isPublished: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
