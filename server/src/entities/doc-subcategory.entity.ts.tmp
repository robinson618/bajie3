import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DocCategory } from './doc-category.entity';

@Entity('doc_subcategories')
export class DocSubcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ default: 0, name: 'sort_order' })
  sortOrder: number;

  @Column({ default: 1, name: 'is_active' })
  isActive: number;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @ManyToOne(() => DocCategory, (c) => c.subcategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: DocCategory;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
